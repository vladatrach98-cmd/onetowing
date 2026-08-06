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
  {
    src: '/images/gallery/one-towing-bmw-x4-wheel-lift.jpg',
    alt: 'ONE TOWING wrecker towing a BMW X4 on a wheel lift with dollies in Tampa',
    caption: 'BMW X4 on the wheel lift — dollies under the rear wheels, nothing dragging.',
  },
  {
    src: '/images/gallery/one-towing-mercedes-dollies.jpg',
    alt: 'Mercedes-Benz S-Class loaded on dollies behind a ONE TOWING wrecker at a Tampa shop',
    caption: 'Mercedes S-Class delivered to a shop — locked wheels, so it rode on dollies.',
  },
];

/**
 * Демо-плитки, чтобы увидеть, как секция выглядит, до появления реальных фото.
 * Включаются только при NEXT_PUBLIC_DEMO_CONTENT=1 (локально), в проде выключены.
 */
export const DEMO_GALLERY: GalleryPhoto[] = [
  { src: '/images/one-towing-ram4500-downtown-tampa.jpg', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
  { src: '/images/one-towing-ram4500-downtown-tampa.jpg', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
  { src: '/images/one-towing-ram4500-downtown-tampa.jpg', alt: 'Demo photo placeholder', caption: 'Your photo goes here' },
];

export const isDemoContent = process.env.NEXT_PUBLIC_DEMO_CONTENT === '1';

export function getGallery(): GalleryPhoto[] {
  if (GALLERY.length > 0) return GALLERY;
  return isDemoContent ? DEMO_GALLERY : [];
}
