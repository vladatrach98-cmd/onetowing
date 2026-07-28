import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import EmergencySplash from './components/EmergencySplash';
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

const reasons = [
  'One call, one truck, no call-center runaround',
  'The price is agreed before we roll out',
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
    detail: 'Jump start, lockout, tire change, fuel delivery. Every case is different, so we quote it on the phone.',
  },
];

export default function Home() {
  return (
    <>
      <EmergencySplash />

      <div className="relative z-10 bg-ink-950">
        <SiteHeader />

        <main>
          <section className="relative overflow-hidden bg-ink-950">
            <Image
              src="/one-towing-hero.png"
              alt="One Towing tow truck at night"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,22,.92)_0%,rgba(11,16,22,.78)_55%,rgba(11,16,22,.9)_100%)] md:bg-[linear-gradient(90deg,#0b1016_0%,rgba(11,16,22,.92)_42%,rgba(11,16,22,.35)_72%,rgba(11,16,22,.55)_100%)]" />

            <div className="relative mx-auto flex min-h-[520px] max-w-[1280px] flex-col justify-center px-6 py-20 lg:px-8 lg:pb-[118px] lg:pt-[132px]">
              <p className="mb-[22px] text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-300">
                Tampa Bay · 24 hours a day
              </p>
              <h2 className="max-w-[900px] font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-[52px] lg:text-[66px] lg:leading-[1.02]">
                Towing and roadside help, whenever it happens.
              </h2>
              <p className="mt-[26px] max-w-[620px] text-[18px] leading-[1.6] text-ink-200 text-pretty sm:text-[20px]">
                Local tow from ${PRICING.baseFee}. Tell us where you are and where the car needs to go — we quote the
                price before the truck moves.
              </p>
              <div className="mt-10 flex flex-wrap gap-[14px]">
                <a
                  href={BUSINESS.phoneHref}
                  className="bg-brand-500 px-8 py-5 text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
                >
                  Call {BUSINESS.phone}
                </a>
                <Link
                  href={PRICE_LINK}
                  className="border border-white/35 px-8 py-5 text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:border-brand-500 hover:text-brand-300"
                >
                  {ESTIMATOR_ENABLED ? 'Check the price' : 'See our prices'}
                </Link>
              </div>
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

              <div className="grid gap-px border-b border-r border-bone-200 bg-bone-200 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((service, index) => (
                  <div key={service.id} className="bg-white px-8 pb-11 pt-10 transition-colors hover:bg-bone-50 lg:px-10">
                    <p className="mb-5 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-bone-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-[22px] font-bold leading-[1.25] text-ink-700">{service.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-ink-500 text-pretty">{service.description}</p>
                    <p className="mt-4 text-[13px] font-semibold uppercase leading-none tracking-[0.1em] text-brand-600">
                      {service.kind === 'tow' ? `From $${PRICING.baseFee}` : 'Call for price'}
                    </p>
                  </div>
                ))}
              </div>
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
