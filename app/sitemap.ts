import type { MetadataRoute } from 'next';
import { BUSINESS, ESTIMATOR_ENABLED } from './lib/constants';

/**
 * Отдаётся по адресу /sitemap.xml — список страниц для Google.
 * Скрытые страницы (калькулятор за флагом) в карту не попадают.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${BUSINESS.siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
  ];

  if (ESTIMATOR_ENABLED) {
    pages.push({
      url: `${BUSINESS.siteUrl}/estimate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return pages;
}
