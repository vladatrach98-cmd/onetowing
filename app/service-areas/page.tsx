import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import {
  AREA_GROUPS,
  BASE_LOCATION,
  BRIDGE_CORRIDORS,
  BUSINESS,
  HIGHWAYS,
  MAIN_SERVICE_AREAS,
  PRICING,
} from '../lib/constants';
import { serviceAreaHref } from '../data/service-areas';
import { CORE_SERVICE_PAGES } from '../data/services-content';

/**
 * ЗОНА ОБСЛУЖИВАНИЯ — /service-areas.
 *
 * Одна аккуратная страница вместо простыни районов и ZIP-кодов на главной.
 * Районы сгруппированы по направлению от базы — так человек находит себя
 * быстрее, чем в алфавитном списке. Город, у которого уже написана своя
 * страница (пока Brandon), становится ссылкой.
 *
 * ⚠️ Список берётся из AREA_GROUPS в constants.ts и должен совпадать с зоной
 * в карточке Google Business Profile.
 */

const title = `Service Areas | Towing & Roadside Assistance in Tampa Bay | ${BUSINESS.name}`;
const description =
  `${BUSINESS.name} covers Tampa, Brandon, Riverview, Temple Terrace, Lutz, Oldsmar, St. Petersburg, ` +
  `Clearwater and the Tampa Bay bridges, 24/7. Local tow from $${PRICING.baseFee}. Call ${BUSINESS.phone}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/service-areas' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/service-areas`, type: 'website' },
};

function areasJsonLd() {
  const url = `${BUSINESS.siteUrl}/service-areas`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: 'Towing and roadside assistance in Tampa Bay',
        serviceType: 'Towing service',
        url,
        provider: { '@id': `${BUSINESS.siteUrl}/#business` },
        areaServed: MAIN_SERVICE_AREAS.map((city) => ({
          '@type': 'City',
          name: city,
          containedInPlace: { '@type': 'State', name: 'Florida' },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: `${BUSINESS.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Service areas', item: url },
        ],
      },
    ],
  };
}

export default function ServiceAreasPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 pb-[64px] pt-[40px] sm:py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              Service areas
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              Where we tow and help on the roadside
            </h1>
            <p className="mt-6 max-w-[70ch] text-[19px] font-semibold leading-[1.5] text-white text-pretty">
              {MAIN_SERVICE_AREAS.join(' · ')}
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-7 flex w-full items-center justify-center gap-3 bg-brand-500 px-[30px] py-[20px] font-display text-[22px] font-black leading-none text-white transition-colors hover:bg-brand-600 hover:text-white sm:inline-flex sm:w-auto sm:text-[26px]"
            >
              <span aria-hidden="true" className="text-[0.85em]">
                ☎
              </span>
              Call Now {BUSINESS.phone}
            </a>
            <p className="mt-8 max-w-[80ch] text-[18px] leading-[1.6] text-ink-200 text-pretty">
              Our truck runs out of {BASE_LOCATION.address}, in Downtown Tampa, 24 hours a day. From there we cover
              Tampa, the towns east and north of it, and across the bay into St. Petersburg and Clearwater. Not on
              the list? Call anyway — if it is within reach, we come.
            </p>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <div className="grid gap-px border border-bone-200 bg-bone-200 sm:grid-cols-2 lg:grid-cols-3">
              {AREA_GROUPS.map((group) => (
                <div key={group.title} className="bg-white px-7 py-8">
                  <h2 className="font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
                    {group.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-[1.55] text-ink-500 text-pretty">{group.note}</p>
                  <ul className="mt-5 grid list-none gap-2 p-0">
                    {group.areas.map((area) => {
                      const href = serviceAreaHref(area.name);
                      const isMain = 'main' in area && area.main;
                      const cls = `text-[17px] leading-[1.4] ${isMain ? 'font-bold text-ink-700' : 'text-ink-600'}`;
                      return (
                        <li key={area.name}>
                          {href ? (
                            <Link href={href} className={`${cls} underline underline-offset-4 hover:text-brand-600`}>
                              {area.name}
                            </Link>
                          ) : (
                            <span className={cls}>{area.name}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="bg-white px-7 py-8">
                <h2 className="font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700">
                  Tampa Bay bridges
                </h2>
                <p className="mt-2 text-[15px] leading-[1.55] text-ink-500 text-pretty">
                  Barely a shoulder and nowhere to walk — stay in the car, hazards on, and call.
                </p>
                <ul className="mt-5 grid list-none gap-3 p-0">
                  {BRIDGE_CORRIDORS.map((bridge) => (
                    <li key={bridge.name}>
                      <p className="text-[17px] font-bold leading-[1.4] text-ink-700">
                        {bridge.name} <span className="font-semibold text-ink-500">({bridge.road})</span>
                      </p>
                      <p className="mt-1 text-[15px] leading-[1.5] text-ink-500">{bridge.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-10 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-bone-label">
              Highways we run
            </p>
            <p className="mt-4 text-[17px] font-semibold leading-[1.7] text-ink-700">{HIGHWAYS.join(' · ')}</p>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              What we do in all of these areas
            </h2>
            <div className="mt-9 grid gap-px bg-bone-200 sm:grid-cols-2 lg:grid-cols-5">
              {CORE_SERVICE_PAGES.map((page) => (
                <Link
                  key={page.slug}
                  href={`/services/${page.slug}`}
                  className="block bg-white px-6 py-7 text-inherit transition-colors hover:bg-bone-hover"
                >
                  <p className="font-display text-[19px] font-extrabold leading-[1.2] text-ink-700">{page.name}</p>
                  <p className="mt-3 text-[15px] leading-[1.55] text-ink-500 text-pretty">{page.cardLine}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-500 text-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-6 py-[60px] lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Stuck somewhere in Tampa Bay?
              </h2>
              <p className="mt-3 text-[17px] leading-[1.55] text-ember-body">
                A real person picks up, day or night. {BUSINESS.hours}.
              </p>
            </div>
            <a
              href={BUSINESS.phoneHref}
              className="bg-white px-8 py-[19px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-brand-600 transition-colors hover:bg-bone-100 hover:text-brand-600"
            >
              Call Now {BUSINESS.phone}
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areasJsonLd()) }} />
    </>
  );
}
