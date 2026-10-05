import { GOOGLE_REVIEWS_URL, NAV_LINKS } from './constants';
import { getReviews } from './reviews';

/**
 * Меню строится по факту: если секции «Отзывы» на странице нет (карточки
 * Google ещё нет) — пункт меню не показываем.
 * Иначе клиент жмёт пункт, а страница никуда не скроллит.
 */
export function getNavLinks() {
  const hasReviews = getReviews().length > 0 || Boolean(GOOGLE_REVIEWS_URL);

  return NAV_LINKS.filter((link) => {
    if (link.href === '/#reviews') return hasReviews;
    return true;
  });
}
