# Content Authoring Guide — Dr. Harsha Ortho (Static Next.js)

The site is now fully static (no backend, no database). All content lives in plain JS files. To publish new content, edit the file, commit, and re-deploy on Vercel.

## Where to add things

| Content type        | File                                               |
|---------------------|----------------------------------------------------|
| Conditions          | `/app/frontend/lib/data.js` → `conditionsData[]`   |
| Treatments          | `/app/frontend/lib/data.js` → `treatmentsData[]`   |
| Blog posts          | `/app/frontend/lib/data.js` → `blogsData[]`        |
| SEO landing pages   | `/app/frontend/lib/seoPages.js` (and `extendedSEOPages.js`, `moreSEOPages.js`) |
| Location pages      | `/app/frontend/lib/locationPages.js` (and `locationPages2.js`, `locationPages3.js`) |

## Adding a new blog post — example

Open `/app/frontend/lib/data.js` and append to `blogsData`:

```js
{
  id: 'unique-id-here',
  slug: 'my-new-blog-slug',
  title: 'Best Knee Replacement Recovery Tips 2026',
  meta_description: '...',
  excerpt: '...',
  content: '<p>HTML content here</p>',
  cover_image: 'https://...',
  category: 'Knee',
  published_date: '2026-02-15',
  read_time: '6 min',
}
```

After saving, run `cd /app/frontend && yarn build` to regenerate static pages.

## Adding a new SEO landing page

Append to `seoLandingPages` in `/app/frontend/lib/seoPages.js`:

```js
{ slug: 'best-shoulder-surgeon-hyderabad', title: '...', keyword: '...', content: '...' }
```

The dynamic route `/[slug]` automatically generates the page.

## Re-deploying after edits

1. `git add . && git commit -m "Add new blog"`
2. Push to GitHub — Vercel auto-deploys.

## WhatsApp number

Currently hard-coded in `/app/frontend/components/WhatsAppButton.jsx` and `Header.jsx`/`Footer.jsx` as `+91 99599 64567`. Find/replace if it ever changes.
