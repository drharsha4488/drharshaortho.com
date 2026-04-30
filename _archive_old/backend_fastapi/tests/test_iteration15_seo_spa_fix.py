"""
Iteration 15: SEO Audit SPA Fix Tests
Tests the SPA-aware SEO audit that eliminates false positives.

Key changes tested:
1. run_seo_audit() detects React SPA and audits base HTML once (not 169+ times)
2. _audit_spa_head() method only checks head-level elements
3. _audit_cms_content() uses field aliases (procedureSteps/faqs)
4. Scoring uses severity-weighted formula (critical=-10, warning=-3, info=-0.5)
"""

import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_HEADERS = {"Content-Type": "application/json"}


class TestSEOAuditTrigger:
    """Test triggering the SEO audit"""

    def test_post_seo_audit_run_returns_started(self):
        """POST /api/seo-audit/run should return {success: true, status: 'started'}"""
        r = requests.post(f"{BASE_URL}/api/seo-audit/run", json={}, headers=ADMIN_HEADERS)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        d = r.json()
        assert d.get("success") is True, f"Expected success=True, got: {d}"
        assert d.get("status") in ("started", "running"), f"Expected status='started' or 'running', got: {d.get('status')}"
        print(f"PASS: POST /api/seo-audit/run returned: {d}")

    def test_seo_audit_status_endpoint(self):
        """GET /api/seo-audit/status should return running status"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/status")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        d = r.json()
        assert "running" in d, f"Expected 'running' field in response: {d}"
        print(f"PASS: GET /api/seo-audit/status: running={d.get('running')}")

    def test_seo_audit_history_endpoint(self):
        """GET /api/seo-audit/history should return array of past audits"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        d = r.json()
        assert d.get("success") is True, f"Expected success=True: {d}"
        assert "history" in d, f"Expected 'history' field: {d}"
        assert isinstance(d["history"], list), f"Expected history to be a list: {d['history']}"
        print(f"PASS: GET /api/seo-audit/history returned {len(d['history'])} entries")

    def test_seo_auto_fix_endpoint(self):
        """POST /api/seo-audit/auto-fix should run self-heal without error"""
        r = requests.post(f"{BASE_URL}/api/seo-audit/auto-fix", json={}, headers=ADMIN_HEADERS)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        d = r.json()
        assert d.get("success") is True, f"Expected success=True: {d}"
        print(f"PASS: POST /api/seo-audit/auto-fix returned success=True: {d}")


class TestSEOAuditLatestResults:
    """
    Test the latest SEO audit results after the SPA fix.
    The audit is triggered first and we poll for results.
    """

    @pytest.fixture(scope="class", autouse=True)
    def trigger_and_wait_for_audit(self):
        """Trigger audit and poll until complete or max 120s"""
        # Trigger audit
        r = requests.post(f"{BASE_URL}/api/seo-audit/run", json={})
        assert r.status_code == 200, f"Failed to trigger audit: {r.text}"
        d = r.json()
        print(f"Audit triggered: {d}")

        # Poll for completion (max 120 seconds)
        max_wait = 120
        poll_interval = 5
        elapsed = 0
        while elapsed < max_wait:
            time.sleep(poll_interval)
            elapsed += poll_interval
            status_r = requests.get(f"{BASE_URL}/api/seo-audit/status")
            if status_r.status_code == 200:
                status_d = status_r.json()
                if not status_d.get("running", True):
                    print(f"Audit completed after ~{elapsed}s")
                    break
            print(f"Audit still running... ({elapsed}s elapsed)")

        yield  # Tests run here

    def _get_latest_audit(self):
        """Helper to get latest audit data"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/latest")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        d = r.json()
        assert d.get("success") is True, f"Expected success=True: {d}"
        return d

    def test_latest_audit_spa_mode_true(self):
        """GET /api/seo-audit/latest should show spa_mode: true"""
        d = self._get_latest_audit()
        spa_mode = d.get("spa_mode")
        assert spa_mode is True, f"Expected spa_mode=True but got spa_mode={spa_mode}. Audit data: {d}"
        print(f"PASS: spa_mode={spa_mode}")

    def test_latest_audit_total_issues_less_than_50(self):
        """GET /api/seo-audit/latest should show total_issues < 50 (was 1226 before fix)"""
        d = self._get_latest_audit()
        total_issues = d.get("total_issues", 9999)
        assert total_issues < 50, (
            f"Expected total_issues < 50 (SPA false positives eliminated), "
            f"but got total_issues={total_issues}. "
            f"This suggests the SPA detection or false positive elimination didn't work."
        )
        print(f"PASS: total_issues={total_issues} (< 50 threshold)")

    def test_latest_audit_html_crawl_mode_spa_head_only(self):
        """GET /api/seo-audit/latest should show audit_phases.html_crawl.mode == 'spa_head_only'"""
        d = self._get_latest_audit()
        audit_phases = d.get("audit_phases", {})
        html_crawl = audit_phases.get("html_crawl", {})
        mode = html_crawl.get("mode")
        assert mode == "spa_head_only", (
            f"Expected html_crawl.mode='spa_head_only' but got mode='{mode}'. "
            f"audit_phases: {audit_phases}"
        )
        print(f"PASS: html_crawl.mode='{mode}'")

    def test_latest_audit_overall_score_at_least_80(self):
        """GET /api/seo-audit/latest should show overall_score >= 80"""
        d = self._get_latest_audit()
        overall_score = d.get("overall_score", 0)
        assert overall_score >= 80, (
            f"Expected overall_score >= 80 but got {overall_score}. "
            f"Critical: {d.get('critical')}, Warnings: {d.get('warnings')}, Info: {d.get('info')}"
        )
        print(f"PASS: overall_score={overall_score}")

    def test_latest_audit_no_false_positive_h1_issues(self):
        """Audit should NOT contain 'Missing H1' false positives for SPA routes"""
        d = self._get_latest_audit()
        issues = d.get("issues", [])
        h1_false_positives = [
            i for i in issues
            if "h1" in i.get("issue", "").lower() and "missing" in i.get("issue", "").lower()
        ]
        assert len(h1_false_positives) == 0, (
            f"Found {len(h1_false_positives)} 'Missing H1' false positives which should have been eliminated: "
            f"{h1_false_positives[:3]}"
        )
        print(f"PASS: No 'Missing H1' false positives found")

    def test_latest_audit_no_false_positive_h2_issues(self):
        """Audit should NOT contain 'Missing H2' false positives for SPA routes"""
        d = self._get_latest_audit()
        issues = d.get("issues", [])
        h2_false_positives = [
            i for i in issues
            if "h2" in i.get("issue", "").lower() and "missing" in i.get("issue", "").lower()
        ]
        assert len(h2_false_positives) == 0, (
            f"Found {len(h2_false_positives)} 'Missing H2' false positives: {h2_false_positives[:3]}"
        )
        print(f"PASS: No 'Missing H2' false positives found")

    def test_latest_audit_no_thin_content_false_positives(self):
        """Audit should NOT contain 'Thin content' false positives from empty SPA HTML shell"""
        d = self._get_latest_audit()
        issues = d.get("issues", [])
        thin_content_fps = [
            i for i in issues
            if "thin content" in i.get("issue", "").lower() and
               i.get("category") == "content" and
               # These would be from SPA page_results, not CMS content audit
               "/conditions/" not in i.get("url", "") and
               "/treatments/" not in i.get("url", "")
        ]
        assert len(thin_content_fps) == 0, (
            f"Found {len(thin_content_fps)} 'Thin content' false positives from SPA routes: "
            f"{thin_content_fps[:3]}"
        )
        print(f"PASS: No SPA route 'Thin content' false positives found")

    def test_latest_audit_has_required_fields(self):
        """GET /api/seo-audit/latest should have all required fields"""
        d = self._get_latest_audit()
        required_fields = ["overall_score", "pages_audited", "total_issues",
                           "spa_mode", "critical", "warnings", "info",
                           "category_scores", "audit_phases", "issues"]
        missing = [f for f in required_fields if f not in d]
        assert not missing, f"Missing required fields in latest audit: {missing}"
        print(f"PASS: All required fields present in latest audit")

    def test_latest_audit_pages_audited(self):
        """GET /api/seo-audit/latest should show pages_audited > 0"""
        d = self._get_latest_audit()
        pages_audited = d.get("pages_audited", 0)
        assert pages_audited > 0, f"Expected pages_audited > 0, got {pages_audited}"
        print(f"PASS: pages_audited={pages_audited}")

    def test_latest_audit_audit_phases_complete(self):
        """Audit phases should include html_crawl, cms_content, site_wide"""
        d = self._get_latest_audit()
        phases = d.get("audit_phases", {})
        assert "html_crawl" in phases, f"Missing html_crawl phase: {phases}"
        assert "cms_content" in phases, f"Missing cms_content phase: {phases}"
        assert "site_wide" in phases, f"Missing site_wide phase: {phases}"
        # html_crawl should have mode = 'spa_head_only' for SPA
        html_mode = phases.get("html_crawl", {}).get("mode")
        print(f"PASS: All 3 phases present. html_crawl mode={html_mode}")

    def test_latest_audit_category_scores_exist(self):
        """Category scores should exist and have common categories"""
        d = self._get_latest_audit()
        cat_scores = d.get("category_scores", {})
        assert len(cat_scores) > 0, f"Expected category_scores to be non-empty: {cat_scores}"
        expected_categories = ["meta", "technical", "schema"]
        present = [c for c in expected_categories if c in cat_scores]
        assert len(present) > 0, f"None of expected categories {expected_categories} found in: {list(cat_scores.keys())}"
        print(f"PASS: category_scores has {len(cat_scores)} categories: {list(cat_scores.keys())}")

    def test_latest_audit_severity_breakdown(self):
        """Audit should have severity breakdown (critical, warnings, info)"""
        d = self._get_latest_audit()
        critical = d.get("critical", -1)
        warnings = d.get("warnings", -1)
        info_count = d.get("info", -1)
        assert critical >= 0, f"Expected critical >= 0: {critical}"
        assert warnings >= 0, f"Expected warnings >= 0: {warnings}"
        assert info_count >= 0, f"Expected info >= 0: {info_count}"
        total = critical + warnings + info_count
        total_issues = d.get("total_issues", 0)
        assert total == total_issues, f"Sum of severities ({total}) should equal total_issues ({total_issues})"
        print(f"PASS: Severity breakdown: critical={critical}, warnings={warnings}, info={info_count}, total={total_issues}")

    def test_latest_audit_score_uses_weighted_formula(self):
        """Overall score should match severity-weighted formula: 100 - (critical*10) - (warnings*3) - (info*0.5)"""
        d = self._get_latest_audit()
        critical = d.get("critical", 0)
        warnings = d.get("warnings", 0)
        info_count = d.get("info", 0)
        overall_score = d.get("overall_score", 0)
        expected_score = max(0, round(100 - (critical * 10) - (warnings * 3) - (info_count * 0.5)))
        assert overall_score == expected_score, (
            f"Score mismatch: expected {expected_score} (weighted formula) but got {overall_score}. "
            f"critical={critical}, warnings={warnings}, info={info_count}"
        )
        print(f"PASS: Score={overall_score} matches weighted formula (expected={expected_score})")


class TestSEOAuditHistory:
    """Test SEO audit history endpoint"""

    def test_history_returns_list(self):
        """GET /api/seo-audit/history returns array"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/history")
        assert r.status_code == 200
        d = r.json()
        assert d.get("success") is True
        history = d.get("history", [])
        assert isinstance(history, list)
        print(f"PASS: History has {len(history)} entries")

    def test_history_entries_have_score(self):
        """History entries should have overall_score field"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/history?limit=5")
        assert r.status_code == 200
        d = r.json()
        history = d.get("history", [])
        if history:
            for entry in history[:3]:
                assert "overall_score" in entry or "date" in entry, (
                    f"History entry missing expected fields: {entry}"
                )
            print(f"PASS: History entries have required fields. Sample: {history[0]}")
        else:
            print("INFO: No history entries yet (audit may not have completed)")

    def test_history_with_limit(self):
        """GET /api/seo-audit/history respects limit parameter"""
        r = requests.get(f"{BASE_URL}/api/seo-audit/history?limit=5")
        assert r.status_code == 200
        d = r.json()
        history = d.get("history", [])
        assert len(history) <= 5, f"Expected at most 5 entries with limit=5, got {len(history)}"
        print(f"PASS: History with limit=5 returned {len(history)} entries")
