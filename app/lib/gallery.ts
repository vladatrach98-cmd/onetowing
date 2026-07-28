/**
 * ФОТО С РАБОТЫ.
 *
 * Как добавить своё фото (2 шага):
 *   1) положить файл в  public/images/gallery/   (например my-photo.jpg)
 *   2) дописать строку в массив GALLERY ниже:
 *        { src: '/images/gallery/my-photo.jpg', alt: 'Что на фото', caption: 'Подпись' },
 *
 * Пока массив пустой — секция «Photos» на сайте просто не показывается,
 * чтобы не висел пустой блок.
 */

export type GalleryPhoto = {
  src: string;
  /** Короткое описание для Google и для незрячих. Пиши по-английски. */
  alt: string;
  /** Необязательная подпись под фото. */
  caption?: string;
};

export const GALLERY: GalleryPhoto[] = [
  // Сюда пойдут реальные фото с работы.
];

/**
 * Демо-плитки, чтобы увидеть, как секция выглядит, до появления реальных фото.
 * Включаются только при NEXT_PUBLIC_DEMO_CONTENT=1 (локально), в проде выключены.
 */
export const DEMO_GALLERY: GalleryPhoto[] = [
  { src: '/one-towing-hero.png', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
  { src: '/one-towing-hero.png', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
  { src: '/one-towing-hero.png', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
];

export const isDemoContent = process.env.NEXT_PUBLIC_DEMO_CONTENT === '1';

export function getGallery(): GalleryPhoto[] {
  if (GALLERY.length > 0) return GALLERY;
  return isDemoContent ? DEMO_GALLERY : [];
}
