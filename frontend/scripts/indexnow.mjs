#!/usr/bin/env node
/**
 * IndexNow accelerator — pings IndexNow API (used by Bing, Yandex, Naver, Seznam,
 * and accepted by Google's URL Inspection internally) with every URL from the live sitemap.
 *
 * Usage:
 *   node scripts/indexnow.mjs                       # uses default site URL
 *   node scripts/indexnow.mjs https://yoursite.com  # custom site
 *
 * Run this RIGHT AFTER a Vercel deploy lands. New URLs typically get crawled within hours.
 */

const SITE = process.argv[2] || 'https://drharshaortho.com';
const KEY = '87951f0613a80a70e94b2e90039517e8';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP_URL = `${SITE}/sitemap.xml`;

async function fetchSitemapURLs() {
  console.log(`📥 Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  console.log(`✅ Found ${urls.length} URLs in sitemap`);
  return urls;
}

async function submitBatch(urlList) {
  const body = {
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { status: res.status, ok: res.ok, text: await res.text().catch(() => '') };
}

async function main() {
  const urls = await fetchSitemapURLs();
  if (urls.length === 0) {
    console.error('❌ No URLs found in sitemap. Aborting.');
    process.exit(1);
  }

  // IndexNow accepts up to 10,000 URLs per request — chunk to stay safe with rate limits
  const CHUNK_SIZE = 500;
  let totalAccepted = 0;
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE);
    process.stdout.write(`📡 Submitting batch ${i / CHUNK_SIZE + 1} (${chunk.length} URLs)... `);
    const result = await submitBatch(chunk);
    if (result.ok || result.status === 200 || result.status === 202) {
      console.log(`✅ ${result.status}`);
      totalAccepted += chunk.length;
    } else {
      console.log(`⚠️  ${result.status} — ${result.text.slice(0, 200)}`);
    }
    // gentle pacing
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n🎯 Done. ${totalAccepted}/${urls.length} URLs submitted to IndexNow.`);
  console.log('   Bing, Yandex, Naver, and Seznam will start crawling within hours.');
  console.log('   For Google, also visit: https://search.google.com/search-console → submit sitemap.');
}

main().catch(err => {
  console.error('💥 Fatal:', err.message);
  process.exit(1);
});
