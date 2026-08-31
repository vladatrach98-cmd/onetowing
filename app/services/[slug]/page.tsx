import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { BUSINESS, PRICING } from '../../lib/constants';
import {
  SERVICE_PAGES,
  findServicePage,
  relatedServicePages,
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
        provider: { '@id': `${BUSINESS.siteUrl}/#business` },
        areaServed: {
          '@type': 'City',
          name: 'Tampa',
          containedInPlace: { '@type': 'State', name: 'Florida' },
        },
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

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              {page.kicker}
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              {page.h1}
            </h1>
            <p className="mt-7 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              {page.intro}
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-9 inline-block bg-brand-500 px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </section>

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
                Local tow from ${PRICING.baseFee}. We will not give you an arrival time over the internet that we
                might not keep — call and we will tell you where the truck actually is.
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

        {related.length > 0 ? (
          <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
            <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Other things we do
              </h2>
              <div className="mt-9 grid gap-px bg-bone-200 sm:grid-cols-3">
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
              <Link
                href="/services"
                className="mt-8 inline-block text-[15px] font-bold uppercase tracking-[0.12em] text-brand-600 hover:underline"
              >
                All services →
              </Link>
            </div>
          </section>
        ) : null}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page)) }} />
    </>
  );
}
