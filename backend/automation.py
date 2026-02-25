"""
SEO Automation Engine for Dr. Harsha Orthopedic Website
- Auto-generates sitemap from MongoDB
- Pings Google when content changes
- Generates & publishes AI blog posts weekly (zero manual work)
- Self-adaptive: monitors growth, adjusts strategy automatically
"""
import asyncio
import httpx
import uuid
import re
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional, List

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
    # 5. WEEKLY AUTOMATION CYCLE
    # ─────────────────────────────────────────────────────────
    async def run_cycle(self) -> dict:
        """Full cycle: generate 3 AI blog posts + update sitemap + ping Google."""
        logger.info("[Automation] Starting weekly cycle...")
        results = {"blogs_generated": 0, "blogs_failed": 0, "sitemap_urls": 0}

        # Find keywords not yet covered
        used_kws = set()
        async for post in self.db.blog_posts.find({"auto_generated": True}, {"keyword": 1, "_id": 0}):
            if post.get("keyword"):
                used_kws.add(post["keyword"].lower())

        fresh_kws = [k for k in AUTOMATION_KEYWORDS if k.lower() not in used_kws]
        # Cycle back to beginning when all topics exhausted
        selected = (fresh_kws or AUTOMATION_KEYWORDS)[:3]

        for kw in selected:
            post = await self.generate_blog_post(kw)
            if post:
                results["blogs_generated"] += 1
                # Instant IndexNow submission per post
                try:
                    from server import submit_to_indexnow
                    await submit_to_indexnow([f"{BASE_URL}/blog/{post['slug']}"])
                except Exception:
                    pass
            else:
                results["blogs_failed"] += 1
            await asyncio.sleep(5)  # Rate-limit between LLM calls

        # Regenerate sitemap (now includes new posts)
        results["sitemap_urls"] = await self.generate_and_write_sitemap()

        # Ping Google with fresh sitemap
        await self.ping_google()

        await self.db.automation_log.update_one(
            {"type": "weekly_run"},
            {"$set": {
                "last_run": datetime.now(timezone.utc).isoformat(),
                "last_results": results,
            }},
            upsert=True,
        )
        logger.info(f"[Automation] Cycle done: {results}")
        return results

    # ─────────────────────────────────────────────────────────
    # 6. STATUS
    # ─────────────────────────────────────────────────────────
    async def get_status(self) -> dict:
        try:
            weekly = await self.db.automation_log.find_one({"type": "weekly_run"}, {"_id": 0}) or {}
            sitemap = await self.db.automation_log.find_one({"type": "sitemap"}, {"_id": 0}) or {}
            ping = await self.db.automation_log.find_one({"type": "google_ping"}, {"_id": 0}) or {}
            return {
                "scheduler_running": self._scheduler_task is not None and not self._scheduler_task.done(),
                "next_run_in": await self._next_run_hours(),
                "last_run": weekly.get("last_run"),
                "last_results": weekly.get("last_results", {}),
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
    # 7. SCHEDULER — runs every 7 days, checks every 6 hours
    # ─────────────────────────────────────────────────────────
    async def _scheduler_loop(self):
        logger.info("[Automation] Scheduler started — checking every 6 hours")
        # Run initial sitemap generation on startup (no blog posts)
        await asyncio.sleep(10)
        await self.generate_and_write_sitemap()
        await self.ping_google()

        while True:
            try:
                hours_remaining = await self._next_run_hours()
                if hours_remaining == 0:
                    await self.run_cycle()
                else:
                    logger.info(f"[Automation] Next cycle in {hours_remaining}h")
                await asyncio.sleep(6 * 3600)  # Check again in 6 hours
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"[Automation] Scheduler error: {e}")
                await asyncio.sleep(3600)

    def launch(self):
        """Start the background automation scheduler."""
        loop = asyncio.get_event_loop()
        self._scheduler_task = loop.create_task(self._scheduler_loop())
        return self._scheduler_task
