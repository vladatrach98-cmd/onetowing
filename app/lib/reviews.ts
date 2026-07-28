/**
 * ОТЗЫВЫ.
 *
 * Сейчас: секция готова, но реальных отзывов ещё нет — сначала нужна карточка
 * Google Business Profile. Пока карточки нет, секция показывает только кнопку
 * «Оставить отзыв» (если задан NEXT_PUBLIC_GOOGLE_REVIEWS_URL) — либо прячется.
 *
 * Потом (когда появятся живые отзывы Google) — заменяем ТОЛЬКО функцию getReviews():
 *   вариант 1: виджет Elfsight/Trustindex (вставка скрипта, без кода);
 *   вариант 2: серверный fetch Google Places API (Place Details → reviews) с кэшем.
 * Вёрстка секции останется той же.
 *
 * ⚠️ ВАЖНО: демо-отзывы — это ВЫДУМАННЫЕ тексты. Публиковать их на живом сайте
 * как настоящие нельзя (в США за фейковые отзывы штрафует FTC). Поэтому они
 * включаются только флагом NEXT_PUBLIC_DEMO_CONTENT=1 для локального просмотра.
 */

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Например 'July 2026'. */
  date: string;
  source: 'google';
};

/** Реальные отзывы. Появятся, когда заработает карточка Google. */
export const REVIEWS: Review[] = [];

/** Только для предпросмотра вёрстки. Не для продакшена. */
export const DEMO_REVIEWS: Review[] = [
  {
    author: 'Demo review — not a real customer',
    rating: 5,
    text: 'Пример того, как будет выглядеть отзыв из Google: короткий текст, звёзды, имя и дата.',
    date: 'July 2026',
    source: 'google',
  },
  {
    author: 'Demo review — not a real customer',
    rating: 5,
    text: 'Второй пример карточки. Реальные отзывы подтянутся из Google Business Profile.',
    date: 'July 2026',
    source: 'google',
  },
  {
    author: 'Demo review — not a real customer',
    rating: 5,
    text: 'Третий пример. До появления настоящих отзывов на живом сайте эта секция скрыта.',
    date: 'July 2026',
    source: 'google',
  },
];

export const isDemoContent = process.env.NEXT_PUBLIC_DEMO_CONTENT === '1';

export function getReviews(): Review[] {
  if (REVIEWS.length > 0) return REVIEWS;
  return isDemoContent ? DEMO_REVIEWS : [];
}
