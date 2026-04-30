export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://drharshaortho.com/sitemap.xml',
  };
}
