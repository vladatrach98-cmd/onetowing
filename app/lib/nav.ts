import { GOOGLE_REVIEWS_URL, NAV_LINKS } from './constants';
import { getGallery } from './gallery';
import { getReviews } from './reviews';

/**
 * Меню строится по факту: если секции «Фото» или «Отзывы» на странице нет
 * (фото ещё не добавлены, карточки Google ещё нет) — пункт меню не показываем.
 * Иначе клиент жмёт пункт, а страница никуда не скроллит.
 */
export function getNavLinks() {
  const hasPhotos = getGallery().length > 0;
  const hasReviews = getReviews().length > 0 || Boolean(GOOGLE_REVIEWS_URL);

  return NAV_LINKS.filter((link) => {
    if (link.href === '/#photos') return hasPhotos;
    if (link.href === '/#reviews') return hasReviews;
    return true;
  });
}
