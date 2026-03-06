"""
SEO Automation Engine for Dr. Harsha Orthopedic Website
- Auto-generates sitemap from MongoDB
- Pings Google when content changes
- Generates & publishes AI blog posts weekly (zero manual work)
- Self-adaptive: monitors growth, adjusts strategy automatically
- SEO Health Monitor: crawls site pages and audits for SEO issues
"""
import asyncio
import httpx
import uuid
import re
import json
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional, List, Dict, Any
from xml.etree import ElementTree as ET

try:
    from bs4 import BeautifulSoup
    BS4_AVAILABLE = True
except ImportError:
    BS4_AVAILABLE = False

logger = logging.getLogger(__name__)

BASE_URL = "https://drharshaortho.com"
SITEMAP_PATH = Path("/app/frontend/public/sitemap.xml")
SITEMAP_URL = f"{BASE_URL}/api/sitemap.xml"   # Dynamic endpoint — never stale
EMERGENT_LLM_KEY = "sk-emergent-817A95a8cA6E27eAc2"

# Fresh SEO keywords to generate blog posts for (20 topics = ~20 weeks of auto content)
AUTOMATION_KEYWORDS = [
    "knee replacement recovery exercises Hyderabad",
    "hip bursitis treatment Hyderabad",
    "ACL surgery recovery timeline",
    "rotator cuff repair surgery Hyderabad",
    "shoulder impingement syndrome treatment",
    "meniscus tear surgery vs physiotherapy",
    "robotic knee replacement vs traditional surgery",
    "PRP therapy for knee pain Hyderabad",
    "frozen shoulder exercises and recovery",
    "arthritis knee pain relief without surgery",
    "spinal stenosis treatment options Hyderabad",
    "sports injury prevention tips athletes",
    "orthopedic second opinion when needed",
    "knee pain walking downstairs causes treatment",
    "hip replacement recovery tips India",
    "cartilage repair surgery knee",
    "tennis elbow treatment without surgery",
    "plantar fasciitis best treatment options",
    "sciatica pain relief exercises treatment",
    "trigger finger surgery vs injection treatment",
]

# All static/SEO pages for the sitemap
STATIC_SITEMAP_PAGES = [
    ("/", 1.0, "weekly"),
    ("/about", 0.9, "monthly"),
    ("/conditions", 0.9, "weekly"),
    ("/treatments", 0.9, "weekly"),
    ("/blog", 0.8, "weekly"),
    ("/testimonials", 0.7, "monthly"),
    ("/gallery", 0.6, "monthly"),
    ("/contact", 0.8, "monthly"),
    ("/best-orthopedic-surgeon-hyderabad", 0.95, "weekly"),
    ("/robotic-knee-replacement-hyderabad", 0.95, "weekly"),
    ("/knee-replacement-cost-hyderabad", 0.95, "weekly"),
    ("/hip-replacement-cost-hyderabad", 0.95, "weekly"),
    ("/sports-injury-treatment-hyderabad", 0.95, "weekly"),
    ("/orthopedic-doctor-near-me-hyderabad", 0.95, "weekly"),
    ("/partial-knee-replacement-cost-hyderabad", 0.9, "monthly"),
    ("/acl-surgery-cost-hyderabad", 0.9, "monthly"),
    ("/shoulder-arthroscopy-cost-hyderabad", 0.9, "monthly"),
    ("/knee-arthroscopy-cost-hyderabad", 0.9, "monthly"),
    ("/hip-arthroscopy-cost-hyderabad", 0.9, "monthly"),
    ("/spine-surgery-cost-hyderabad", 0.9, "monthly"),
    ("/revision-knee-replacement-cost-hyderabad", 0.9, "monthly"),
    ("/bilateral-knee-replacement-cost-hyderabad", 0.9, "monthly"),
    ("/unicompartmental-knee-replacement-cost-hyderabad", 0.9, "monthly"),
    ("/meniscus-surgery-cost-hyderabad", 0.9, "monthly"),
    ("/rotator-cuff-surgery-cost-hyderabad", 0.9, "monthly"),
    ("/bankart-repair-cost-hyderabad", 0.9, "monthly"),
    ("/pcl-reconstruction-cost-hyderabad", 0.9, "monthly"),
    ("/total-shoulder-replacement-cost-hyderabad", 0.9, "monthly"),
    ("/cartilage-restoration-cost-hyderabad", 0.9, "monthly"),
    ("/knee-pain-treatment-hyderabad", 0.9, "monthly"),
    ("/back-pain-treatment-hyderabad", 0.9, "monthly"),
    ("/shoulder-pain-treatment-hyderabad", 0.9, "monthly"),
    ("/hip-pain-treatment-hyderabad", 0.9, "monthly"),
    ("/ligament-injury-treatment-hyderabad", 0.9, "monthly"),
    ("/meniscus-tear-treatment-hyderabad", 0.9, "monthly"),
    ("/rotator-cuff-tear-treatment-hyderabad", 0.9, "monthly"),
    ("/cartilage-injury-treatment-hyderabad", 0.9, "monthly"),
    ("/orthopedic-surgeon-hitec-city", 0.9, "monthly"),
    ("/orthopedic-doctor-madhapur", 0.9, "monthly"),
    ("/knee-specialist-gachibowli", 0.9, "monthly"),
    ("/orthopedic-hospital-kondapur", 0.9, "monthly"),
    ("/joint-replacement-surgeon-kukatpally", 0.9, "monthly"),
    ("/sports-injury-doctor-jubilee-hills", 0.9, "monthly"),
    ("/bone-doctor-secunderabad", 0.9, "monthly"),
    ("/orthopedic-surgeon-miyapur", 0.9, "monthly"),
    ("/orthopedic-surgeon-financial-district", 0.9, "monthly"),
    ("/orthopedic-surgeon-banjara-hills", 0.85, "monthly"),
    ("/orthopedic-surgeon-jubilee-hills", 0.85, "monthly"),
    ("/orthopedic-surgeon-kukatpally", 0.85, "monthly"),
    ("/orthopedic-surgeon-nallagandla", 0.85, "monthly"),
    ("/orthopedic-surgeon-secunderabad", 0.85, "monthly"),
    ("/orthopedic-surgeon-lb-nagar", 0.85, "monthly"),
    ("/knee-replacement-surgeon-madhapur", 0.85, "monthly"),
    ("/orthopedic-doctor-gachibowli", 0.85, "monthly"),
    ("/hip-replacement-surgeon-kondapur", 0.85, "monthly"),
    ("/sports-injury-doctor-kukatpally", 0.85, "monthly"),
    ("/joint-replacement-jubilee-hills", 0.85, "monthly"),
    ("/knee-pain-treatment-secunderabad", 0.85, "monthly"),
    ("/shoulder-specialist-begumpet", 0.85, "monthly"),
    ("/arthritis-treatment-miyapur", 0.85, "monthly"),
    ("/fracture-treatment-ameerpet", 0.85, "monthly"),
    ("/acl-surgery-sr-nagar", 0.85, "monthly"),
    ("/knee-doctor-somajiguda", 0.85, "monthly"),
    ("/hip-surgery-ameerpet", 0.85, "monthly"),
    ("/sports-injury-treatment-punjagutta", 0.85, "monthly"),
    ("/knee-replacement-kompally", 0.85, "monthly"),
    ("/orthopedic-doctor-bowenpally", 0.85, "monthly"),
    ("/joint-pain-malkajgiri", 0.85, "monthly"),
    ("/orthopedic-surgeon-uppal", 0.85, "monthly"),
    ("/knee-pain-lb-nagar", 0.85, "monthly"),
    ("/hip-replacement-dilsukhnagar", 0.85, "monthly"),
    ("/orthopedic-doctor-mehdipatnam", 0.85, "monthly"),
    ("/knee-surgery-tolichowki", 0.85, "monthly"),
    ("/sports-medicine-attapur", 0.85, "monthly"),
    ("/joint-replacement-shamshabad", 0.85, "monthly"),
    ("/orthopedic-surgeon-charminar", 0.85, "monthly"),
    ("/knee-doctor-nampally", 0.85, "monthly"),
    ("/orthopedic-doctor-dilsukhnagar", 0.8, "monthly"),
    ("/knee-doctor-ameerpet", 0.8, "monthly"),
    ("/orthopedic-surgeon-begumpet", 0.8, "monthly"),
    ("/joint-pain-doctor-lb-nagar", 0.8, "monthly"),
    ("/orthopedic-doctor-uppal", 0.8, "monthly"),
    ("/hip-specialist-manikonda", 0.8, "monthly"),
    ("/sports-medicine-narsingi", 0.8, "monthly"),
    ("/orthopedic-clinic-kompally", 0.8, "monthly"),
    ("/fracture-specialist-attapur", 0.8, "monthly"),
    ("/arthritis-doctor-shamshabad", 0.8, "monthly"),
    ("/cricket-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/football-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/badminton-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/tennis-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/running-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/gym-injuries-treatment-hyderabad", 0.85, "monthly"),
    ("/pediatric-orthopedic-hyderabad", 0.85, "monthly"),
    ("/young-athlete-orthopedic-hyderabad", 0.85, "monthly"),
    ("/senior-citizen-orthopedic-hyderabad", 0.85, "monthly"),
]


class SEOAutomation:
    def __init__(self, db):
        self.db = db
        self._scheduler_task: Optional[asyncio.Task] = None

    # ─────────────────────────────────────────────────────────
    # 1. DYNAMIC SITEMAP BUILDER (pure DB → XML string)
    # ─────────────────────────────────────────────────────────
    async def build_sitemap_xml(self) -> str:
        """Build and return sitemap XML string from MongoDB + static pages."""
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        urls = list(STATIC_SITEMAP_PAGES)  # copy static list

        # CMS treatments
        treatments = await self.db.cms_pages.find(
            {"type": "treatment"}, {"slug": 1, "_id": 0}
        ).to_list(500)
        for t in treatments:
            if t.get("slug"):
                urls.append((f"/treatments/{t['slug']}", 0.85, "monthly"))

        # CMS conditions
        conditions = await self.db.cms_pages.find(
            {"type": "condition"}, {"slug": 1, "_id": 0}
        ).to_list(500)
        for c in conditions:
            if c.get("slug"):
                urls.append((f"/conditions/{c['slug']}", 0.85, "monthly"))

        # All blog posts
        blogs = await self.db.blog_posts.find({}, {"slug": 1, "_id": 0}).to_list(2000)
        for b in blogs:
            if b.get("slug"):
                urls.append((f"/blog/{b['slug']}", 0.8, "monthly"))

        lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ]
        for path_or_loc, priority, changefreq in urls:
            loc = path_or_loc if path_or_loc.startswith("http") else f"{BASE_URL}{path_or_loc}"
            lines.append(
                f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{today}</lastmod>\n"
                f"    <changefreq>{changefreq}</changefreq>\n    <priority>{priority}</priority>\n  </url>"
            )
        lines.append("</urlset>")
        return "\n".join(lines)

    async def generate_and_write_sitemap(self) -> int:
        """Build sitemap and write to file (fallback for local dev). Also returns URL count."""
        try:
            xml = await self.build_sitemap_xml()
            url_count = xml.count("<url>")
            SITEMAP_PATH.write_text(xml, encoding="utf-8")
            logger.info(f"[Automation] Sitemap written: {url_count} URLs")
            await self.db.automation_log.update_one(
                {"type": "sitemap"},
                {"$set": {"last_generated": datetime.now(timezone.utc).strftime("%Y-%m-%d"), "url_count": url_count}},
                upsert=True,
            )
            return url_count
        except Exception as e:
            logger.error(f"[Automation] Sitemap write error: {e}")
            return 0

    # ─────────────────────────────────────────────────────────
    # 2. GOOGLE PING
    # ─────────────────────────────────────────────────────────
    async def ping_google(self):
        """Notify Google about the updated sitemap."""
        try:
            ping_url = f"https://www.google.com/ping?sitemap={SITEMAP_URL}"
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.get(ping_url)
            logger.info(f"[Automation] Google ping → {resp.status_code}")
            await self.db.automation_log.update_one(
                {"type": "google_ping"},
                {"$set": {"last_ping": datetime.now(timezone.utc).isoformat(), "status": resp.status_code}},
                upsert=True,
            )
        except Exception as e:
            logger.error(f"[Automation] Google ping error: {e}")

    # ─────────────────────────────────────────────────────────
    # 3. AI BLOG POST GENERATOR
    # ─────────────────────────────────────────────────────────
    async def generate_blog_post(self, keyword: str) -> Optional[dict]:
        """Use GPT-4o to write a full SEO blog post and publish it instantly."""
        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage

            system = (
                "You are an expert medical content writer for Dr. B Harsha Vardhana Reddy, "
                "Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. "
                "Write factually accurate, empathetic, and SEO-optimized medical content for patients."
            )

            # Generate the full blog body
            body_prompt = f"""Write a comprehensive, SEO-optimized blog post for an orthopedic surgeon's website.

TOPIC: {keyword}

REQUIREMENTS:
- Target audience: patients in Hyderabad, India seeking orthopedic care
- Word count: 1200-1500 words
- Naturally mention "Dr. B Harsha Vardhana Reddy" and "Apollo Hospitals, Financial District, Hyderabad" 2-3 times
- Use the main keyword naturally 6-8 times across the post
- Include related orthopedic terms for semantic SEO
- End with a call-to-action to call +91 99599 64567

STRUCTURE (return pure HTML, no markdown):
<h2>Introduction</h2><p>...</p>
<h2>[Relevant Section 2]</h2><p>...</p>
<h2>[Relevant Section 3]</h2><ul><li>...</li></ul>
<h2>Treatment Options</h2><p>...</p>
<h2>Why Choose Dr. Harsha at Apollo Hospitals, Hyderabad?</h2><p>...</p>
<h2>Frequently Asked Questions</h2>
<p><strong>Q: [question]</strong></p><p>A: [answer]</p>
<h2>Book Your Appointment</h2>
<p>Call Dr. Harsha at <strong>+91 99599 64567</strong> or visit Apollo Hospitals, Financial District, Nanakramguda, Hyderabad.</p>

Return ONLY the HTML content. No code blocks, no markdown, no explanation."""

            body_chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"blog-body-{uuid.uuid4()}",
                system_message=system,
            ).with_model("openai", "gpt-4o")
            content = await body_chat.send_message(UserMessage(text=body_prompt))

            # Generate SEO title
            title_chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"blog-title-{uuid.uuid4()}",
                system_message="You are an SEO expert. Generate concise, click-worthy blog post titles.",
            ).with_model("openai", "gpt-4o")
            title_raw = await title_chat.send_message(
                UserMessage(text=f"Generate one SEO blog title (max 70 chars) for: '{keyword}'. Include 'Hyderabad' if it fits. Return ONLY the title.")
            )
            title = title_raw.strip().strip('"').strip("'")[:120]

            # Build slug
            slug_base = re.sub(r"[^a-z0-9]+", "-", keyword.lower()).strip("-")
            slug = slug_base if "hyderabad" in slug_base else f"{slug_base}-hyderabad"
            existing = await self.db.blog_posts.find_one({"slug": slug})
            if existing:
                slug = f"{slug}-{str(uuid.uuid4())[:6]}"

            excerpt = (
                f"Expert guide on {keyword.lower()} by Dr. B Harsha Vardhana Reddy "
                f"at Apollo Hospitals, Hyderabad. Symptoms, treatment options, recovery & costs explained."
            )[:200]

            tags = [w.capitalize() for w in keyword.split() if len(w) > 3][:5]
            tags += ["Orthopedics", "Dr. Harsha", "Hyderabad"]

            post = {
                "id": str(uuid.uuid4()),
                "title": title,
                "slug": slug,
                "content": content,
                "excerpt": excerpt,
                "tags": list(set(tags)),
                "image_url": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
                "published_date": datetime.now(timezone.utc).isoformat(),
                "author": "Dr. B Harsha Vardhana Reddy",
                "auto_generated": True,
                "keyword": keyword,
            }
            await self.db.blog_posts.insert_one(post)
            post.pop("_id", None)
            logger.info(f"[Automation] Blog published: '{title}' → /blog/{slug}")
            return post
        except Exception as e:
            logger.error(f"[Automation] Blog generation error for '{keyword}': {e}")
            return None

    # ─────────────────────────────────────────────────────────
    # 4. ON-DEMAND: trigger after any new content is published
    # ─────────────────────────────────────────────────────────
    async def on_content_published(self, url: str):
        """Call this after every new blog/condition/treatment page goes live."""
        asyncio.create_task(self._async_on_publish(url))

    async def _async_on_publish(self, url: str):
        try:
            await self.generate_and_write_sitemap()
            await self.ping_google()
            # Also submit to IndexNow
            from server import submit_to_indexnow
            await submit_to_indexnow([url])
            logger.info(f"[Automation] Post-publish hooks done for {url}")
        except Exception as e:
            logger.error(f"[Automation] Post-publish error: {e}")

    # ─────────────────────────────────────────────────────────
    # 5. GROWTH TRACKING — daily snapshots
    # ─────────────────────────────────────────────────────────
    async def record_growth_snapshot(self) -> dict:
        """Record a daily snapshot of all growth metrics."""
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        # Check if already recorded today
        existing = await self.db.growth_snapshots.find_one({"date": today})
        if existing:
            existing.pop("_id", None)
            return existing

        total_blogs = await self.db.blog_posts.count_documents({})
        auto_blogs = await self.db.blog_posts.count_documents({"auto_generated": True})
        conditions = await self.db.cms_pages.count_documents({"type": "condition"})
        treatments = await self.db.cms_pages.count_documents({"type": "treatment"})
        total_cms = await self.db.cms_pages.count_documents({})

        # Count page views for today and total
        today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        today_views = await self.db.page_views.count_documents({"timestamp": {"$gte": today_start.isoformat()}})
        total_views = await self.db.page_views.count_documents({})

        # Count sitemap URLs
        sitemap_log = await self.db.automation_log.find_one({"type": "sitemap"}, {"_id": 0})
        sitemap_urls = sitemap_log.get("url_count", 0) if sitemap_log else 0

        # Count indexed pages (IndexNow submissions)
        indexed = await self.db.indexnow_submissions.count_documents({})

        snapshot = {
            "date": today,
            "total_blogs": total_blogs,
            "auto_blogs": auto_blogs,
            "conditions": conditions,
            "treatments": treatments,
            "total_cms_pages": total_cms,
            "total_content_pages": total_blogs + total_cms,
            "sitemap_urls": sitemap_urls,
            "today_views": today_views,
            "total_views": total_views,
            "indexed_pages": indexed,
            "recorded_at": datetime.now(timezone.utc).isoformat(),
        }
        await self.db.growth_snapshots.insert_one(snapshot)
        snapshot.pop("_id", None)
        logger.info(f"[Growth] Snapshot recorded for {today}: {total_blogs} blogs, {total_cms} CMS, {today_views} views today")
        return snapshot

    async def get_growth_history(self, days: int = 30) -> List[dict]:
        """Get growth snapshots for the last N days."""
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%d")
        snapshots = await self.db.growth_snapshots.find(
            {"date": {"$gte": cutoff}}, {"_id": 0}
        ).sort("date", 1).to_list(days + 1)
        return snapshots

    async def get_growth_analysis(self) -> dict:
        """Analyze growth trends and provide recommendations."""
        history = await self.get_growth_history(14)
        if len(history) < 2:
            return {
                "trend": "insufficient_data",
                "message": "Need at least 2 days of data for analysis",
                "strategy": "normal",
                "posts_per_cycle": 3,
            }

        recent = history[-7:] if len(history) >= 7 else history[len(history)//2:]
        older = history[:7] if len(history) >= 7 else history[:len(history)//2]

        recent_avg_views = sum(s.get("today_views", 0) for s in recent) / max(len(recent), 1)
        older_avg_views = sum(s.get("today_views", 0) for s in older) / max(len(older), 1)

        recent_content = recent[-1].get("total_content_pages", 0) if recent else 0
        older_content = older[-1].get("total_content_pages", 0) if older else 0
        content_growth = recent_content - older_content

        # Determine growth trend
        if older_avg_views > 0:
            view_growth_pct = ((recent_avg_views - older_avg_views) / older_avg_views) * 100
        else:
            view_growth_pct = 100 if recent_avg_views > 0 else 0

        if view_growth_pct > 20:
            trend = "growing_fast"
            strategy = "maintain"
            posts_per_cycle = 3
            message = f"Views up {view_growth_pct:.0f}% — great momentum! Maintaining current strategy."
        elif view_growth_pct > 5:
            trend = "growing"
            strategy = "maintain"
            posts_per_cycle = 3
            message = f"Views up {view_growth_pct:.0f}% — steady growth. Keeping pace."
        elif view_growth_pct > -5:
            trend = "flat"
            strategy = "boost"
            posts_per_cycle = 5
            message = f"Views flat ({view_growth_pct:+.0f}%). Increasing to 5 posts/cycle and targeting new keywords."
        else:
            trend = "declining"
            strategy = "aggressive"
            posts_per_cycle = 7
            message = f"Views declining ({view_growth_pct:+.0f}%). Switching to aggressive mode: 7 posts/cycle + new keyword strategy."

        return {
            "trend": trend,
            "view_growth_pct": round(view_growth_pct, 1),
            "recent_avg_views": round(recent_avg_views, 1),
            "older_avg_views": round(older_avg_views, 1),
            "content_growth": content_growth,
            "total_content": recent_content,
            "strategy": strategy,
            "posts_per_cycle": posts_per_cycle,
            "message": message,
            "days_tracked": len(history),
        }

    # ─────────────────────────────────────────────────────────
    # 6. SEO HEALTH MONITOR — automated site auditing
    # ─────────────────────────────────────────────────────────
    async def run_seo_audit(self, site_url: str, max_pages: int = 50) -> dict:
        """Crawl the site and audit pages for SEO issues."""
        if not BS4_AVAILABLE:
            return {"error": "BeautifulSoup not installed", "score": 0, "pages_audited": 0, "issues": []}

        logger.info(f"[SEO Audit] Starting audit of {site_url}, max {max_pages} pages")
        sitemap_url = f"{site_url}/api/sitemap.xml"
        page_urls = await self._get_urls_from_sitemap(sitemap_url)
        if not page_urls:
            page_urls = [site_url + p for p, _, _ in STATIC_SITEMAP_PAGES[:max_pages]]

        page_urls = page_urls[:max_pages]
        logger.info(f"[SEO Audit] Found {len(page_urls)} URLs to audit")

        all_issues: List[dict] = []
        page_results: List[dict] = []
        pages_ok = 0

        async with httpx.AsyncClient(timeout=15, follow_redirects=True, verify=False) as client:
            for url in page_urls:
                try:
                    resp = await client.get(url)
                    if resp.status_code != 200:
                        all_issues.append({"url": url, "category": "accessibility", "severity": "critical",
                                           "issue": f"HTTP {resp.status_code}", "suggestion": "Fix broken page"})
                        page_results.append({"url": url, "status": resp.status_code, "score": 0, "issues": 1})
                        continue

                    html = resp.text
                    issues = self._audit_page(url, html)
                    all_issues.extend(issues)
                    page_score = max(0, 100 - len(issues) * 8)
                    page_results.append({"url": url, "status": 200, "score": page_score,
                                         "issues": len(issues)})
                    if page_score >= 80:
                        pages_ok += 1
                except Exception as e:
                    all_issues.append({"url": url, "category": "accessibility", "severity": "critical",
                                       "issue": f"Fetch failed: {str(e)[:80]}", "suggestion": "Check if page is accessible"})
                    page_results.append({"url": url, "status": 0, "score": 0, "issues": 1})
                await asyncio.sleep(0.3)

        # Summarise
        total_pages = len(page_results)
        overall_score = round(sum(p["score"] for p in page_results) / max(total_pages, 1))
        critical = sum(1 for i in all_issues if i["severity"] == "critical")
        warnings = sum(1 for i in all_issues if i["severity"] == "warning")
        info = sum(1 for i in all_issues if i["severity"] == "info")

        category_counts: Dict[str, int] = {}
        for i in all_issues:
            category_counts[i["category"]] = category_counts.get(i["category"], 0) + 1

        audit_result = {
            "date": datetime.now(timezone.utc).isoformat(),
            "site_url": site_url,
            "overall_score": overall_score,
            "pages_audited": total_pages,
            "pages_healthy": pages_ok,
            "total_issues": len(all_issues),
            "critical": critical,
            "warnings": warnings,
            "info": info,
            "category_breakdown": category_counts,
            "issues": all_issues[:200],  # cap stored issues
            "page_results": page_results,
        }

        # Store in MongoDB
        await self.db.seo_audits.insert_one({**audit_result, "recorded_at": datetime.now(timezone.utc).isoformat()})
        # remove _id before returning
        audit_result.pop("_id", None)
        logger.info(f"[SEO Audit] Complete: score={overall_score}, pages={total_pages}, issues={len(all_issues)}")
        return audit_result

    async def _get_urls_from_sitemap(self, sitemap_url: str) -> List[str]:
        """Parse sitemap XML and extract all URLs."""
        try:
            async with httpx.AsyncClient(timeout=15, follow_redirects=True, verify=False) as client:
                resp = await client.get(sitemap_url)
                if resp.status_code != 200:
                    return []
            root = ET.fromstring(resp.text)
            ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            return [loc.text for loc in root.findall(".//s:loc", ns) if loc.text]
        except Exception as e:
            logger.error(f"[SEO Audit] Sitemap parse error: {e}")
            return []

    def _audit_page(self, url: str, html: str) -> List[dict]:
        """Audit a single page HTML for SEO issues. Returns list of issues."""
        issues: List[dict] = []
        soup = BeautifulSoup(html, "lxml")

        # --- Title tag ---
        title_tag = soup.find("title")
        title_text = title_tag.get_text(strip=True) if title_tag else ""
        if not title_text:
            issues.append({"url": url, "category": "meta", "severity": "critical",
                           "issue": "Missing <title> tag", "suggestion": "Add a unique title (50-60 chars)"})
        elif len(title_text) < 20:
            issues.append({"url": url, "category": "meta", "severity": "warning",
                           "issue": f"Title too short ({len(title_text)} chars)", "suggestion": "Expand title to 50-60 characters"})
        elif len(title_text) > 70:
            issues.append({"url": url, "category": "meta", "severity": "warning",
                           "issue": f"Title too long ({len(title_text)} chars)", "suggestion": "Shorten title to under 60 characters"})

        # --- Meta description ---
        meta_desc = soup.find("meta", attrs={"name": "description"})
        desc_text = meta_desc.get("content", "").strip() if meta_desc else ""
        if not desc_text:
            issues.append({"url": url, "category": "meta", "severity": "critical",
                           "issue": "Missing meta description", "suggestion": "Add a meta description (120-160 chars)"})
        elif len(desc_text) < 50:
            issues.append({"url": url, "category": "meta", "severity": "warning",
                           "issue": f"Meta description too short ({len(desc_text)} chars)",
                           "suggestion": "Expand to 120-160 characters"})
        elif len(desc_text) > 170:
            issues.append({"url": url, "category": "meta", "severity": "info",
                           "issue": f"Meta description long ({len(desc_text)} chars)",
                           "suggestion": "Consider trimming to under 160 characters"})

        # --- Canonical tag ---
        canonical = soup.find("link", attrs={"rel": "canonical"})
        if not canonical or not canonical.get("href"):
            issues.append({"url": url, "category": "meta", "severity": "warning",
                           "issue": "Missing canonical tag", "suggestion": "Add <link rel='canonical'> to prevent duplicate content"})

        # --- Schema markup (JSON-LD) ---
        schema_scripts = soup.find_all("script", attrs={"type": "application/ld+json"})
        if not schema_scripts:
            issues.append({"url": url, "category": "schema", "severity": "warning",
                           "issue": "No JSON-LD schema markup", "suggestion": "Add structured data for better rich snippets"})

        # --- H1 tag ---
        h1_tags = soup.find_all("h1")
        if not h1_tags:
            issues.append({"url": url, "category": "headings", "severity": "critical",
                           "issue": "Missing H1 heading", "suggestion": "Add exactly one H1 tag per page"})
        elif len(h1_tags) > 1:
            issues.append({"url": url, "category": "headings", "severity": "warning",
                           "issue": f"Multiple H1 tags ({len(h1_tags)})", "suggestion": "Use only one H1 per page"})

        # --- Images without alt text ---
        images = soup.find_all("img")
        missing_alt = [img.get("src", "?")[:60] for img in images if not img.get("alt")]
        if missing_alt:
            issues.append({"url": url, "category": "images", "severity": "warning",
                           "issue": f"{len(missing_alt)} images missing alt text",
                           "suggestion": "Add descriptive alt text to all images"})

        # --- Content length (thin content check) ---
        body = soup.find("body")
        text_content = body.get_text(separator=" ", strip=True) if body else ""
        word_count = len(text_content.split())
        if word_count < 100:
            issues.append({"url": url, "category": "content", "severity": "warning",
                           "issue": f"Thin content ({word_count} words)",
                           "suggestion": "Aim for 300+ words of unique content"})

        # --- Open Graph tags ---
        og_title = soup.find("meta", attrs={"property": "og:title"})
        og_desc = soup.find("meta", attrs={"property": "og:description"})
        if not og_title or not og_desc:
            issues.append({"url": url, "category": "social", "severity": "info",
                           "issue": "Missing Open Graph tags", "suggestion": "Add og:title and og:description for social sharing"})

        # --- Viewport meta ---
        viewport = soup.find("meta", attrs={"name": "viewport"})
        if not viewport:
            issues.append({"url": url, "category": "mobile", "severity": "critical",
                           "issue": "Missing viewport meta tag", "suggestion": "Add viewport meta for mobile responsiveness"})

        return issues

    async def get_latest_audit(self) -> Optional[dict]:
        """Get the most recent SEO audit result."""
        doc = await self.db.seo_audits.find_one({}, {"_id": 0}, sort=[("date", -1)])
        return doc

    async def get_audit_history(self, limit: int = 30) -> List[dict]:
        """Get audit score history."""
        docs = await self.db.seo_audits.find(
            {}, {"_id": 0, "overall_score": 1, "pages_audited": 1, "total_issues": 1,
                 "critical": 1, "warnings": 1, "date": 1}
        ).sort("date", -1).to_list(limit)
        return docs

    # ─────────────────────────────────────────────────────────
    # 7. SELF-ADAPTIVE KEYWORD SELECTION
    # ─────────────────────────────────────────────────────────
    async def _get_adaptive_keywords(self, count: int) -> List[str]:
        """Select keywords adaptively based on growth analysis."""
        used_kws = set()
        async for post in self.db.blog_posts.find({"auto_generated": True}, {"keyword": 1, "_id": 0}):
            if post.get("keyword"):
                used_kws.add(post["keyword"].lower())

        fresh_kws = [k for k in AUTOMATION_KEYWORDS if k.lower() not in used_kws]

        # If growth is stalling, try to generate fresh keywords dynamically
        analysis = await self.get_growth_analysis()
        if analysis["strategy"] in ("boost", "aggressive") and len(fresh_kws) < count:
            # Generate new keywords from top-performing blog topics
            top_posts = await self.db.blog_posts.find(
                {}, {"keyword": 1, "title": 1, "_id": 0}
            ).sort("published_date", -1).to_list(10)
            # Create variations of existing successful topics
            variations = []
            for p in top_posts[:5]:
                kw = p.get("keyword", p.get("title", ""))
                if kw:
                    variations.extend([
                        f"best {kw} guide 2026",
                        f"{kw} latest treatment options",
                        f"{kw} patient recovery stories",
                    ])
            fresh_kws.extend([v for v in variations if v.lower() not in used_kws][:count])

        selected = (fresh_kws or AUTOMATION_KEYWORDS)[:count]
        return selected

    # ─────────────────────────────────────────────────────────
    # 7. WEEKLY AUTOMATION CYCLE (self-adaptive)
    # ─────────────────────────────────────────────────────────
    async def run_cycle(self) -> dict:
        """Full cycle: analyze growth → adapt → generate posts → update sitemap → ping Google."""
        logger.info("[Automation] Starting adaptive cycle...")

        # Step 1: Record today's growth snapshot
        await self.record_growth_snapshot()

        # Step 2: Analyze growth and adapt strategy
        analysis = await self.get_growth_analysis()
        posts_to_generate = analysis.get("posts_per_cycle", 3)
        strategy = analysis.get("strategy", "normal")
        logger.info(f"[Automation] Strategy: {strategy}, generating {posts_to_generate} posts")

        results = {
            "blogs_generated": 0,
            "blogs_failed": 0,
            "sitemap_urls": 0,
            "strategy": strategy,
            "posts_target": posts_to_generate,
            "growth_trend": analysis.get("trend", "unknown"),
        }

        # Step 3: Select keywords adaptively
        selected = await self._get_adaptive_keywords(posts_to_generate)

        # Step 4: Generate posts
        for kw in selected:
            post = await self.generate_blog_post(kw)
            if post:
                results["blogs_generated"] += 1
                try:
                    from server import submit_to_indexnow
                    await submit_to_indexnow([f"{BASE_URL}/blog/{post['slug']}"])
                except Exception:
                    pass
            else:
                results["blogs_failed"] += 1
            await asyncio.sleep(5)

        # Step 5: Regenerate sitemap
        results["sitemap_urls"] = await self.generate_and_write_sitemap()

        # Step 6: Ping Google
        await self.ping_google()

        # Step 7: Record post-cycle snapshot
        await self.db.automation_log.update_one(
            {"type": "weekly_run"},
            {"$set": {
                "last_run": datetime.now(timezone.utc).isoformat(),
                "last_results": results,
                "last_strategy": strategy,
            }},
            upsert=True,
        )
        logger.info(f"[Automation] Adaptive cycle done: {results}")
        return results

    # ─────────────────────────────────────────────────────────
    # 8. STATUS
    # ─────────────────────────────────────────────────────────
    async def get_status(self) -> dict:
        try:
            weekly = await self.db.automation_log.find_one({"type": "weekly_run"}, {"_id": 0}) or {}
            sitemap = await self.db.automation_log.find_one({"type": "sitemap"}, {"_id": 0}) or {}
            ping = await self.db.automation_log.find_one({"type": "google_ping"}, {"_id": 0}) or {}
            analysis = await self.get_growth_analysis()
            return {
                "scheduler_running": self._scheduler_task is not None and not self._scheduler_task.done(),
                "next_run_in": await self._next_run_hours(),
                "last_run": weekly.get("last_run"),
                "last_results": weekly.get("last_results", {}),
                "last_strategy": weekly.get("last_strategy", "normal"),
                "sitemap": {
                    "last_generated": sitemap.get("last_generated"),
                    "url_count": sitemap.get("url_count", 0),
                },
                "google_ping": {
                    "last_ping": ping.get("last_ping"),
                    "status": ping.get("status"),
                },
                "content_totals": {
                    "total_blogs": await self.db.blog_posts.count_documents({}),
                    "auto_blogs": await self.db.blog_posts.count_documents({"auto_generated": True}),
                    "conditions": await self.db.cms_pages.count_documents({"type": "condition"}),
                    "treatments": await self.db.cms_pages.count_documents({"type": "treatment"}),
                },
                "growth": analysis,
            }
        except Exception as e:
            return {"error": str(e)}

    async def _next_run_hours(self) -> Optional[float]:
        log = await self.db.automation_log.find_one({"type": "weekly_run"}, {"_id": 0})
        if not log or not log.get("last_run"):
            return 0
        last = datetime.fromisoformat(log["last_run"])
        if last.tzinfo is None:
            last = last.replace(tzinfo=timezone.utc)
        delta = timedelta(days=7) - (datetime.now(timezone.utc) - last)
        return max(0, round(delta.total_seconds() / 3600, 1))

    # ─────────────────────────────────────────────────────────
    # 10. SCHEDULER — runs every 7 days, checks every 6 hours, records daily snapshots
    #     SEO Audit runs daily, auto-fix after each audit
    # ─────────────────────────────────────────────────────────
    async def _scheduler_loop(self):
        logger.info("[Automation] Scheduler started — checking every 6 hours, SEO audit daily")
        await asyncio.sleep(10)
        await self.generate_and_write_sitemap()
        await self.ping_google()
        await self.record_growth_snapshot()

        while True:
            try:
                # Always record daily snapshot
                await self.record_growth_snapshot()

                # Run daily SEO audit + auto-fix
                await self._run_daily_seo_audit()

                hours_remaining = await self._next_run_hours()
                if hours_remaining == 0:
                    await self.run_cycle()
                else:
                    logger.info(f"[Automation] Next cycle in {hours_remaining}h")
                await asyncio.sleep(6 * 3600)
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"[Automation] Scheduler error: {e}")
                await asyncio.sleep(3600)

    async def _run_daily_seo_audit(self):
        """Run SEO audit once per day, then apply auto-fixes."""
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        existing = await self.db.seo_audits.find_one({"date": {"$regex": f"^{today}"}})
        if existing:
            logger.info(f"[SEO Audit] Already ran today ({today}), skipping")
            return

        # Read site URL
        site_url = self._get_site_url()
        audit = await self.run_seo_audit(site_url, max_pages=40)
        logger.info(f"[SEO Audit] Daily audit done: score={audit.get('overall_score')}")

        # Auto-fix after audit
        fix_result = await self.auto_fix_seo_issues(site_url)
        logger.info(f"[SEO Auto-Fix] {fix_result.get('fixes_applied', 0)} fixes applied")

    def _get_site_url(self) -> str:
        """Read site URL from frontend .env or fall back to BASE_URL."""
        try:
            env_path = Path("/app/frontend/.env")
            if env_path.exists():
                for line in env_path.read_text().splitlines():
                    if line.startswith("REACT_APP_BACKEND_URL="):
                        return line.split("=", 1)[1].strip()
        except Exception:
            pass
        return BASE_URL

    # ─────────────────────────────────────────────────────────
    # 11. SELF-HEALING SEO — auto-fix detected issues
    # ─────────────────────────────────────────────────────────
    async def auto_fix_seo_issues(self, site_url: str = None) -> dict:
        """Directly scan CMS pages and fix meta descriptions that are missing, too short, or too long."""
        fixes: List[dict] = []

        # Direct CMS scan — find ALL pages with bad meta descriptions
        cms_pages = await self.db.cms_pages.find(
            {"status": "published"},
            {"_id": 0, "slug": 1, "title": 1, "type": 1, "keywords": 1, "meta_description": 1}
        ).to_list(200)

        pages_to_fix = [
            p for p in cms_pages
            if not p.get("meta_description") or len(p.get("meta_description", "")) < 80 or len(p.get("meta_description", "")) > 160
        ]
        logger.info(f"[SEO Fix] Found {len(pages_to_fix)} CMS pages needing meta description fix")

        # Fix up to 15 pages per run
        for page in pages_to_fix[:15]:
            fix = await self._fix_cms_meta_description(page)
            if fix:
                fixes.append(fix)
            await asyncio.sleep(0.3)

        # Get latest audit score
        latest = await self.get_latest_audit()
        audit_score = latest.get("overall_score", 0) if latest else 0

        fix_record = {
            "date": datetime.now(timezone.utc).isoformat(),
            "audit_score": audit_score,
            "fixes_applied": len(fixes),
            "total_needing_fix": len(pages_to_fix),
            "fixes": fixes,
        }
        await self.db.seo_fixes.insert_one(fix_record)
        fix_record.pop("_id", None)
        logger.info(f"[SEO Fix] Complete: {len(fixes)} fixes applied out of {len(pages_to_fix)} needing fix")
        return fix_record

    async def _fix_cms_meta_description(self, page: dict) -> Optional[dict]:
        """Generate and apply an optimized meta description for a CMS page."""
        slug = page.get("slug", "")
        title = page.get("title", slug)
        page_type = page.get("type", "general")
        keywords = ", ".join(page.get("keywords", [])[:3])
        existing_desc = page.get("meta_description", "")

        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"seo-fix-{uuid.uuid4()}",
                system_message="You are an SEO expert. Generate meta descriptions that are compelling, include keywords naturally, and are EXACTLY 120-155 characters long. Return ONLY the meta description text, nothing else."
            ).with_model("openai", "gpt-4o")

            prompt = f"Write a meta description for this orthopedic medical page:\nTitle: {title}\nType: {page_type}\nKeywords: {keywords}\nDoctor: Dr. B Harsha Vardhana Reddy, Apollo Hospitals, Hyderabad\nMUST be 120-155 characters. Return ONLY the meta description."
            meta_desc = await chat.send_message(UserMessage(text=prompt))
            meta_desc = meta_desc.strip().strip('"').strip("'")[:160]

            if 50 <= len(meta_desc) <= 160:
                await self.db.cms_pages.update_one(
                    {"slug": slug},
                    {"$set": {"meta_description": meta_desc, "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
                action = "shortened" if len(existing_desc) > 160 else ("generated" if not existing_desc else "improved")
                logger.info(f"[SEO Fix] Meta description {action} for /{slug}: {len(existing_desc)}→{len(meta_desc)} chars")
                return {"type": "meta_description", "slug": slug, "value": meta_desc, "status": "applied", "action": action, "old_length": len(existing_desc), "new_length": len(meta_desc)}
        except Exception as e:
            logger.error(f"[SEO Fix] Failed to fix meta for {slug}: {e}")
        return None

    async def _fix_meta_description(self, page_url: str) -> Optional[dict]:
        """Generate and apply a meta description for a CMS page (handles missing, short, and long)."""
        slug = self._url_to_slug(page_url)
        if not slug:
            return None

        # Find the CMS page
        page = await self.db.cms_pages.find_one(
            {"slug": slug, "status": "published"}, {"_id": 0, "title": 1, "slug": 1, "type": 1, "keywords": 1, "content": 1, "meta_description": 1}
        )
        if not page:
            return None

        # Check if fix is needed: missing, too short (<80), or too long (>160)
        existing_desc = page.get("meta_description", "")
        if existing_desc and 80 <= len(existing_desc) <= 160:
            return None  # Already good length

        title = page.get("title", slug)
        page_type = page.get("type", "general")
        keywords = ", ".join(page.get("keywords", [])[:3])

        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"seo-fix-{uuid.uuid4()}",
                system_message="You are an SEO expert. Generate meta descriptions that are compelling, include keywords naturally, and are EXACTLY 120-155 characters. Return ONLY the meta description text, nothing else."
            ).with_model("openai", "gpt-4o")

            prompt = f"Write a meta description for this orthopedic medical page:\nTitle: {title}\nType: {page_type}\nKeywords: {keywords}\nDoctor: Dr. B Harsha Vardhana Reddy, Apollo Hospitals, Hyderabad\nMUST be 120-155 characters. Return ONLY the meta description."
            meta_desc = await chat.send_message(UserMessage(text=prompt))
            meta_desc = meta_desc.strip().strip('"').strip("'")[:160]

            if len(meta_desc) >= 50:
                await self.db.cms_pages.update_one(
                    {"slug": slug},
                    {"$set": {"meta_description": meta_desc, "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
                action = "shortened" if len(existing_desc) > 160 else "generated"
                logger.info(f"[SEO Fix] Meta description {action} for /{slug} ({len(meta_desc)} chars)")
                return {"type": "meta_description", "slug": slug, "value": meta_desc, "status": "applied", "action": action}
        except Exception as e:
            logger.error(f"[SEO Fix] Failed to fix meta for {slug}: {e}")
        return None

    async def _fix_meta_title(self, page_url: str) -> Optional[dict]:
        """Generate and apply a meta title for a CMS page."""
        slug = self._url_to_slug(page_url)
        if not slug:
            return None

        page = await self.db.cms_pages.find_one(
            {"slug": slug, "status": "published"}, {"_id": 0, "title": 1, "slug": 1, "type": 1, "meta_title": 1}
        )
        if not page:
            return None

        if page.get("meta_title") and len(page["meta_title"]) >= 25:
            return None

        title = page.get("title", slug)
        page_type = page.get("type", "general")

        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"seo-title-{uuid.uuid4()}",
                system_message="You are an SEO expert. Generate concise page titles (50-60 chars) with primary keyword first. Return ONLY the title text."
            ).with_model("openai", "gpt-4o")

            prompt = f"Write an SEO meta title for: {title} (type: {page_type}, location: Hyderabad). Include 'Dr. Harsha' if space allows. Max 60 chars. Return ONLY the title."
            meta_title = await chat.send_message(UserMessage(text=prompt))
            meta_title = meta_title.strip().strip('"').strip("'")[:65]

            if len(meta_title) >= 20:
                await self.db.cms_pages.update_one(
                    {"slug": slug},
                    {"$set": {"meta_title": meta_title, "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
                logger.info(f"[SEO Fix] Meta title updated for /{slug}")
                return {"type": "meta_title", "slug": slug, "value": meta_title, "status": "applied"}
        except Exception as e:
            logger.error(f"[SEO Fix] Failed to fix title for {slug}: {e}")
        return None

    def _url_to_slug(self, url: str) -> Optional[str]:
        """Extract the last path segment as slug from a URL."""
        try:
            from urllib.parse import urlparse
            path = urlparse(url).path.strip("/")
            parts = path.split("/")
            if len(parts) >= 2:
                return parts[-1]  # e.g. /conditions/osteoarthritis → osteoarthritis
            elif len(parts) == 1 and parts[0]:
                return parts[0]
        except Exception:
            pass
        return None

    async def get_latest_fixes(self) -> Optional[dict]:
        """Get the most recent auto-fix result."""
        doc = await self.db.seo_fixes.find_one({}, {"_id": 0}, sort=[("date", -1)])
        return doc

    async def get_fix_history(self, limit: int = 20) -> List[dict]:
        """Get auto-fix history."""
        docs = await self.db.seo_fixes.find(
            {}, {"_id": 0, "date": 1, "fixes_applied": 1, "audit_score": 1}
        ).sort("date", -1).to_list(limit)
        return docs

    # ─────────────────────────────────────────────────────────
    # 12. CONTENT GAP ANALYSIS & ENRICHMENT
    # ─────────────────────────────────────────────────────────
    async def analyze_content_gaps(self) -> dict:
        """Analyze all CMS pages to find content gaps and thin pages."""
        conditions = await self.db.cms_pages.find(
            {"type": "condition", "status": "published"}, {"_id": 0}
        ).to_list(200)
        treatments = await self.db.cms_pages.find(
            {"type": "treatment", "status": "published"}, {"_id": 0}
        ).to_list(200)

        def score_page(page: dict, page_type: str) -> dict:
            content = page.get("content", {})
            slug = page.get("slug", "")
            title = page.get("title", slug)
            text_dump = json.dumps(content)
            word_count = len(text_dump.split())

            if page_type == "condition":
                checks = {
                    "overview": bool(content.get("overview", "")),
                    "introduction": bool(content.get("introduction", "")),
                    "symptoms": len(content.get("symptoms", [])) >= 3,
                    "causes": len(content.get("causes", [])) >= 2,
                    "treatments": len(content.get("treatments", [])) >= 2,
                    "faq": len(content.get("faq", content.get("faqs", []))) >= 2,
                    "prevention": bool(content.get("prevention", content.get("prevention_tips", []))),
                    "when_to_see_doctor": bool(content.get("when_to_see_doctor", content.get("whenToSeeDoctor", ""))),
                }
            else:
                checks = {
                    "description": bool(content.get("description", "")),
                    "benefits": len(content.get("benefits", [])) >= 2,
                    "procedure_steps": len(content.get("procedure_steps", content.get("procedure", []))) >= 2,
                    "recovery": bool(content.get("recovery", content.get("recovery_info", {}))),
                    "faq": len(content.get("faq", content.get("faqs", []))) >= 2,
                    "risks": bool(content.get("risks", content.get("risks_complications", []))),
                    "candidacy": bool(content.get("ideal_candidates", content.get("candidacy", ""))),
                }

            filled = sum(1 for v in checks.values() if v)
            total = len(checks)
            completeness = round((filled / total) * 100) if total else 0
            missing = [k for k, v in checks.items() if not v]

            return {
                "slug": slug,
                "title": title,
                "type": page_type,
                "word_count": word_count,
                "completeness": completeness,
                "filled_sections": filled,
                "total_sections": total,
                "missing_sections": missing,
                "needs_enrichment": completeness < 75 or word_count < 250,
            }

        condition_scores = [score_page(p, "condition") for p in conditions]
        treatment_scores = [score_page(p, "treatment") for p in treatments]
        all_scores = condition_scores + treatment_scores
        all_scores.sort(key=lambda x: x["completeness"])

        needs_enrichment = [s for s in all_scores if s["needs_enrichment"]]
        avg_completeness = round(sum(s["completeness"] for s in all_scores) / max(len(all_scores), 1))

        return {
            "total_pages": len(all_scores),
            "conditions_count": len(condition_scores),
            "treatments_count": len(treatment_scores),
            "avg_completeness": avg_completeness,
            "pages_needing_enrichment": len(needs_enrichment),
            "gap_pages": needs_enrichment[:30],
            "all_pages": all_scores,
        }

    async def enrich_page(self, slug: str) -> dict:
        """Enrich a single CMS page with AI-generated content for missing sections."""
        page = await self.db.cms_pages.find_one({"slug": slug, "status": "published"}, {"_id": 0})
        if not page:
            return {"error": f"Page '{slug}' not found", "slug": slug}

        content = page.get("content", {})
        page_type = page.get("type", "condition")
        title = page.get("title", slug)
        keywords = page.get("keywords", [])

        # Determine what's missing
        gap = self._get_missing_sections(content, page_type)
        if not gap:
            return {"slug": slug, "enriched": False, "message": "Page already complete"}

        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            import json as _json

            chat = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=f"enrich-{uuid.uuid4()}",
                system_message=(
                    "You are an expert medical content writer for Dr. B Harsha Vardhana Reddy, "
                    "Senior Consultant Orthopedic Surgeon at Apollo Hospitals, Financial District, Hyderabad. "
                    "Generate medically accurate, patient-friendly content. Return valid JSON only."
                ),
            ).with_model("openai", "gpt-4o")

            prompt = self._build_enrichment_prompt(title, page_type, keywords, gap, content)
            raw = await chat.send_message(UserMessage(text=prompt))

            # Parse JSON from response
            raw = raw.strip()
            if raw.startswith("```"):
                raw = raw.split("\n", 1)[1] if "\n" in raw else raw[3:]
                raw = raw.rsplit("```", 1)[0]
            new_data = _json.loads(raw)

            # Merge new sections into existing content
            updated_content = {**content}
            for key, val in new_data.items():
                if val and (key not in updated_content or not updated_content[key]):
                    updated_content[key] = val

            await self.db.cms_pages.update_one(
                {"slug": slug},
                {"$set": {"content": updated_content, "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
            logger.info(f"[Enrich] Page /{slug} enriched with {len(new_data)} sections")
            return {"slug": slug, "enriched": True, "sections_added": list(new_data.keys()), "type": page_type}

        except Exception as e:
            logger.error(f"[Enrich] Failed for /{slug}: {e}")
            return {"slug": slug, "enriched": False, "error": str(e)[:100]}

    def _get_missing_sections(self, content: dict, page_type: str) -> List[str]:
        """Identify missing sections in a CMS page."""
        if page_type == "condition":
            expected = {
                "overview": str, "introduction": str, "symptoms": list,
                "causes": list, "treatments": list, "faq": list,
                "prevention": (list, str), "when_to_see_doctor": str,
            }
        else:
            expected = {
                "description": str, "benefits": list, "procedure_steps": list,
                "recovery": (dict, str), "faq": list, "risks": list,
                "ideal_candidates": (list, str),
            }

        missing = []
        for key, _ in expected.items():
            val = content.get(key)
            if not val or (isinstance(val, (list, dict)) and len(val) == 0):
                missing.append(key)
        return missing

    def _build_enrichment_prompt(self, title: str, page_type: str, keywords: list, missing: list, existing: dict) -> str:
        """Build GPT prompt to generate missing content sections."""
        kw_str = ", ".join(keywords[:5]) if keywords else title

        if page_type == "condition":
            section_specs = {
                "overview": 'A 2-3 sentence overview of the condition (string)',
                "introduction": 'A detailed paragraph about the condition, mentions Dr. Harsha and Apollo Hospitals Hyderabad (string)',
                "symptoms": 'Array of {name, description} objects, at least 5 symptoms',
                "causes": 'Array of strings, at least 4 causes',
                "treatments": 'Array of {name, description} objects, at least 4 treatments',
                "faq": 'Array of {question, answer} objects, at least 4 FAQs relevant to patients in Hyderabad',
                "prevention": 'Array of strings, at least 4 prevention tips',
                "when_to_see_doctor": 'A paragraph about when patients should seek medical attention (string)',
            }
        else:
            section_specs = {
                "description": 'Detailed description of the treatment procedure (string, 2-3 sentences)',
                "benefits": 'Array of {title, description} objects, at least 5 benefits',
                "procedure_steps": 'Array of {step, title, description} objects, at least 5 steps',
                "recovery": '{"timeline": "string", "tips": ["string"], "follow_up": "string"}',
                "faq": 'Array of {question, answer} objects, at least 4 FAQs',
                "risks": 'Array of strings listing potential risks/complications',
                "ideal_candidates": 'A paragraph describing who is a good candidate (string)',
            }

        needed = {k: section_specs[k] for k in missing if k in section_specs}
        if not needed:
            return ""

        spec_text = "\n".join(f'  "{k}": {v}' for k, v in needed.items())

        return f"""Generate ONLY the missing content sections for this orthopedic {page_type} page.

TOPIC: {title}
KEYWORDS: {kw_str}
DOCTOR: Dr. B Harsha Vardhana Reddy, Apollo Hospitals, Financial District, Hyderabad

Generate these missing sections as a JSON object:
{{
{spec_text}
}}

RULES:
- Medically accurate, patient-friendly language
- Naturally include keywords and location (Hyderabad)
- Mention Dr. Harsha 1-2 times across all sections
- Return ONLY valid JSON, no markdown, no explanation
- All text should be in English"""

    async def bulk_enrich(self, slugs: List[str] = None, max_pages: int = 10) -> dict:
        """Bulk enrich multiple pages. If no slugs provided, auto-detect gaps."""
        if not slugs:
            gaps = await self.analyze_content_gaps()
            slugs = [p["slug"] for p in gaps.get("gap_pages", [])[:max_pages]]

        if not slugs:
            return {"enriched": 0, "results": [], "message": "No pages need enrichment"}

        results = []
        for slug in slugs[:max_pages]:
            r = await self.enrich_page(slug)
            results.append(r)
            await asyncio.sleep(1)  # Rate limit

        enriched = sum(1 for r in results if r.get("enriched"))
        return {"enriched": enriched, "total_attempted": len(results), "results": results}

    def launch(self):
        """Start the background automation scheduler."""
        loop = asyncio.get_event_loop()
        self._scheduler_task = loop.create_task(self._scheduler_loop())
        return self._scheduler_task
