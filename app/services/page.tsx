import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { BUSINESS, PRICING } from '../lib/constants';
import { CORE_SERVICE_PAGES, SERVICE_PAGES, servicePrice, type ServicePage } from '../data/services-content';

/**
 * ОГЛАВЛЕНИЕ УСЛУГ — /services.
 *
 * Нужно по двум причинам. Человеку — чтобы за один экран увидеть весь список.
 * Поисковику — чтобы у каждой страницы услуги был родитель: страница без
 * входящих ссылок остаётся сиротой, и робот до неё просто не доходит.
 */

const title = `Towing & Roadside Services in Tampa, FL | ${BUSINESS.name}`;
const description =
  `Everything ${BUSINESS.name} does across Tampa Bay: towing, accident towing, roadside assistance, ` +
  `jump starts, fuel delivery and flat tires. Local tow from $${PRICING.baseFee}. Call ${BUSINESS.phone}.`;

/** Всё, что не входит в пять основных. Страницы «только для органики» — в конце. */
const OTHER_PAGES = SERVICE_PAGES.filter((page) => !page.core).sort(
  (a, b) => Number(Boolean(a.adsExcluded)) - Number(Boolean(b.adsExcluded)),
);

function ServiceCard({ page, showPrice }: { page: ServicePage; showPrice?: boolean }) {
  const price = servicePrice(page);
  return (
    <Link
      href={`/services/${page.slug}`}
      className="block bg-white px-7 py-8 text-inherit transition-colors hover:bg-bone-hover"
    >
      <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.24em] text-brand-600">
        {page.kicker}
        {showPrice ? ` · ${price.amount ? `from $${price.amount}` : price.value}` : ''}
      </p>
      <p className="mt-4 font-display text-[21px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
        {page.name}
      </p>
      <p className="mt-3 text-[16px] leading-[1.55] text-ink-500 text-pretty">{page.cardLine}</p>
    </Link>
  );
}

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/services`, type: 'website' },
};

export default function ServicesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              Services
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              What we do, and how much it costs
            </h1>
            <p className="mt-7 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              Towing starts at ${PRICING.baseFee}
              {PRICING.jumpStartFrom ? `, a jump start at $${PRICING.jumpStartFrom}` : ''}. Other roadside work is
              quoted on the call. Either way you hear the figure before anything moves.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-9 inline-block bg-brand-500 px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </section>

        <section className="bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              Main services
            </h2>
            <div className="mt-8 grid gap-px bg-bone-200 sm:grid-cols-2 lg:grid-cols-3">
              {CORE_SERVICE_PAGES.map((page) => (
                <ServiceCard key={page.slug} page={page} showPrice />
              ))}
            </div>

            <h2 className="mt-16 font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              More ways we help
            </h2>
            <div className="mt-8 grid gap-px bg-bone-200 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_PAGES.map((page) => (
                <ServiceCard key={page.slug} page={page} />
              ))}
            </div>

            <p className="mt-10 max-w-[80ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">
              Not on the list? Call anyway and describe it. If it is not something we do, we will say so and point you
              at someone who does — that costs you nothing and saves you an hour.
            </p>
          </div>
        </section>

        <section className="bg-brand-500 text-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-6 py-[60px] lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Stuck somewhere in Tampa?
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
                href="/about"
                className="border border-white px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-brand-600"
              >
                About {BUSINESS.name}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
