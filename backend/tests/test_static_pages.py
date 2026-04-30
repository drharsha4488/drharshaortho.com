"""HTTP smoke tests for the static Next.js site (no backend)."""
import pytest
import requests
import re

BASE_URL = "https://dr-harsha-nextjs.preview.emergentagent.com"

PAGES = [
    "/",
    "/about",
    "/contact",
    "/testimonials",
    "/gallery",
    "/conditions",
    "/conditions/acl-tear",
    "/conditions/acl-injury",
    "/conditions/achilles-tendinitis",
    "/treatments",
    "/treatments/acl-reconstruction",
    "/treatments/ankle-ligament-reconstruction",
    "/treatments/bankart-repair",
    "/blog",
    "/best-orthopedic-surgeon-hyderabad",
    "/robotic-knee-replacement-hyderabad",
    "/knee-replacement-cost-hyderabad",
    "/sitemap.xml",
    "/robots.txt",
]


@pytest.mark.parametrize("path", PAGES)
def test_page_returns_200(path):
    r = requests.get(BASE_URL + path, timeout=20, allow_redirects=True)
    assert r.status_code == 200, f"{path} -> {r.status_code}"


def test_homepage_title_and_content():
    r = requests.get(BASE_URL + "/", timeout=20)
    assert r.status_code == 200
    html = r.text
    assert re.search(r"Best Orthopedic Surgeon", html, re.I), "Title/H1 missing"
    assert "wa.me/919959964567" in html, "WhatsApp deep-link missing on homepage"
    assert "99599 64567" in html or "9959964567" in html, "Phone number missing"


def test_whatsapp_float_button_on_all_pages():
    for path in ["/", "/about", "/contact", "/conditions", "/treatments", "/blog"]:
        r = requests.get(BASE_URL + path, timeout=20)
        assert r.status_code == 200, f"{path} status {r.status_code}"
        assert 'data-testid="whatsapp-float-btn"' in r.text, f"float btn missing on {path}"
        assert "wa.me/919959964567" in r.text, f"wa.me link missing on {path}"


def test_contact_has_no_traditional_form():
    r = requests.get(BASE_URL + "/contact", timeout=20)
    assert r.status_code == 200
    html = r.text.lower()
    # Look for an actual <form ... method=post> submission; WhatsApp CTA must exist
    assert "wa.me/919959964567" in r.text
    # No POST form
    assert 'method="post"' not in html, "Traditional POST form found on /contact"


def test_sitemap_contains_key_urls():
    r = requests.get(BASE_URL + "/sitemap.xml", timeout=20)
    assert r.status_code == 200
    body = r.text
    for frag in [
        "/conditions/acl-tear",
        "/treatments/acl-reconstruction",
        "/blog/",
        "/best-orthopedic-surgeon-hyderabad",
    ]:
        assert frag in body, f"sitemap missing {frag}"


def test_robots_txt_has_sitemap_reference():
    r = requests.get(BASE_URL + "/robots.txt", timeout=20)
    assert r.status_code == 200
    assert "Sitemap" in r.text or "sitemap" in r.text


def test_404_for_unknown_route():
    r = requests.get(BASE_URL + "/completely-unknown-xyz-123", timeout=20)
    assert r.status_code == 404


def test_blog_index_has_at_least_one_post_link():
    r = requests.get(BASE_URL + "/blog", timeout=20)
    assert r.status_code == 200
    # Should contain at least one link to /blog/<slug>
    links = re.findall(r'href="(/blog/[^"#?]+)"', r.text)
    links = [l for l in links if l != "/blog/"]
    assert len(links) >= 1, "No blog post links on /blog"

    # Fetch first blog post
    r2 = requests.get(BASE_URL + links[0], timeout=20)
    assert r2.status_code == 200, f"{links[0]} -> {r2.status_code}"
    assert len(r2.text) > 2000, "Blog post body too small"


def test_header_phone_and_nav_links():
    r = requests.get(BASE_URL + "/", timeout=20)
    html = r.text
    for nav in ["Home", "About", "Conditions", "Treatments", "Testimonials", "Gallery", "Blog", "Contact"]:
        assert nav in html, f"Nav link '{nav}' missing on homepage"


def test_footer_info():
    r = requests.get(BASE_URL + "/", timeout=20)
    html = r.text
    assert "Apollo" in html, "Apollo reference missing"
    assert "99599 64567" in html or "9959964567" in html


def test_homepage_stats():
    r = requests.get(BASE_URL + "/", timeout=20)
    html = r.text
    for stat in ["3500", "15+", "99%", "200"]:
        assert stat in html, f"Stat '{stat}' missing on homepage"
