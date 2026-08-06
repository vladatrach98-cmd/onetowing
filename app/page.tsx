import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import { BUSINESS, ESTIMATOR_ENABLED, HIGHWAYS, PRICE_LINK, PRICING, SERVICE_AREAS } from './lib/constants';
import { LONG_DISTANCE_FROM_MILES } from './lib/pricing';
import { SERVICES } from './lib/services';

const stats = [
  { value: '24/7', label: 'Open every day' },
  { value: `From $${PRICING.baseFee}`, label: 'Local tow' },
  { value: `$${PRICING.extraMileRate}/mi`, label: 'Beyond 10 miles' },
  { value: 'Tampa Bay', label: 'Service area' },
];

/**
 * Фото в hero. Когда положишь снимок нашего трака — поменяй только эту строку на
 * '/images/one-towing-ram4500-downtown-tampa.jpg'. Next.js сам сожмёт его и отдаст
 * браузеру в WebP или AVIF, поэтому экспортировать эти форматы вручную не нужно —
 * достаточно одного файла в максимальном качестве.
 */
const HERO_PHOTO = '/images/one-towing-ram4500-downtown-tampa.jpg';

/** Полоса фактов под кнопкой звонка. Цифры берём из constants, чтобы не разъезжались. */
const heroFacts = [
  { value: `From $${PRICING.baseFee}`, label: 'Local tow' },
  { value: `$${PRICING.extraMileRate}/mi`, label: `Past ${PRICING.includedTowMiles} miles` },
  { value: '10–20 min', label: 'Downtown Tampa' },
];

/**
 * Услуги двумя группами. Цена у группы одна, поэтому её не приходится повторять
 * на каждой строке — из-за этого старый блок и выглядел таблицей.
 */
const serviceGroups = [
  {
    title: 'Towing',
    price: `From $${PRICING.baseFee}`,
    items: SERVICES.filter((service) => service.kind === 'tow'),
  },
  {
    title: 'Roadside help',
    price: 'Call for price',
    items: SERVICES.filter((service) => service.kind === 'roadside'),
  },
];

const reasons = [
  'One call, one truck, no call-center runaround',
  'Straight answers on price when you call',
  'We work nights, weekends and holidays',
  'Local — we know these streets and highways',
].map((text, index) => ({ text, num: String(index + 1).padStart(2, '0') }));

const priceRows = [
  {
    title: `Local tow — from $${PRICING.baseFee}`,
    detail: `Includes up to ${PRICING.includedApproachMiles} miles to reach you, standard loading, and up to ${PRICING.includedTowMiles} miles of towing.`,
  },
  {
    title: `Extra miles — $${PRICING.extraMileRate} per mile`,
    detail: 'Anything past the included miles, whether we drive to you or tow you further.',
  },
  {
    title: `Long distance — $${PRICING.longDistanceMileRate} per mile`,
    detail: `Long runs cost less per mile. From about ${LONG_DISTANCE_FROM_MILES} miles we switch you to this rate automatically — you always get the cheaper of the two.`,
  },
  {
    title: 'Roadside help — call for price',
    detail: 'Jump start, lockout, fuel delivery. Every case is different, so we quote it on the phone.',
  },
];

export default function Home() {
  return (
    <>
      <div className="bg-ink-950">
        <SiteHeader />

        <main>
          {/* HERO. Две колонки от 960px: текст слева (44%), фото справа (56%) в край экрана.
              Ниже 960px — сначала фото 4:3, под ним текст. */}
          <section className="relative bg-hero-ink min-[960px]:grid min-[960px]:min-h-[640px] min-[960px]:grid-cols-[44%_56%]">
            <div className="relative order-first aspect-[4/3] w-full min-[960px]:order-last min-[960px]:aspect-auto min-[960px]:h-full">
              <Image
                src={HERO_PHOTO}
                alt="ONE TOWING flatbed tow truck with the downtown Tampa skyline behind it"
                fill
                priority
                sizes="(min-width: 960px) 56vw, 100vw"
                className="object-cover object-[52%_60%] min-[960px]:object-[58%_62%]"
              />
              {/* Затемнение только со стороны текста. Дальше 44% фото не трогаем —
                  белый борт трака на фоне небоскрёбов и есть весь смысл кадра.
                  Начальный цвет = hero.ink, тот же, чем заканчивается текстовая
                  колонка, поэтому стык колонки и фото не виден. */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,#101519_0%,rgba(16,21,25,.58)_30%,rgba(16,21,25,0)_70%)] min-[960px]:bg-[linear-gradient(90deg,#101519_0%,rgba(16,21,25,.66)_15%,rgba(16,21,25,0)_44%)]" />
            </div>

            {/* Мягкий градиент вместо плоской чёрной плиты — иначе левая половина
                давит на глаза. Заканчивается ровно на hero.ink, чтобы уйти в фото. */}
            <div className="relative order-last flex flex-col justify-center bg-[linear-gradient(155deg,#1b232b_0%,#151c22_48%,#101519_100%)] px-6 pb-16 pt-12 min-[960px]:order-first min-[960px]:bg-[linear-gradient(105deg,#1b232b_0%,#151c22_55%,#101519_100%)] min-[960px]:py-[104px] min-[960px]:pl-[max(24px,calc((100vw-1280px)/2))] min-[960px]:pr-12">
              <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.3em] text-brand-300">
                Tow truck in Tampa Bay · 24/7
              </p>

              <h1 className="mt-[22px] font-display text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-white text-balance sm:text-[52px] min-[960px]:text-[58px]">
                Car trouble?{' '}
                <span className="text-hero-accent">We&rsquo;re on the way.</span>
              </h1>

              <p className="mt-6 text-[17px] leading-[1.65] text-ink-200 text-pretty sm:text-[18px]">
                Towing • Jump Starts • Fuel Delivery • Car Lockouts • Locked-Wheel Assistance
              </p>

              <div className="mt-9">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-3 bg-brand-500 px-8 py-[22px] font-display text-[19px] font-extrabold uppercase leading-none tracking-[0.06em] text-white transition-colors hover:bg-brand-600 hover:text-white sm:text-[22px]"
                >
                  <span aria-hidden="true" className="text-[0.9em]">
                    ☎
                  </span>
                  Call {BUSINESS.phone}
                </a>
                <p className="mt-[14px] text-[14px] leading-[1.5] text-ink-300">
                  A person answers — day, night, weekends
                </p>
              </div>

              {/* Разделители линиями, а не фоном плиток: под градиентом плитки
                  выглядели бы заплатками другого оттенка. */}
              <dl className="mt-11 grid max-w-[520px] grid-cols-3 divide-x divide-white/10 border-y border-white/10">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="px-4 py-[18px] text-center first:pl-0 first:text-left last:pr-0 last:text-right">
                    <dt className="font-display text-[19px] font-extrabold leading-none text-white sm:text-[21px]">
                      {fact.value}
                    </dt>
                    <dd className="mt-[7px] text-[12px] leading-[1.35] text-ink-300">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="border-t border-white/[0.08] bg-ink-900">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-ink-900 px-5 py-8 lg:px-[34px] lg:py-[38px] lg:first:pl-0 lg:last:pr-0"
                  >
                    <p className="font-display text-[26px] font-extrabold text-white lg:text-[34px]">{stat.value}</p>
                    <p className="mt-2 text-[13px] font-medium uppercase leading-[1.4] tracking-[0.16em] text-ink-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="scroll-mt-[120px] bg-white text-ink-700">
            <div className="mx-auto max-w-[1280px] px-6 pb-[110px] pt-[104px] lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-ink-700 pb-[34px]">
                <div>
                  <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                    Services
                  </p>
                  <h2 className="max-w-[760px] font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[38px] lg:text-[44px]">
                    Everything a stuck car needs, from one truck.
                  </h2>
                </div>
                <p className="max-w-[380px] text-[17px] leading-[1.6] text-ink-500 text-pretty">
                  Small roadside fixes on the spot, or a full tow to your shop, dealer or home.
                </p>
              </div>

              {/* Раньше здесь было 14 одинаковых карточек с «From $95» на каждой —
                  занимали больше экрана и читались как таблица. Теперь две группы
                  плотным списком: цена сказана один раз на группу, а не 14 раз. */}
              <div className="mt-12 grid gap-px bg-bone-200 lg:grid-cols-2">
                {serviceGroups.map((group) => (
                  <div key={group.title} className="bg-white px-7 pb-9 pt-8 lg:px-9">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b-2 border-ink-700 pb-4">
                      <h3 className="font-display text-[21px] font-extrabold leading-none tracking-[-0.01em] text-ink-700">
                        {group.title}
                      </h3>
                      <span className="text-[13px] font-semibold uppercase leading-none tracking-[0.12em] text-brand-600">
                        {group.price}
                      </span>
                    </div>

                    <ul className="m-0 list-none p-0">
                      {group.items.map((service) => (
                        <li
                          key={service.id}
                          className="border-b border-bone-200 py-[13px] text-[16px] leading-[1.5] last:border-0"
                        >
                          <span className="font-semibold text-ink-700">{service.title}</span>
                          <span className="text-ink-500"> — {service.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Человек дочитал список и не нашёл ровно свой случай — тут телефон,
                  а не тупик. У эвакуатора так бывает чаще, чем кажется. */}
              <a
                href={BUSINESS.phoneHref}
                className="group mt-px flex flex-wrap items-center justify-between gap-x-8 gap-y-4 bg-ink-700 px-7 py-8 transition-colors hover:bg-ink-950 lg:px-9"
              >
                <div>
                  <p className="font-display text-[21px] font-extrabold leading-[1.2] text-white">
                    Not sure which one you need?
                  </p>
                  <p className="mt-2 text-[16px] leading-[1.55] text-ink-300 text-pretty">
                    Describe what happened — we will tell you what it takes and what it costs.
                  </p>
                </div>
                <span className="font-display text-[22px] font-extrabold leading-none tracking-[0.02em] text-white transition-colors group-hover:text-brand-300 sm:text-[26px]">
                  ☎ {BUSINESS.phone}
                </span>
              </a>
            </div>
          </section>

          <section id="pricing" className="scroll-mt-[120px] border-t border-bone-200 bg-bone-100 text-ink-700">
            <div className="mx-auto max-w-[1280px] px-6 pb-[100px] pt-[96px] lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-ink-700 pb-[30px]">
                <div>
                  <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                    Pricing
                  </p>
                  <h2 className="max-w-[720px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px] lg:text-[40px]">
                    Simple math, told to you before the truck rolls.
                  </h2>
                </div>
                <p className="max-w-[400px] text-[17px] leading-[1.6] text-ink-500 text-pretty">
                  A flat base plus a clear per-mile rate. No night fees, no weekend fees, no surprise add-ons.
                </p>
              </div>

              <div className="grid gap-px border-b border-r border-bone-200 bg-bone-200 sm:grid-cols-2">
                {priceRows.map((row) => (
                  <div key={row.title} className="bg-white px-8 pb-8 pt-7 lg:px-9">
                    <h3 className="font-display text-[21px] font-bold leading-[1.25] text-ink-700">{row.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-ink-500 text-pretty">{row.detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-[34px]">
                {ESTIMATOR_ENABLED ? (
                  <Link
                    href="/estimate"
                    className="bg-ink-950 px-[30px] py-[19px] text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-500 hover:text-white"
                  >
                    Get an approximate price
                  </Link>
                ) : (
                  <a
                    href={BUSINESS.phoneHref}
                    className="bg-ink-950 px-[30px] py-[19px] text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-500 hover:text-white"
                  >
                    Call for your price: {BUSINESS.phone}
                  </a>
                )}
                <span className="max-w-[520px] text-[16px] text-ink-500">
                  These numbers are an estimate, not a fixed quote — the final price is agreed on the phone once we know
                  the car and the spot.
                </span>
              </div>
            </div>
          </section>

          <section id="areas" className="scroll-mt-[120px] border-t border-bone-200 bg-white text-ink-700">
            <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-[100px] pt-[96px] lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
              <div>
                <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  Service areas
                </p>
                <h2 className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px]">
                  Based in Downtown Tampa, working all of Tampa Bay.
                </h2>
                <p className="mt-5 text-[17px] leading-[1.6] text-ink-500 text-pretty">
                  Not on the list? Call anyway — if it is within reach, we come.
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {SERVICE_AREAS.map((area) => (
                    <span
                      key={area}
                      className="border border-bone-300 px-4 py-2.5 text-[15px] font-semibold text-ink-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  Highways we run
                </p>
                <h2 className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px]">
                  Broken down on the interstate?
                </h2>
                <p className="mt-5 text-[17px] leading-[1.6] text-ink-500 text-pretty">
                  Stay in the car with your seatbelt on, hazards blinking, and call. Tell us the nearest exit number.
                </p>
                <ul className="mt-8 grid list-none border-t border-bone-300 p-0">
                  {HIGHWAYS.map((highway) => (
                    <li
                      key={highway}
                      className="border-b border-bone-300 py-[15px] font-display text-[18px] font-bold text-ink-600"
                    >
                      {highway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <GallerySection />

          <ReviewsSection />

          <section className="border-t border-bone-200 bg-bone-100 text-ink-700">
            <div className="mx-auto grid max-w-[1280px] gap-16 px-6 py-[100px] lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div>
                <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  Why drivers call us
                </p>
                <h2 className="mb-[34px] font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.015em] text-balance sm:text-[38px]">
                  The same crew and the same price at 3pm or 3am.
                </h2>
                <div className="grid border-t border-bone-300">
                  {reasons.map((reason) => (
                    <div key={reason.text} className="flex items-baseline gap-[18px] border-b border-bone-300 py-5">
                      <span className="min-w-[24px] text-[12px] font-bold leading-none tracking-[0.1em] text-brand-600">
                        {reason.num}
                      </span>
                      <span className="text-[18px] text-ink-600">{reason.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  Emergency
                </p>
                <h2 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.015em] text-balance sm:text-[38px]">
                  Accident, breakdown or a car that won’t roll.
                </h2>
                <p className="mt-[22px] text-[18px] leading-[1.65] text-ink-500 text-pretty">
                  Stranded on the highway, stuck in a parking garage, or waiting after a collision? Call and we will tell
                  you straight away what it costs and how soon we can be there.
                </p>
                <ul className="mt-8 grid list-none border-t border-bone-300 p-0">
                  <li className="border-b border-bone-300 py-[18px] text-[17px] text-ink-600">
                    Accident recovery and transport to a body shop
                  </li>
                  <li className="border-b border-bone-300 py-[18px] text-[17px] text-ink-600">
                    Cars that don’t start, don’t steer or don’t roll
                  </li>
                  <li className="border-b border-bone-300 py-[18px] text-[17px] text-ink-600">
                    Night, weekend and holiday calls — same rate
                  </li>
                </ul>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-8 inline-block bg-brand-500 px-8 py-[19px] text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
                >
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
          </section>

          <section className="bg-brand-500 text-ember-ink">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-10 px-6 py-[78px] lg:px-8">
              <div className="max-w-[680px]">
                <p className="mb-[14px] text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-ember-kicker">
                  Call now
                </p>
                <h2 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.015em] text-ember-heading text-balance sm:text-[42px]">
                  Need a truck? We answer 24/7.
                </h2>
                <p className="mt-[18px] text-[18px] leading-[1.6] text-ember-body text-pretty">
                  Tow, jump start, lockout or a flat — one call and we are on the way. Ask for the current ETA when you
                  call.
                </p>
              </div>
              <div className="flex flex-wrap gap-[14px]">
                <a
                  href={BUSINESS.phoneHref}
                  className="bg-ink-950 px-8 py-[21px] text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-ink-800 hover:text-white"
                >
                  Call {BUSINESS.phone}
                </a>
                <Link
                  href={ESTIMATOR_ENABLED ? '/estimate' : '/#services'}
                  className="border border-ember-line px-8 py-[21px] text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-ember-ink transition-colors hover:border-ember-hover hover:bg-ember-hover hover:text-white"
                >
                  {ESTIMATOR_ENABLED ? 'Check the price' : 'See all services'}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
