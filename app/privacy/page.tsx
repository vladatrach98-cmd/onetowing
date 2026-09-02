import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { BASE_LOCATION, BUSINESS } from '../lib/constants';

/**
 * ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ.
 *
 * Написана не «для галочки»: без неё не пройдёт регистрация 10DLC, а её текст
 * читает живой проверяющий и сверяет с тем, что сайт реально делает.
 *
 * ⚠️ ОБЯЗАТЕЛЬНАЯ ФРАЗА. Абзац про то, что согласие на SMS не передаётся
 * третьим лицам, должен присутствовать почти дословно — это одна из двух самых
 * частых причин отказа в 2026 году. Не переписывать «своими словами».
 *
 * ⚠️ Всё здесь должно быть ПРАВДОЙ и совпадать с кодом. Список собираемых
 * данных сверен с `app/api/call-click`, `app/api/location`, `app/api/lead`
 * и `app/components/GoogleTagManager.tsx`. Меняется код — меняется и эта
 * страница, иначе получается ложное заявление о защите данных.
 */

const title = `Privacy Policy | ${BUSINESS.name}`;
const description = `How ${BUSINESS.name} handles your information, including text messages and location data.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/privacy`, type: 'website' },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 font-display text-[24px] font-extrabold leading-[1.2] tracking-[-0.01em] text-ink-700 sm:text-[28px]">
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-5 max-w-[80ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">{children}</p>
);

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-5 text-[17px] leading-[1.55] text-ink-300">Last updated: 2 September 2026</p>
          </div>
        </section>

        <section className="bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-8">
            <P>
              This policy explains what <strong className="font-bold text-ink-700">ONE TOWING LLC</strong> (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) does with your information. We are a towing and roadside assistance company based at{' '}
              {BASE_LOCATION.address}, and we operate the website {BUSINESS.domain}.
            </P>

            {/* ⚠️ Этот блок — обязательное условие регистрации SMS. Не удалять. */}
            <H2>Text messages</H2>
            <div className="mt-5 border-l-[3px] border-brand-500 bg-bone-100 px-6 py-5">
              <p className="max-w-[80ch] text-[17px] font-semibold leading-[1.65] text-ink-700 text-pretty">
                Mobile information and SMS opt-in consent will not be shared, sold, rented, or transferred to any third
                parties or affiliates for any purpose, including marketing or promotional purposes.
              </p>
            </div>
            <P>
              We send text messages only for one reason: to give you a link so you can share the location of your
              vehicle with us. We do not send marketing texts, offers, discounts or newsletters.
            </P>
            <P>
              <strong className="font-bold text-ink-700">How you consent.</strong> Either you call us and agree during
              the call to receive the link, or you tick the optional consent box on our booking page. Consent is never
              required in order to get service — you can always simply talk to us on the phone.
            </P>
            <P>
              <strong className="font-bold text-ink-700">How often.</strong> About one message per call or request.
              Message and data rates may apply. Reply <strong className="font-bold text-ink-700">STOP</strong> to any
              message to opt out, or <strong className="font-bold text-ink-700">HELP</strong> for help. You can also
              simply tell us on the phone to stop texting you, and we will.
            </P>

            <H2>Location data</H2>
            <P>
              If you use our location page, your browser asks your permission before sharing anything. We receive the
              coordinates you choose to send, their approximate accuracy, and the address those coordinates correspond
              to. We use this for one purpose only: to send the truck to the right place.
            </P>
            <P>
              We do not track you, we do not follow your movement, and we do not receive anything at all unless you
              press the button. Declining the permission still lets you place the point on the map yourself.
            </P>

            <H2>What else we collect</H2>
            <P>
              <strong className="font-bold text-ink-700">When you tap our phone number on this site,</strong> we receive
              an alert containing the approximate city derived from your internet address, which page you were on,
              whether you used a phone or a computer, and which site referred you. We do not receive your phone number
              from this — only from the call itself once you dial.
            </P>
            <P>
              <strong className="font-bold text-ink-700">When you submit a form,</strong> we receive what you typed:
              your name, phone number, email if you gave one, the addresses involved, and any note.
            </P>
            <P>
              <strong className="font-bold text-ink-700">When you call us,</strong> our call tracking provider records
              your phone number, the number you dialled, the time and duration, and may record the call itself so we
              can check what was agreed.
            </P>

            <H2>Who else sees it</H2>
            <P>
              Requests and locations you send us are delivered to the owner of the business over a private messaging
              channel. Beyond that, we use these service providers, and only to run the business:
            </P>
            <ul className="mt-5 grid max-w-[80ch] list-none gap-3 border-t border-bone-300 p-0">
              {[
                ['CallRail', 'call tracking and text messaging'],
                ['Google (Tag Manager, Analytics, Ads)', 'measuring which advertising brings calls'],
                ['OpenStreetMap', 'map tiles and turning coordinates into addresses'],
                ['Vercel', 'hosting this website'],
                ['Telegram', 'delivering your request to the owner'],
              ].map(([name, why]) => (
                <li key={name} className="border-b border-bone-300 pb-3 text-[17px] leading-[1.55] text-ink-600">
                  <strong className="font-bold text-ink-700">{name}</strong> — {why}
                </li>
              ))}
            </ul>
            <P>
              We do not sell your information to anybody, and we do not pass it to anyone for their own marketing.
            </P>

            <H2>How long we keep it</H2>
            <P>
              Job details are kept as long as we need them to run the business and meet our record-keeping obligations.
              Location coordinates are used for the job and are not stored in any database of our own — they are sent
              to the owner and live only in that message.
            </P>

            <H2>Your choices</H2>
            <P>
              You can opt out of texts at any time by replying STOP. You can ask us what we hold about you, or ask us
              to delete it, by writing to{' '}
              <a href={BUSINESS.emailHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.email}
              </a>
              . We do not knowingly collect information from children.
            </P>

            <H2>Contact</H2>
            <P>
              ONE TOWING LLC · {BASE_LOCATION.address}
              <br />
              <a href={BUSINESS.phoneHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.phone}
              </a>{' '}
              ·{' '}
              <a href={BUSINESS.emailHref} className="font-bold text-brand-600 hover:underline">
                {BUSINESS.email}
              </a>
            </P>
            <P>
              See also our{' '}
              <Link href="/terms" className="font-bold text-brand-600 hover:underline">
                Terms of Service
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
