import type { MetadataRoute } from 'next';
import { BUSINESS, ESTIMATOR_ENABLED } from './lib/constants';
import { SERVICE_AREA_PAGES } from './data/service-areas';
import { SERVICE_PAGES } from './data/services-content';

/**
 * Отдаётся по адресу /sitemap.xml — список страниц для Google.
 * Скрытые страницы (калькулятор за флагом) в карту не попадают.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${BUSINESS.siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    // Страницы «кто мы» и «частые вопросы» — с них поисковики и ИИ берут ответ
    // на вопрос «что такое ONE TOWING». Без них Google подставлял чужую компанию.
    { url: `${BUSINESS.siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BUSINESS.siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Страница записи. Её адрес стоит в карточке Google как ссылка
    // на бронирование, поэтому она должна быть в карте сайта.
    { url: `${BUSINESS.siteUrl}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // Страницы услуг. Оглавление и по странице на каждую услугу — список
    // берётся из самих страниц, забыть новую невозможно.
    { url: `${BUSINESS.siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICE_PAGES.map((page) => ({
      url: `${BUSINESS.siteUrl}/services/${page.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Страницы районов. Список берётся из самих страниц: написали новый
    // район — он попадает в карту сайта сам, забыть невозможно.
    ...SERVICE_AREA_PAGES.map((area) => ({
      url: `${BUSINESS.siteUrl}/service-areas/${area.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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
