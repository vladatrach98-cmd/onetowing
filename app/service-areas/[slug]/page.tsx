import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { BASE_LOCATION, BUSINESS, PRICING } from '../../lib/constants';
import { LONG_DISTANCE_FROM_MILES } from '../../lib/pricing';
import { SERVICE_AREA_PAGES, findServiceArea, type ServiceArea } from '../../data/service-areas';

/**
 * СТРАНИЦА ОДНОГО РАЙОНА — /service-areas/brandon-fl и такие же дальше.
 *
 * Оболочка тут общая для всех районов, а СОДЕРЖАНИЕ целиком приходит из
 * `app/data/service-areas.ts`, где каждый абзац написан руками под конкретное
 * место. Почему именно так — большой комментарий в начале того файла: шаблон,
 * в который подставляется название города, Google считает doorway-страницей и
 * наказывает за это весь сайт, а не одну страницу.
 *
 * Поэтому здесь НЕТ ни одной фразы вида «towing in {city}» с подстановкой.
 * Всё, что этот файл делает сам, — это заголовки блоков, цены и кнопка звонка,
 * то есть оформление и факты, одинаковые для любого района по определению.
 *
 * `dynamicParams = false`: адрес несуществующего района отдаёт честный 404,
 * а не пустую страницу. Иначе /service-areas/что-угодно превратилось бы
 * в бесконечный источник пустышек для поисковика.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREA_PAGES.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = findServiceArea(params.slug);
  if (!area) return {};

  const url = `${BUSINESS.siteUrl}/service-areas/${area.slug}`;
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: { title: area.metaTitle, description: area.metaDescription, url, type: 'website' },
  };
}

/**
 * Разметка для поисковиков и ИИ.
 *
 * Услуга привязана к городу (`areaServed`) и ссылается на карточку бизнеса из
 * главной разметки по `@id` — так Google понимает, что это тот же самый бизнес,
 * а не второй с похожим названием. Вопросы и ответы — слово в слово те же, что
 * видит человек ниже: расхождение разметки с текстом Google считает обманом.
 */
function areaJsonLd(area: ServiceArea) {
  const url = `${BUSINESS.siteUrl}/service-areas/${area.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Towing and roadside assistance in ${area.city}, FL`,
        description: area.metaDescription,
        serviceType: 'Towing service',
        url,
        provider: { '@id': `${BUSINESS.siteUrl}/#business` },
        areaServed: {
          '@type': 'City',
          name: area.city,
          containedInPlace: { '@type': 'State', name: 'Florida' },
        },
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: PRICING.baseFee,
            priceCurrency: PRICING.currency,
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: area.faq.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: `${BUSINESS.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: area.city, item: url },
        ],
      },
    ],
  };
}

export default function ServiceAreaPage({ params }: { params: { slug: string } }) {
  const area = findServiceArea(params.slug);
  if (!area) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              {area.kicker}
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              Tow truck in {area.city}, FL — around the clock
            </h1>
            <p className="mt-7 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              {area.intro}
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-9 inline-block bg-brand-500 px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[76px] lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                How we get to {area.city}
              </h2>
              {area.approach.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Roads we run here
              </h2>
              <ul className="mt-8 grid list-none border-t border-bone-300 p-0">
                {area.roads.map((road) => (
                  <li key={road.name} className="border-b border-bone-300 py-[18px]">
                    <p className="font-display text-[18px] font-bold text-ink-700">{road.name}</p>
                    <p className="mt-2 text-[16px] leading-[1.6] text-ink-500 text-pretty">{road.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              What people call us for in {area.city}
            </h2>
            <ul className="mt-9 grid list-none gap-px border border-bone-200 bg-bone-200 p-0 sm:grid-cols-2">
              {area.calls.map((call) => (
                <li key={call} className="bg-white px-7 py-6 text-[17px] leading-[1.6] text-ink-600 text-pretty">
                  {call}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-[80ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">{area.neighbors}</p>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[76px] lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                What it costs
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                A local tow starts at <strong className="font-bold text-ink-700">${PRICING.baseFee}</strong> — that
                covers driving out to you and towing the car a set distance. Every mile past that is $
                {PRICING.extraMileRate}, and once a run passes roughly {LONG_DISTANCE_FROM_MILES} miles it moves down
                to ${PRICING.longDistanceMileRate} per mile, because that comes out cheaper for you.
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                Roadside work — a jump start, a lockout, fuel — is quoted on the call. You get the figure{' '}
                <strong className="font-bold text-ink-700">before anything moves</strong>, not after.
              </p>
            </div>
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Where the truck starts from
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                Our base is {BASE_LOCATION.address}, in Downtown Tampa. {BUSINESS.hours} — nights, weekends and
                holidays included, with no surcharge on the base price.
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                We do consent towing only: the owner of the car calls us and asks for the tow. No repossessions, no
                impound lot. Your car goes where you tell us.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              {area.city} — common questions
            </h2>
            <div className="mt-9 grid gap-px bg-bone-200">
              {area.faq.map((faq) => (
                <article key={faq.question} className="bg-white py-8">
                  <h3 className="max-w-[60ch] font-display text-[21px] font-extrabold leading-[1.25] tracking-[-0.01em] text-ink-700 sm:text-[24px]">
                    {faq.question}
                  </h3>
                  <p className="mt-4 max-w-[85ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-500 text-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-6 py-[60px] lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Stuck in {area.city}?
              </h2>
              <p className="mt-3 text-[17px] leading-[1.55] text-ember-body">
                A real person picks up, day or night. {BUSINESS.hours}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="bg-white px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-brand-600 transition-colors hover:bg-bone-100 hover:text-brand-600"
              >
                Call {BUSINESS.phone}
              </a>
              <Link
                href="/faq"
                className="border border-white px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-brand-600"
              >
                Common questions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd(area)) }} />
    </>
  );
}
