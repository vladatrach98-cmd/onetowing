import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { BASE_LOCATION, BUSINESS, PRICING } from '../lib/constants';

/**
 * УСЛОВИЯ ОБСЛУЖИВАНИЯ.
 *
 * Как и политика, нужна для регистрации 10DLC. Проверяющий ищет здесь
 * конкретный набор пунктов, и без любого из них заявку отклоняют:
 *
 *   — название компании;
 *   — что за программа сообщений и зачем;
 *   — как часто приходят сообщения;
 *   — куда обращаться за помощью;
 *   — как отписаться;
 *   — фразу «Message and data rates may apply»;
 *   — фразу про то, что операторы не отвечают за недоставленные сообщения.
 *
 * ⚠️ Цены берутся из `app/lib/constants.ts`, а не пишутся руками: разойдутся
 * с главной — клиент поймает на противоречии.
 */

const title = `Terms of Service | ${BUSINESS.name}`;
const description = `Terms of service for ${BUSINESS.name}, including our text messaging programme.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/terms' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/terms`, type: 'website' },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 font-display text-[24px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700 sm:text-[28px]">
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-5 max-w-[80ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">{children}</p>
);

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              Legal
            </p>
            <h1 className="font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
              Terms of Service
            </h1>
            <p className="mt-5 text-[17px] leading-[1.55] text-ink-300">Last updated: 2 September 2026</p>
          </div>
        </section>

        <section className="bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-8">
            <P>
              These terms cover the website {BUSINESS.domain} and the text messaging programme operated by{' '}
              <strong className="font-bold text-ink-700">ONE TOWING LLC</strong>, a towing and roadside assistance
              company at {BASE_LOCATION.address}.
            </P>

            <H2>Text messaging programme</H2>
            <P>
              <strong className="font-bold text-ink-700">What it is.</strong> ONE TOWING LLC sends a text message
              containing a link that lets you share the location of your vehicle with us, so we can send the truck to
              the right place. That is the entire purpose of the programme. We do not send promotions, offers or
              newsletters.
            </P>
            <P>
              <strong className="font-bold text-ink-700">How you join.</strong> Either you agree during a phone call
              with us, or you tick the optional consent box on our booking page. The box is never ticked in advance,
              and the form works without it. Agreeing to texts is not a condition of getting service.
            </P>
            <P>
              <strong className="font-bold text-ink-700">How often.</strong> Message frequency varies — normally one
              message per call or per request.
            </P>
            <P>
              <strong className="font-bold text-ink-700">Cost.</strong> We do not charge for these messages.{' '}
              <strong className="font-bold text-ink-700">Message and data rates may apply</strong> from your own mobile
              carrier.
            </P>
            <P>
              <strong className="font-bold text-ink-700">How to stop.</strong> Reply{' '}
              <strong className="font-bold text-ink-700">STOP</strong> to any message and we will send no more. Reply{' '}
              <strong className="font-bold text-ink-700">HELP</strong> for help, or call{' '}
              <a href={BUSINESS.phoneHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.phone}
              </a>
              . Telling us on the phone to stop texting also works.
            </P>
            <P>
              <strong className="font-bold text-ink-700">Delivery.</strong> Carriers are not liable for delayed or
              undelivered messages. We cannot guarantee that a message reaches you — if you are waiting for a truck and
              nothing arrives, call us.
            </P>
            <P>
              <strong className="font-bold text-ink-700">Support.</strong>{' '}
              <a href={BUSINESS.phoneHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.phone}
              </a>{' '}
              or{' '}
              <a href={BUSINESS.emailHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.email}
              </a>
              , around the clock.
            </P>

            <H2>Our services</H2>
            <P>
              We do <strong className="font-bold text-ink-700">consent towing only</strong>: the owner of the vehicle
              asks us for the tow. We do not perform repossessions, we do not tow from private property at a property
              owner&rsquo;s request, we do not immobilise vehicles, and we do not operate an impound lot.
            </P>
            <P>
              We do not change tires. Where a tire cannot be driven on, we tow the vehicle to a shop that can replace
              it.
            </P>

            <H2>Prices and quotes</H2>
            <P>
              Prices shown on this website are estimates, not final quotes. A local tow starts at $
              {PRICING.baseFee}, with ${PRICING.extraMileRate} per additional mile and a reduced rate of $
              {PRICING.longDistanceMileRate} per mile on longer runs. Roadside work is quoted on the call. You are
              given the figure before the vehicle is moved, and that figure is what you pay.
            </P>
            <P>
              We do not give arrival times over the internet. Traffic makes any such promise unreliable, so we tell you
              on the phone where the truck actually is.
            </P>

            <H2>Your responsibilities</H2>
            <P>
              Tell us accurately where the vehicle is, what it is, and whether it rolls and steers — the wrong
              equipment arriving wastes your time and ours. Remove personal belongings you need before the vehicle is
              taken. Only ask us to move a vehicle you own or are authorised to move.
            </P>

            <H2>Liability</H2>
            <P>
              We take reasonable care of every vehicle we handle. Pre-existing damage, and damage that arises from a
              defect in the vehicle itself or from an inaccurate description of its condition, remains the
              owner&rsquo;s responsibility. Nothing here removes any right you have under Florida law.
            </P>

            <H2>Changes and contact</H2>
            <P>
              We may update these terms; the date at the top shows when they last changed. Questions go to{' '}
              <a href={BUSINESS.emailHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.email}
              </a>
              . These terms are governed by the law of the State of Florida.
            </P>
            <P>
              See also our{' '}
              <Link href="/privacy" className="font-bold text-brand-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </P>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
