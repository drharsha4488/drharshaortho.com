"""Regression tests for the UI/UX Pro Max redesign (Jan 2026)."""
import re
import requests
import pytest

BASE_URL = "https://dr-harsha-nextjs.preview.emergentagent.com"
WA_URL = "wa.me/919959964567"


def _get(path):
    r = requests.get(BASE_URL + path, timeout=25)
    assert r.status_code == 200, f"{path} -> {r.status_code}"
    return r.text


# ---------- Fonts (next/font Outfit + Plus Jakarta Sans) ----------
def test_fonts_outfit_and_jakarta_loaded_on_homepage():
    html = _get("/")
    # next/font injects className variables on <html class="__variable_xxxx __variable_yyyy">
    # and preloads the woff2 assets. We verify both.
    html_tag = re.search(r"<html[^>]*>", html)
    assert html_tag, "<html> tag missing"
    class_attr = html_tag.group(0)
    variables = re.findall(r"__variable_[a-f0-9]+", class_attr)
    assert len(variables) >= 2, f"Expected >=2 next/font variable classes on <html>, got {variables}"
    # next/font preloads each font's woff2 file
    woff2 = re.findall(r'/_next/static/media/[^"\' ]+\.woff2', html)
    assert len(woff2) >= 2, f"Expected >=2 preloaded woff2 fonts, got {len(woff2)}"


# ---------- data-testid contracts ----------
def test_header_and_footer_testids_present():
    html = _get("/")
    assert 'data-testid="header"' in html, "Header testid missing"
    assert 'data-testid="footer"' in html, "Footer testid missing"


def test_whatsapp_inline_btn_testid_present_on_homepage():
    html = _get("/")
    assert 'data-testid="whatsapp-inline-btn"' in html, (
        "whatsapp-inline-btn testid missing on homepage header/hero"
    )


def test_whatsapp_float_btn_is_valid_wa_link():
    html = _get("/")
    # Extract the <a> with data-testid='whatsapp-float-btn' and check href
    m = re.search(
        r'<a[^>]*data-testid="whatsapp-float-btn"[^>]*href="([^"]+)"', html
    ) or re.search(
        r'<a[^>]*href="([^"]+)"[^>]*data-testid="whatsapp-float-btn"', html
    )
    assert m, "whatsapp-float-btn <a> not found"
    assert WA_URL in m.group(1), f"Float btn href wrong: {m.group(1)}"


@pytest.mark.parametrize(
    "tid",
    [
        "hero-whatsapp-btn",
        "cta-whatsapp-btn",
        "footer-whatsapp-btn",
    ],
)
def test_homepage_cta_testids_present(tid):
    html = _get("/")
    assert f'data-testid="{tid}"' in html, f"{tid} testid missing on homepage"


# ---------- Homepage redesign specifics ----------
def test_homepage_stats_strip():
    html = _get("/")
    for stat in ["3500", "15+", "99%", "200"]:
        assert stat in html, f"Stat '{stat}' missing on homepage"


def test_homepage_has_doctor_name_and_apollo():
    html = _get("/")
    assert re.search(r"Harsha\s*Vardhana\s*Reddy", html, re.I), "Doctor name missing"
    assert "Apollo" in html, "Apollo reference missing"


# ---------- Conditions redesign ----------
def test_conditions_index_has_many_cards_and_breadcrumb():
    html = _get("/conditions")
    # Count internal condition links (distinct hrefs)
    links = set(re.findall(r'href="(/conditions/[a-z0-9-]+)"', html))
    assert len(links) >= 30, f"Too few condition cards: {len(links)}"
    # Breadcrumb
    assert re.search(r">\s*Home\s*<", html, re.I), "Breadcrumb 'Home' missing"


# ---------- Sitemap 180+ URLs ----------
def test_sitemap_has_180_plus_urls():
    r = requests.get(BASE_URL + "/sitemap.xml", timeout=25)
    assert r.status_code == 200
    urls = re.findall(r"<loc>([^<]+)</loc>", r.text)
    assert len(urls) >= 180, f"Sitemap only has {len(urls)} URLs (<180)"


# ---------- Inner page hero gradient (swap to slate-950 via slate-900 to sky-950) ----------
@pytest.mark.parametrize(
    "path",
    ["/about", "/contact", "/testimonials", "/gallery", "/conditions", "/treatments"],
)
def test_inner_page_loads_and_has_wa_cta(path):
    html = _get(path)
    assert WA_URL in html, f"WhatsApp link missing on {path}"


# ---------- Contact: no traditional <form> ----------
def test_contact_has_no_form_element_at_all():
    html = _get("/contact").lower()
    # Hard check: no <form opening tag anywhere
    assert "<form" not in html, "A <form> element exists on /contact"
    assert WA_URL in html


# ---------- SEO landing pages still resolve ----------
@pytest.mark.parametrize(
    "path",
    [
        "/best-orthopedic-surgeon-hyderabad",
        "/robotic-knee-replacement-hyderabad",
        "/knee-replacement-cost-hyderabad",
    ],
)
def test_seo_landing_page(path):
    html = _get(path)
    assert WA_URL in html, f"WhatsApp link missing on {path}"
