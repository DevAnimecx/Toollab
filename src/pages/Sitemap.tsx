import { tools } from '@/data/tools';

const Sitemap = () => {
  const baseUrl = 'https://toollab.dev';
  const staticPages = [
    '/',
    '/tools',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/status',
  ];

  const sitemapContent = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(path => `
        <url>
          <loc>${baseUrl}${path}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <priority>${path === '/' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
      ${tools.map(tool => `
        <url>
          <loc>${baseUrl}${tool.path}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <priority>0.9</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  // This is a hack for SPAs. We render it inside a <pre> tag.
  // A proper setup would serve this with an XML content type.
  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
      {`<?xml version="1.0" encoding="UTF-8"?>${sitemapContent.trim()}`}
    </pre>
  );
};

export default Sitemap;