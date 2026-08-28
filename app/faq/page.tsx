import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { BUSINESS, PRICING } from '../lib/constants';
import { LONG_DISTANCE_FROM_MILES } from '../lib/pricing';

/**
 * ЧАСТЫЕ ВОПРОСЫ.
 *
 * Пишется под то, как люди реально спрашивают — вслух и в чат: «сколько стоит
 * эвакуатор в Тампе», «кто возит машины ночью», «отвезут ли в сервис». ИИ-поиск
 * и голосовые помощники берут ответ куском, поэтому каждый ответ здесь должен
 * быть законченным сам по себе, без «см. выше».
 *
 * ⚠️ Правила, которые нельзя нарушать в текстах:
 *   — время подачи не обещаем, только «позвоните, скажем, где машина сейчас»;
 *   — замену колёс не предлагаем, отвечаем честно «нет»;
 *   — «licensed & insured» не пишем: сертификат страховки пока на другом юрлице.
 *
 * Разметка FAQPage добавлена намеренно: вопросы и ответы на странице те же самые,
 * слово в слово. Расхождение между разметкой и видимым текстом — нарушение правил
 * Google, за него снимают расширенные результаты.
 */

const title = `FAQ | Towing in Tampa — ${BUSINESS.name}`;
const description =
  `Common questions about towing in Tampa: how much a tow costs, whether we work at night, ` +
  `what areas we cover, and where we can take your car. Local tow from $${PRICING.baseFee}. ` +
  `Call ${BUSINESS.phone}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: { title, description, url: `${BUSINESS.siteUrl}/faq`, type: 'website' },
};

type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: 'How much does a tow cost in Tampa?',
    answer: `A local tow starts at $${PRICING.baseFee}. That covers driving out to you and towing the car a set distance. Every mile beyond that is $${PRICING.extraMileRate}, and once a run passes roughly ${LONG_DISTANCE_FROM_MILES} miles it moves down to the long-distance rate of $${PRICING.longDistanceMileRate} per mile, because that works out cheaper for you. We give you the exact figure on the phone before anything moves.`,
  },
  {
    question: 'Are you open at night and on weekends?',
    answer: `Yes. ${BUSINESS.name} works 24 hours a day, seven days a week, including holidays. There is no night surcharge and no weekend surcharge on the base price. Call ${BUSINESS.phone} at any hour and a real person answers.`,
  },
  {
    question: 'How fast can you get to me?',
    answer: 'It depends where you are and what the roads look like at that moment, so we will not publish a number we might not keep. Call us and we will tell you where the nearest truck actually is and what that means for you.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'Tampa and Hillsborough County — Downtown, Ybor City, South Tampa, Hyde Park, Davis Islands, West Tampa, Tampa Heights, Seminole Heights, Drew Park, Carrollwood, Town ’n’ Country, Westchase, Temple Terrace, the University area, Brandon, Riverview and Palm River. We are on I-275, I-4, I-75, the Selmon Expressway, the Veterans Expressway, US-301, Dale Mabry Highway and Hillsborough Avenue constantly.',
  },
  {
    question: 'Can you tow my car to a repair shop or dealership?',
    answer: 'Yes, and it is one of our most common jobs. Tell us the shop, the dealership service bay, or your home address, and that is where the car goes. If you do not have a shop in mind, we can suggest one.',
  },
  {
    question: 'My car will not start. Do I need a tow?',
    answer: 'Often not. If it is the battery we can jump it on the spot and check that it keeps running, which is cheaper than a tow. If it will not hold a charge, the truck is already there and we load it. Same with keys locked inside or an empty tank — we fix those on the roadside.',
  },
  {
    question: 'Do you change tires?',
    answer: 'No. We do not do tire changes. If a tire is gone, we tow the car to a shop that can replace it properly.',
  },
  {
    question: 'What if my car will not roll at all?',
    answer: 'Seized brakes, a missing key, a locked steering column, a parking brake that will not release — a car that will not roll still goes on our dollies. Tell us on the phone so we bring the right gear.',
  },
  {
    question: 'Do you do repossessions or tow cars from private property?',
    answer: `No. ${BUSINESS.name} does consent towing only, which means the owner of the vehicle calls us and asks for the tow. We do not do repossessions, we do not tow cars off private property at a property owner's request, we do not immobilise vehicles with boots, and we do not run an impound lot. Your car goes where you tell us.`,
  },
  {
    question: 'Can you move a motorcycle?',
    answer: 'Yes. Bikes are secured with soft straps and a wheel chock so they arrive the way they left.',
  },
  {
    question: 'How do I pay?',
    answer: 'Cash, debit card or credit card. You hear the price on the phone before we start, so there are no surprises at the end.',
  },
  {
    question: 'Do you speak Russian or Ukrainian?',
    answer: 'Yes. We speak English, Russian and Ukrainian.',
  },
];

/**
 * Разметка для поисковиков и ИИ. Текст берётся из того же массива, что и
 * видимая часть страницы, — разойтись они физически не могут.
 */
function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-bone-200 bg-ink-950 text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <p className="mb-4 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-400">
              Questions
            </p>
            <h1 className="max-w-[900px] font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-balance sm:text-[44px] lg:text-[52px]">
              Towing in Tampa — common questions
            </h1>
            <p className="mt-7 max-w-[80ch] text-[19px] leading-[1.6] text-ink-200 text-pretty sm:text-[21px]">
              What people ask us on the phone, answered straight. If your question is not here, call{' '}
              <a href={BUSINESS.phoneHref} className="font-bold text-brand-400 hover:underline">
                {BUSINESS.phone}
              </a>{' '}
              — we pick up around the clock.
            </p>
          </div>
        </section>

        <section className="bg-white text-ink-700">
          <div className="mx-auto max-w-[1280px] px-6 py-[76px] lg:px-8">
            <div className="grid gap-px bg-bone-200">
              {FAQS.map((faq) => (
                <article key={faq.question} className="bg-white py-8">
                  <h2 className="max-w-[60ch] font-display text-[21px] font-extrabold leading-[1.25] tracking-[-0.01em] text-ink-700 sm:text-[24px]">
                    {faq.question}
                  </h2>
                  <p className="mt-4 max-w-[85ch] text-[17px] leading-[1.65] text-ink-600 text-pretty">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-500 text-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8 px-6 py-[60px] lg:px-8">
            <div>
              <h2 className="font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                Still stuck? Just call.
              </h2>
              <p className="mt-3 text-[17px] leading-[1.55] text-ember-body">
                Faster than typing. {BUSINESS.hours}.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
    </>
  );
}
