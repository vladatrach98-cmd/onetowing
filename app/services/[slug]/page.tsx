import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { BRIDGE_CORRIDORS, BUSINESS, MAIN_SERVICE_AREAS } from '../../lib/constants';
import { serviceAreaHref } from '../../data/service-areas';
import {
  CORE_SERVICE_PAGES,
  SERVICE_PAGES,
  findServicePage,
  relatedServicePages,
  servicePrice,
  type ServicePage,
} from '../../data/services-content';

/**
 * СТРАНИЦА ОДНОЙ УСЛУГИ — /services/jump-start и остальные.
 *
 * Оболочка общая, СОДЕРЖАНИЕ целиком приходит из `app/data/services-content.ts`,
 * где каждая услуга написана руками. Подстановки названия услуги в общий текст
 * здесь нет ни одной: страницы, отличающиеся только словом в заголовке, Google
 * считает doorway-страницами и наказывает за них весь сайт.
 *
 * `dynamicParams = false`: неизвестный адрес отдаёт 404, а не пустую страницу.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = findServicePage(params.slug);
  if (!page) return {};

  const url = `${BUSINESS.siteUrl}/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, type: 'website' },
  };
}

/**
 * Разметка для поисковиков и ИИ. Услуга ссылается на карточку бизнеса по `@id`
 * из главной разметки — так Google понимает, что это тот же самый бизнес.
 * Вопросы и ответы слово в слово те же, что видит человек ниже.
 */
function serviceJsonLd(page: ServicePage) {
  const url = `${BUSINESS.siteUrl}/services/${page.slug}`;
  const price = servicePrice(page);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.name,
        description: page.metaDescription,
        serviceType: page.name,
        url,
        ...(page.photos && page.photos.length > 0
          ? { image: page.photos.map((photo) => `${BUSINESS.siteUrl}${photo.src}`) }
          : {}),
        provider: { '@id': `${BUSINESS.siteUrl}/#business` },
        // Зона — те же главные города, что на странице и в карточке Google.
        areaServed: MAIN_SERVICE_AREAS.map((city) => ({
          '@type': 'City',
          name: city,
          containedInPlace: { '@type': 'State', name: 'Florida' },
        })),
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        // Цена — только если она опубликована. «Call for price» в разметку не пишем.
        ...(price.amount
          ? {
              offers: {
                '@type': 'Offer',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: price.amount,
                  priceCurrency: 'USD',
                },
              },
            }
          : {}),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faq.map((faq) => ({
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
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BUSINESS.siteUrl}/services` },
          { '@type': 'ListItem', position: 3, name: page.name, item: url },
        ],
      },
    ],
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = findServicePage(params.slug);
  if (!page) notFound();

  const related = relatedServicePages(page);
  const price = servicePrice(page);
  // Основные услуги — всегда, кроме текущей. Lockout сюда не попадает никогда.
  const coreLinks = CORE_SERVICE_PAGES.filter((item) => item.slug !== page.slug);

  return (
    <>
      <SiteHeader />
      <main>
        {/* ПЕРВЫЙ ЭКРАН. Порядок важен: что это → сколько стоит → кнопка
            звонка, и только потом абзац текста. На телефоне кнопка должна
            быть видна без прокрутки — человек из рекламы решает за секунды. */}
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 pb-[64px] pt-[40px] sm:py-[76px] lg:px-8">
            <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-brand-400">
              <span>{page.kicker}</span>
              <span aria-hidden="true" className="text-ink-500">
                ·
              </span>
              <span>24/7 · Tampa Bay</span>
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              {page.h1}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="flex items-baseline gap-2 bg-white px-4 py-[11px] text-[15px] font-semibold text-ink-950">
                {price.label}
                <b className="font-black text-brand-500">{price.value}</b>
              </span>
              <span className="border border-white/30 px-4 py-[11px] text-[15px] font-semibold text-white">
                Price told on the call, before we roll
              </span>
            </div>

            <a
              href={BUSINESS.phoneHref}
              className="mt-7 flex w-full items-center justify-center gap-3 bg-brand-500 px-[30px] py-[20px] font-display text-[22px] font-black leading-none tracking-[0.01em] text-white shadow-[0_14px_34px_-14px_rgba(200,24,31,.9)] transition-colors hover:bg-brand-600 hover:text-white sm:inline-flex sm:w-auto sm:text-[26px]"
            >
              <span aria-hidden="true" className="text-[0.85em]">
                ☎
              </span>
              Call Now {BUSINESS.phone}
            </a>
            <p className="mt-3 text-[14px] font-bold uppercase leading-none tracking-[0.08em] text-ink-100">
              24/7 Towing &amp; Roadside Assistance · A person answers
            </p>

            <p className="mt-9 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              {page.intro}
            </p>
          </div>
        </section>

        {/* Фото с работы сразу под первым экраном. Живой кадр с настоящей
            машиной делает для доверия больше, чем любой абзац текста —
            особенно у эвакуатора, где половина рынка это стоковые картинки.
            Вертикальные и горизонтальные кадры считают пропорции сами. */}
        {page.photos && page.photos.length > 0 ? (
          <section className="border-b border-bone-200 bg-bone-100">
            <div className="mx-auto max-w-[1280px] px-6 py-[64px] lg:px-8">
              <div
                className={`grid gap-6 ${page.photos.length > 1 ? 'sm:grid-cols-2' : 'max-w-[900px]'}`}
              >
                {page.photos.map((photo) => (
                  <figure key={photo.src} className="m-0">
                    <div
                      className={`relative w-full overflow-hidden bg-ink-950 ${
                        photo.height > photo.width ? 'aspect-[3/4]' : 'aspect-[4/3]'
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1280px) 620px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {photo.caption ? (
                      <figcaption className="mt-3 text-[15px] leading-[1.55] text-ink-500 text-pretty">
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* «Какие машины возим» и «когда это про вас» — рядом: человек ищет
            себя либо по машине, либо по симптому, и должен найти сразу. */}
        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[76px] lg:grid-cols-2 lg:gap-20 lg:px-8">
            {page.vehicles && page.vehiclesTitle ? (
              <div>
                <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                  {page.vehiclesTitle}
                </h2>
                <ul className="mt-8 grid list-none border-t border-bone-300 p-0">
                  {page.vehicles.map((item) => (
                    <li
                      key={item}
                      className="border-b border-bone-300 py-[15px] text-[17px] leading-[1.6] text-ink-600 text-pretty"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                {page.situationsTitle}
              </h2>
              <ul className="mt-8 grid list-none border-t border-bone-300 p-0">
                {page.situations.map((item) => (
                  <li
                    key={item}
                    className="border-b border-bone-300 py-[15px] text-[17px] leading-[1.6] text-ink-600 text-pretty"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[76px] lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                {page.stepsTitle}
              </h2>
              <ol className="mt-8 grid list-none gap-px border border-bone-200 bg-bone-200 p-0">
                {page.steps.map((step, index) => (
                  <li key={step} className="flex gap-5 bg-white px-7 py-6">
                    <span className="shrink-0 font-display text-[17px] font-extrabold leading-[1.5] text-brand-500">
                      {index + 1}
                    </span>
                    <span className="text-[17px] leading-[1.6] text-ink-600 text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                What it costs
              </h2>
              {page.pricing.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                  {paragraph}
                </p>
              ))}
              <p className="mt-7 text-[15px] leading-[1.6] text-bone-label text-pretty">
                No night, weekend or holiday surcharge. We will not give you an arrival time over the internet that
                we might not keep — call and we will tell you where the truck actually is.
              </p>
            </div>
          </div>
        </section>

        {/* Зона обслуживания. Главные города — ссылками на страницы районов,
            где они уже написаны; полный список — на /service-areas. */}
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-[64px] lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
            <div>
              <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
                Service area
              </p>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] text-balance sm:text-[32px]">
                {page.name} across Tampa Bay
              </h2>
              <p className="mt-5 text-[17px] leading-[1.6] text-ink-200 text-pretty">
                Our truck runs out of Downtown Tampa, around the clock. Not on the list? Call anyway — if it is within
                reach, we come.
              </p>
              <Link
                href="/service-areas"
                className="mt-6 inline-block text-[14px] font-bold uppercase tracking-[0.12em] text-brand-300 hover:underline"
              >
                All service areas →
              </Link>
            </div>
            <div>
              <div className="flex flex-wrap gap-2.5">
                {MAIN_SERVICE_AREAS.map((area) => {
                  const href = serviceAreaHref(area);
                  const chip = 'border border-white/25 px-4 py-2.5 text-[15px] font-semibold text-white';
                  return href ? (
                    <Link key={area} href={href} className={`${chip} transition-colors hover:border-brand-400`}>
                      {area}
                    </Link>
                  ) : (
                    <span key={area} className={chip}>
                      {area}
                    </span>
                  );
                })}
              </div>
              <p className="mt-6 text-[15px] leading-[1.6] text-ink-300 text-pretty">
                Bridges: {BRIDGE_CORRIDORS.map((bridge) => bridge.name).join(' · ')}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              {page.name} — common questions
            </h2>
            <div className="mt-9 grid gap-px bg-bone-200">
              {page.faq.map((faq) => (
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

        {/* Перелинковка. Сначала пять основных услуг — они ссылаются друг
            на друга всегда. Потом соседние узкие страницы из `related`. */}
        <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              Our main services
            </h2>
            <div className="mt-9 grid gap-px bg-bone-200 sm:grid-cols-2 lg:grid-cols-4">
              {coreLinks.map((item) => {
                const itemPrice = servicePrice(item);
                return (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className="block bg-white px-7 py-7 text-inherit transition-colors hover:bg-bone-hover"
                  >
                    <p className="font-display text-[19px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
                      {item.name}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-600">
                      {itemPrice.amount ? `From $${itemPrice.amount}` : itemPrice.value}
                    </p>
                    <p className="mt-3 text-[16px] leading-[1.55] text-ink-500 text-pretty">{item.cardLine}</p>
                  </Link>
                );
              })}
            </div>

            {related.length > 0 ? (
              <>
                <h3 className="mt-14 font-display text-[21px] font-extrabold leading-[1.2] tracking-[-0.01em] sm:text-[24px]">
                  Related
                </h3>
                <div className="mt-6 grid gap-px bg-bone-200 sm:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="block bg-white px-7 py-7 text-inherit transition-colors hover:bg-bone-hover"
                    >
                      <p className="font-display text-[19px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
                        {item.name}
                      </p>
                      <p className="mt-3 text-[16px] leading-[1.55] text-ink-500 text-pretty">{item.cardLine}</p>
                    </Link>
                  ))}
                </div>
              </>
            ) : null}

            <Link
              href="/services"
              className="mt-8 inline-block text-[15px] font-bold uppercase tracking-[0.12em] text-brand-600 hover:underline"
            >
              All services →
            </Link>
          </div>
        </section>

        <section className="bg-brand-500 text-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-6 py-[60px] lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Need this right now?
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
                Call Now {BUSINESS.phone}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page)) }} />
    </>
  );
}
