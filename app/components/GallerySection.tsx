import Image from 'next/image';
import { getGallery, isDemoContent } from '../lib/gallery';

export default function GallerySection() {
  const photos = getGallery();

  // Нет фото — секции нет (пустой блок на сайте выглядит хуже, чем его отсутствие).
  if (photos.length === 0) return null;

  return (
    // Тёмная секция намеренно: подряд идёт пять светлых блоков, а фотографии
    // на тёмном фоне читаются контрастнее, чем на белом.
    <section id="photos" className="scroll-mt-[120px] border-t border-white/[0.08] bg-ink-950 text-ink-200">
      <div className="mx-auto max-w-[1280px] px-6 pb-[100px] pt-[96px] lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-white/20 pb-[30px]">
          <div>
            <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-300">
              Photos
            </p>
            <h2 className="max-w-[720px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-white text-balance sm:text-[36px] lg:text-[40px]">
              Real trucks, real jobs around Tampa Bay.
            </h2>
          </div>
          <p className="max-w-[380px] text-[17px] leading-[1.6] text-ink-300 text-pretty">
            Straight from the road — loading, transport and roadside work as it actually looks.
          </p>
        </div>

        {isDemoContent ? (
          <p className="mt-6 bg-white/[0.06] px-5 py-3 text-[14px] text-ink-300">
            Demo tiles — visible only in local preview (NEXT_PUBLIC_DEMO_CONTENT=1).
          </p>
        ) : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <figure key={`${photo.src}-${index}`} className="group m-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {photo.caption ? (
                <figcaption className="mt-2.5 text-[15px] leading-[1.5] text-ink-500">{photo.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
