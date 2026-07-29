import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import EstimateForm from './EstimateForm';
import { BUSINESS, ESTIMATOR_ENABLED, PRICING } from '../lib/constants';
import { LONG_DISTANCE_FROM_MILES } from '../lib/pricing';

export const metadata: Metadata = {
  title: `Towing Price Estimate | ${BUSINESS.name}`,
  description: `Tell us what happened and where you are — get an approximate towing price in Tampa Bay. Local tow from $${PRICING.baseFee}, $${PRICING.extraMileRate} per extra mile. Open 24/7.`,
};

const formula = [
  {
    title: `Base — $${PRICING.baseFee}`,
    detail: `Up to ${PRICING.includedApproachMiles} miles for us to reach you, standard loading, and up to ${PRICING.includedTowMiles} miles of towing.`,
  },
  {
    title: `Extra miles — $${PRICING.extraMileRate}/mile`,
    detail: 'Applies both to the drive to you and to the towing leg once the included miles are used up.',
  },
  {
    title: `Long distance — $${PRICING.longDistanceMileRate}/mile`,
    detail: `From about ${LONG_DISTANCE_FROM_MILES} miles the cheaper per-mile rate kicks in on its own. We always charge whichever of the two comes out lower.`,
  },
  {
    title: 'Roadside help — call for price',
    detail: 'Jump start, lockout, fuel delivery. Quoted on the phone, no guessing games.',
  },
];

export default function EstimatePage() {
  // Калькулятор выключен флагом — страницы для посетителя просто не существует
  // (и Google её не индексирует). Включается NEXT_PUBLIC_ESTIMATOR_ENABLED=1.
  if (!ESTIMATOR_ENABLED) notFound();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-ink-950">
          <div className="mx-auto max-w-[1280px] px-6 pb-[72px] pt-[88px] lg:px-8">
            <p className="mb-5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-300">
              Price estimate
            </p>
            <h1 className="max-w-[880px] font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-[48px] lg:text-[58px]">
              A ballpark before you call — and we already know where you are.
            </h1>
            <p className="mt-6 max-w-[660px] text-[18px] leading-[1.6] text-ink-200 text-pretty sm:text-[19px]">
              Pick what happened, share your spot, and you get an approximate range plus how long our truck needs to
              reach you. The final price is always agreed with you on the phone.
            </p>
          </div>
        </section>

        <section className="border-t border-white/[0.08] bg-bone-100 text-ink-700">
          <EstimateForm />
        </section>

        <section className="border-t border-bone-200 bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 pb-[100px] pt-24 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-8 border-b-2 border-ink-700 pb-[30px]">
              <div>
                <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  How the price is built
                </p>
                <h2 className="max-w-[720px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px] lg:text-[40px]">
                  One formula, no hidden lines.
                </h2>
              </div>
              <p className="max-w-[400px] text-[17px] leading-[1.6] text-ink-500 text-pretty">
                Same rate at 3am, on a Sunday, or on a holiday. What changes the price is distance — nothing else.
              </p>
            </div>

            <div className="grid gap-px border-b border-r border-bone-200 bg-bone-200 sm:grid-cols-2">
              {formula.map((row) => (
                <div key={row.title} className="bg-white px-8 pb-[34px] pt-8 lg:px-9">
                  <h3 className="font-display text-[20px] font-bold leading-[1.3] text-ink-700">{row.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-500 text-pretty">{row.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-[720px] text-[16px] leading-[1.6] text-ink-500">
              Heavy, stuck or awkward jobs can run higher, and simple ones can run lower — that is why the calculator
              shows a range instead of a single number. Call and we will tell you exactly where your case lands.
            </p>
          </div>
        </section>

        <section className="bg-brand-500 text-ember-ink">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-10 px-6 py-[78px] lg:px-8">
            <div className="max-w-[680px]">
              <p className="mb-[14px] text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-ember-kicker">
                Ready when you are
              </p>
              <h2 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.015em] text-ember-heading text-balance sm:text-[42px]">
                Happy with the range? Let’s get a truck moving.
              </h2>
              <p className="mt-[18px] text-[18px] leading-[1.6] text-ember-body text-pretty">
                We confirm the price, tell you the current ETA, and stay in touch until your car is where it needs to
                be.
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
                href="/#services"
                className="border border-ember-line px-8 py-[21px] text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-ember-ink transition-colors hover:border-ember-hover hover:bg-ember-hover hover:text-white"
              >
                See all services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
