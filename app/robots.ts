import type { MetadataRoute } from 'next';
import { BUSINESS } from './lib/constants';

/**
 * Отдаётся по адресу /robots.txt — говорит поисковикам, что можно индексировать.
 *
 * Роботы ИИ-поисковиков перечислены отдельно и явно. Формально их пускает и общее
 * правило `*`, но явная запись защищает от случайного запрета в будущем и сразу
 * видна тому, кто откроет robots.txt.
 *
 * ⚠️ Не путать два разных робота OpenAI:
 *   OAI-SearchBot — поиск внутри ChatGPT, от него зависит попадание в ответы. Пускаем.
 *   GPTBot        — сбор данных для обучения моделей. Тоже пускаем, но это уже выбор
 *                   владельца: на выдачу в ChatGPT он не влияет.
 */
const AI_CRAWLERS = [
  'OAI-SearchBot', // ChatGPT Search
  'ChatGPT-User', // переходы по ссылкам из чата
  'GPTBot', // обучение моделей OpenAI
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended', // ИИ-функции Google
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Служебные адреса в поиске не нужны.
        disallow: ['/api/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${BUSINESS.siteUrl}/sitemap.xml`,
    host: BUSINESS.siteUrl,
  };
}
