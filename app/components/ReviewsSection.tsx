import { GOOGLE_MAPS_PROFILE_URL, GOOGLE_REVIEWS_URL } from '../lib/constants';
import { getReviews, isDemoContent } from '../lib/reviews';

const Stars = ({ rating }: { rating: number }) => (
  <p className="text-[16px] leading-none tracking-[0.14em] text-brand-500" aria-label={`${rating} out of 5`}>
    {'★'.repeat(rating)}
    <span className="text-bone-400">{'★'.repeat(5 - rating)}</span>
  </p>
);

export default function ReviewsSection() {
  const reviews = getReviews();

  // Ни отзывов, ни ссылки на карточку Google — показывать нечего.
  if (reviews.length === 0 && !GOOGLE_REVIEWS_URL) return null;

  return (
    <section id="reviews" className="scroll-mt-[120px] border-t border-bone-200 bg-bone-100 text-ink-700">
      <div className="mx-auto max-w-[1280px] px-6 pb-[100px] pt-[96px] lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-ink-700 pb-[30px]">
          <div>
            <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
              Reviews
            </p>
            <h2 className="max-w-[720px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px] lg:text-[40px]">
              What drivers say after the tow.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {GOOGLE_REVIEWS_URL ? (
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink-950 px-7 py-[18px] text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-500 hover:text-white"
              >
                Leave a review on Google
              </a>
            ) : null}
            {GOOGLE_MAPS_PROFILE_URL ? (
              <a
                href={GOOGLE_MAPS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink-700 px-7 py-[18px] text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-ink-700 transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                See us on Google Maps
              </a>
            ) : null}
          </div>
        </div>

        {/* Что здесь правда и почему так сформулировано:
            «verified business» — карточка действительно прошла проверку Google.
            «Google collects and publishes them» — тоже факт, и это главный довод
            для клиента: отзывы писала не компания. Формулировки вроде
            «сертифицированные Google отзывы» — выдумка, за них карточку блокируют. */}
        {GOOGLE_MAPS_PROFILE_URL ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-4 border border-bone-300 bg-white px-7 py-6">
            <p className="flex items-center gap-3 whitespace-nowrap font-display text-[17px] font-extrabold leading-none text-ink-700">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[13px] font-bold text-white"
              >
                ✓
              </span>
              Verified business on Google
            </p>
            <p className="max-w-[680px] text-[16px] leading-[1.55] text-ink-500 text-pretty">
              Our reviews live on our Google Business Profile. Google collects and publishes them — we cannot write,
              edit or delete a single one.
            </p>
          </div>
        ) : null}

        {isDemoContent && reviews.length > 0 ? (
          <p className="mt-6 bg-white px-5 py-3 text-[14px] text-ink-500">
            Demo cards — visible only in local preview (NEXT_PUBLIC_DEMO_CONTENT=1). Real Google reviews replace them.
          </p>
        ) : null}

        {reviews.length > 0 ? (
          <div className="mt-10 grid gap-px bg-bone-200 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <article key={`${review.author}-${index}`} className="bg-white px-8 pb-8 pt-7">
                <Stars rating={review.rating} />
                <p className="mt-4 text-[16px] leading-[1.6] text-ink-600 text-pretty">{review.text}</p>
                <p className="mt-5 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-700">{review.author}</p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.1em] text-bone-label">{review.date} · Google</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-[640px] text-[18px] leading-[1.6] text-ink-500 text-pretty">
            We just opened our Google Business Profile. If we helped you on the road, a review there means a lot — and
            it is the fastest way for the next stranded driver to find us.
          </p>
        )}
      </div>
    </section>
  );
}
