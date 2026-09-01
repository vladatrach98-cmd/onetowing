import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import BookingForm from './BookingForm';
import { BUSINESS, PRICING } from '../lib/constants';

/**
 * СТРАНИЦА ЗАПЛАНИРОВАННОЙ ПЕРЕВОЗКИ — /book.
 *
 * Её адрес идёт в карточку Google как «ссылка на бронирование». Отсюда два
 * требования, которые нельзя нарушать:
 *
 *   1. Страница должна вести СРАЗУ к форме. Google проверяет ссылки записи и
 *      снимает те, что ведут на обычную главную вместо инструмента записи.
 *   2. Срочные вызовы сюда пускать нельзя. Человек с разбитой машиной на I-275
 *      не должен заполнять поля — поэтому телефон стоит выше формы и крупнее.
 *
 * ⚠️ Слово «бронирование» тут условное. Мы не продаём слот и не обещаем час:
 * клиент называет удобное время, владелец перезванивает и согласовывает. Иначе
 * это разошлось бы с правилом «время подачи не обещаем», которое действует на
 * всём сайте.
 */

const title = `Book a Scheduled Tow in Tampa, FL | ${BUSINESS.name}`;
const description =
  `Schedule a tow in Tampa: long-distance runs, a car you have just bought, delivery to a shop or dealership, ` +
  `motorcycle transport, or our sober driver service. Tell us when suits you and we call back to confirm. ` +
  `From $${PRICING.baseFee}. Urgent? Call ${BUSINESS.phone}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/book' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/book`, type: 'website' },
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[64px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              Schedule a pickup
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px]">
              Book a tow for a time that suits you
            </h1>
            <p className="mt-6 max-w-[74ch] text-[19px] leading-[1.6] text-ink-200 text-pretty">
              For anything you can plan ahead — a long run across Florida, a car you have just bought, a trip to the
              shop, or a ride home for you and your car after a night out. Tell us when, and we call you back to
              confirm the time and the price.
            </p>

            {/* Срочное — мимо формы. Телефон стоит выше и крупнее по этой причине. */}
            <div className="mt-8 border-l-[3px] border-brand-500 bg-white/[0.04] px-6 py-5">
              <p className="font-display text-[19px] font-extrabold leading-[1.25] text-white">
                Broken down right now? Do not fill this in.
              </p>
              <p className="mt-2 max-w-[62ch] text-[17px] leading-[1.55] text-ink-200 text-pretty">
                A form is the slow way to reach us. Call and a real person picks up, day or night.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-5 inline-block bg-brand-500 px-8 py-[17px] text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
              >
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-bone-100 text-ink-700">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-[64px] lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-8">
            <BookingForm />

            <div>
              <h2 className="font-display text-[24px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[28px]">
                How this works
              </h2>
              <ol className="mt-7 grid list-none gap-px border border-bone-200 bg-bone-200 p-0">
                {[
                  'You send the request with a time that suits you.',
                  'We call you back to confirm the time and give you the price.',
                  'Nothing is agreed until you have heard the figure.',
                  'The truck comes at the agreed time and the car goes where you said.',
                ].map((step, index) => (
                  <li key={step} className="flex gap-5 bg-white px-6 py-5">
                    <span className="shrink-0 font-display text-[17px] font-extrabold leading-[1.5] text-brand-500">
                      {index + 1}
                    </span>
                    <span className="text-[17px] leading-[1.55] text-ink-600 text-pretty">{step}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 text-[17px] leading-[1.65] text-ink-600 text-pretty">
                A local tow starts at <strong className="font-bold text-ink-700">${PRICING.baseFee}</strong>. Longer
                runs move to a cheaper per-mile rate, and you always hear the whole figure before anything moves.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-block text-[15px] font-bold uppercase tracking-[0.12em] text-brand-600 hover:underline"
              >
                All services →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
