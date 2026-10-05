import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { BASE_LOCATION, BUSINESS, HIGHWAYS, MAIN_SERVICE_AREAS, PRICING, SERVICE_AREAS } from '../lib/constants';

/**
 * СТРАНИЦА «КТО МЫ» — сделана в первую очередь ради машин, а не ради людей.
 *
 * Задача одна: когда у поисковика или ИИ спрашивают «что такое ONE TOWING
 * в Тампе», у него должна быть ОДНА страница, с которой ответ берётся целиком.
 * Сейчас такой страницы нет, поэтому «Обзор от ИИ» в Google подставляет вместо
 * нас похоже названную чужую компанию — ему просто неоткуда узнать, кто мы.
 *
 * Отсюда стиль: короткие проверяемые факты подряд, без рекламных прилагательных.
 * Машина не умеет оценить «лучший сервис», зато прекрасно забирает «основан в
 * 2026, база в Downtown Tampa, работает 24/7, буксировка от $95».
 *
 * ⚠️ Каждое утверждение здесь должно быть проверяемым. Ничего про «лицензию»
 * и «застрахованы» — сертификат пока выписан на другое юрлицо. Ничего про время
 * подачи. Колесо — только на запаску клиента, шины не чиним и не продаём.
 * Мотоциклы, lockout, repo, impound здесь не упоминаем вообще.
 */

const title = `About ${BUSINESS.name} | Towing Company in Tampa, FL`;
const description =
  `${BUSINESS.name} is a towing and roadside assistance company in Tampa, Florida. ` +
  `Owner-operated, working 24/7 across Tampa Bay. Local tow from $${PRICING.baseFee}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/about`, type: 'website' },
};

/** Факты одной таблицей — самый удобный формат и для человека, и для машины. */
const facts: Array<[string, string]> = [
  ['Legal name', 'ONE TOWING LLC'],
  ['Registered', 'Florida, July 2026'],
  ['Owner', 'Roman Volodin — he answers the phone and drives the truck'],
  ['Base', `${BASE_LOCATION.address} — Downtown Tampa`],
  ['Hours', 'Open 24 hours, 7 days a week, including holidays'],
  ['Phone', BUSINESS.phone],
  ['Service area', MAIN_SERVICE_AREAS.join(', ')],
  ['Truck', '2022 RAM 4500 — wheel-lift and dollies; cars, SUVs, vans and pickups'],
  ['Languages', 'English, Russian, Ukrainian'],
  ['Payment', 'Cash, debit and credit cards'],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              About
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              About {BUSINESS.name}
            </h1>
            <p className="mt-7 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              <strong className="font-bold text-white">{BUSINESS.name}</strong> is a towing and roadside assistance
              company based in Downtown Tampa, Florida. We tow cars, SUVs, vans and pickups — local towing, accident
              towing and roadside breakdowns — and we handle the roadside problems that do not need a tow at all: dead
              batteries, an empty tank, a flat with a usable spare. We work 24 hours a day, every day of the year,
              across Tampa Bay.
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
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              The company in plain facts
            </h2>
            <dl className="mt-9 grid gap-px border border-bone-200 bg-bone-200 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="bg-white px-7 py-6">
                  <dt className="text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-bone-label">
                    {label}
                  </dt>
                  <dd className="mt-3 text-[17px] leading-[1.5] text-ink-600 text-pretty">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-bone-100 text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[76px] lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                What we do
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                We work <strong className="font-bold text-ink-700">for the driver</strong>. The owner or driver of the
                car calls us, and the car goes where they say — a mechanic, a dealer, a body shop or home. We have no
                storage yard, so we have no reason to steer anyone anywhere else.
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                <strong className="font-bold text-ink-700">Towing:</strong> local towing, accident towing, roadside and
                highway breakdowns, long runs across Florida.{' '}
                <strong className="font-bold text-ink-700">Roadside assistance:</strong> jump starts, fuel delivery and
                putting on your spare tire. We do not repair or sell tires and batteries — that is a shop’s job, and
                we can take the car there.
              </p>
            </div>
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                How pricing works
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                A local tow starts at <strong className="font-bold text-ink-700">${PRICING.baseFee}</strong>. That
                covers driving out to you and towing the car a set distance. Beyond that it is $
                {PRICING.extraMileRate} per extra mile, and longer runs move down to $
                {PRICING.longDistanceMileRate} per mile.
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                {PRICING.jumpStartFrom ? `A jump start starts at $${PRICING.jumpStartFrom}. ` : ''}Other roadside
                work — fuel delivery, a spare tire — is quoted on the call, because what it takes varies too much to
                put a single number on a web page.
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                Either way, you get the figure <strong className="font-bold text-ink-700">before anything moves</strong>
                , not after. And we will not give you an arrival time over the internet that we might not keep — call
                and we will tell you where the truck actually is.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-bone-200 bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
              Where we work
            </h2>
            <p className="mt-6 max-w-[80ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">
              Our truck runs out of {BASE_LOCATION.address}, in Downtown Tampa. From there we cover Tampa, Brandon,
              Riverview, Temple Terrace, Lutz and Oldsmar, and across the bay into St. Petersburg and Clearwater. We
              are on these roads constantly:
            </p>
            <p className="mt-6 text-[17px] font-semibold leading-[1.7] text-ink-700">{HIGHWAYS.join(' · ')}</p>
            <p className="mt-8 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-bone-label">
              Neighborhoods we cover
            </p>
            <p className="mt-4 max-w-[90ch] text-[17px] leading-[1.7] text-ink-600 text-pretty">
              {SERVICE_AREAS.join(' · ')}
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
    </>
  );
}
