import type { MetadataRoute } from 'next';
import { BUSINESS } from './lib/constants';

/** Отдаётся по адресу /robots.txt — говорит поисковикам, что можно индексировать. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Служебные адреса в поиске не нужны.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BUSINESS.siteUrl}/sitemap.xml`,
    host: BUSINESS.siteUrl,
  };
}
