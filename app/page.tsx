import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import {
  BUSINESS,
  ESTIMATOR_ENABLED,
  HIGHWAYS,
  PRICE_LINK,
  PRICING,
  SERVICE_AREAS,
} from './lib/constants';
import { LONG_DISTANCE_FROM_MILES } from './lib/pricing';
import { SERVICES } from './lib/services';

/**
 * Фото первого экрана — дневной кадр 1672×941 (16:9). Только фон.
 *
 * ⚠️ Весь текст первого экрана — живой HTML, а не часть картинки. Текст,
 * запечённый в изображение, для Google не существует: он потеряет и H1, и
 * первый экран целиком. Баннер с надписями одной картинкой сюда ставить нельзя.
 *
 * Next.js сам отдаёт браузеру WebP или AVIF нужного размера, поэтому готовить
 * эти форматы вручную не нужно — достаточно одного файла в лучшем качестве.
 */
const HERO_PHOTO = '/images/one-towing-tampa-skyline.jpg';

/**
 * Плашки с ценами. Цифры берутся из constants, чтобы сайт и реклама не разъехались:
 * расхождение цены в объявлении и на сайте — причина отклонения объявлений в Google
 * и повод для спора с клиентом.
 *
 * ⚠️ Времени подачи здесь нет намеренно. Конкретное число («15 минут») превращается
 * в отзыв на одну звезду в первый же час пик на Selmon.
 */
const heroChips = [
  { value: `$${PRICING.baseFee}`, label: 'Local tow from', lead: true },
  { value: `$${PRICING.extraMileRate}/mi`, label: 'Extra miles' },
  { value: `$${PRICING.longDistanceMileRate}/mi`, label: 'Long distance' },
  { value: '24/7', label: 'Available' },
];

/**
 * Полоса доверия. Каждый пункт — проверяемый факт.
 * «Licensed & insured» здесь намеренно нет: пока лицензия не оформлена, это
 * утверждение нельзя писать — за него снимают объявления и блокируют профиль.
 */
const trustPoints = [
  'Price given on the call',
  'Verified business on Google',
  'Local drivers, Tampa based',
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
          {/* ПЕРВЫЙ ЭКРАН. Фото — только фон, весь текст живой HTML: иначе Google
              не увидит ни H1, ни первый экран. Затемнение слева под буквами,
              справа кадр не трогаем — трак и небоскрёбы и есть весь смысл. */}
          <section className="relative bg-hero-ink">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] min-[960px]:absolute min-[960px]:inset-0 min-[960px]:aspect-auto min-[960px]:h-full">
              <Image
                src={HERO_PHOTO}
                alt="ONE TOWING tow truck with the downtown Tampa skyline and the Hillsborough River behind it"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[68%_center] min-[960px]:object-[62%_center]"
              />
              {/* Затемнение тянется до 78% кадра: текстовая колонка занимает почти
                  половину ширины, и на светлом небе буквы теряются. Трак стоит
                  правее — его не гасим. */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,#0b0e11_2%,rgba(11,14,17,.74)_34%,rgba(11,14,17,0)_78%)] min-[960px]:bg-[linear-gradient(100deg,rgba(11,14,17,.96)_0%,rgba(11,14,17,.93)_34%,rgba(11,14,17,.72)_50%,rgba(11,14,17,.28)_66%,rgba(11,14,17,0)_78%)]" />
            </div>

            <div className="relative bg-[linear-gradient(160deg,#161d24_0%,#10151a_55%,#0b0e11_100%)] px-6 pb-14 pt-11 min-[960px]:bg-none min-[960px]:px-0 min-[960px]:py-0">
              <div className="mx-auto flex max-w-[1280px] flex-col justify-center min-[960px]:min-h-[clamp(560px,44vw,760px)] min-[960px]:px-8">
                <div className="min-[960px]:max-w-[600px]">
                  <span className="inline-flex items-center gap-2.5 bg-brand-500 px-[15px] py-[9px] text-[13px] font-bold uppercase leading-none tracking-[0.14em] text-white">
                    <span aria-hidden="true" className="live-dot block h-2 w-2 rounded-full bg-white" />
                    Open now · 24/7 dispatch
                  </span>

                  <h1 className="mt-5 font-display text-[42px] font-black leading-[0.98] tracking-[-0.03em] text-white text-balance sm:text-[56px] min-[960px]:text-[64px]">
                    24/7 Towing <span className="text-hero-accent">in Tampa</span>
                  </h1>

                  <p className="mt-5 max-w-[36ch] text-[20px] font-semibold leading-[1.45] text-white text-pretty sm:text-[22px]">
                    Serving {SERVICE_AREAS.slice(0, 6).join(', ')} and the rest of Hillsborough County.
                  </p>

                  <p className="mt-3 text-[16px] leading-[1.6] text-ink-200">
                    Fast access to{' '}
                    {HIGHWAYS.slice(0, 4).map((highway, index) => (
                      <span key={highway}>
                        {index > 0 ? ' · ' : ''}
                        <span className="font-bold text-white">{highway}</span>
                      </span>
                    ))}
                  </p>

                  {/* Плашки с ценами: те же цифры, что в рекламе и в блоке Pricing.
                      Фон плотный, а не полупрозрачный — правые плашки попадают на
                      светлую часть кадра и на прозрачном фоне пропадали. */}
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {heroChips.map((chip) => (
                      <span
                        key={chip.label}
                        className={
                          chip.lead
                            ? 'flex items-baseline gap-2 bg-white px-4 py-[11px] text-[15px] font-semibold text-ink-950'
                            : 'flex items-baseline gap-2 border border-white/30 bg-ink-950/85 px-4 py-[11px] text-[15px] font-semibold text-white'
                        }
                      >
                        {chip.label}
                        <b className={chip.lead ? 'font-black text-brand-500' : 'font-black text-hero-accent'}>
                          {chip.value}
                        </b>
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={BUSINESS.phoneHref}
                      className="flex items-center gap-3 bg-brand-500 px-[30px] py-[21px] font-display text-[23px] font-black leading-none tracking-[0.01em] text-white shadow-[0_14px_34px_-14px_rgba(200,24,31,.9)] transition-colors hover:bg-brand-600 hover:text-white sm:text-[28px]"
                    >
                      <span aria-hidden="true" className="text-[0.85em]">
                        ☎
                      </span>
                      Call {BUSINESS.phone}
                    </a>
                    <Link
                      href="/#pricing"
                      className="flex items-center border-2 border-white/60 bg-ink-950/40 px-[26px] py-[21px] text-[15px] font-extrabold uppercase leading-none tracking-[0.09em] text-white transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                    >
                      See pricing
                    </Link>
                  </div>

                  <p className="mt-4 text-[15px] font-bold uppercase leading-none tracking-[0.08em] text-ink-100">
                    A person answers — day, night, weekends
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Полоса доверия. Только проверяемые факты — см. trustPoints. */}
          <section className="border-t border-white/[0.08] bg-ink-900">
            <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-3 px-6 py-4 sm:grid-cols-3 lg:px-8">
              {trustPoints.map((point) => (
                <p key={point} className="flex items-center gap-2.5 text-[14px] font-bold text-white">
                  <span aria-hidden="true" className="block h-[9px] w-[9px] rotate-45 bg-brand-500" />
                  {point}
                </p>
              ))}
            </div>
          </section>

          {/* Абзац «кто мы» простым текстом.
              Первый экран сильный для человека, но для машины он беден: заголовок
              из трёх слов и плашки. Поисковики и ИИ-ассистенты берут описание
              сущности из связного текста — здесь одним абзацем сказано, кто
              компания, что делает и где работает. */}
          <section className="border-t border-bone-200 bg-bone-100 text-ink-700">
            <div className="mx-auto max-w-[1280px] px-6 py-[52px] lg:px-8">
              <p className="max-w-[92ch] text-[19px] leading-[1.6] text-ink-600 text-pretty sm:text-[21px]">
                <strong className="font-bold text-ink-700">{BUSINESS.name}</strong> is a towing and
                roadside assistance company based in Downtown Tampa, Florida. We provide 24/7 towing,
                jump starts, vehicle lockouts, fuel delivery, locked-wheel assistance, accident
                recovery, motorcycle transport and long-distance towing across Tampa and Hillsborough
                County. Local towing starts at ${PRICING.baseFee}, and a real person answers the phone
                at{' '}
                <a href={BUSINESS.phoneHref} className="font-bold text-brand-600 hover:underline">
                  {BUSINESS.phone}
                </a>{' '}
                day, night, weekends and holidays.
              </p>
            </div>
          </section>

          <section id="areas" className="scroll-mt-[120px] border-t border-bone-200 bg-white text-ink-700">
            <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-[100px] pt-[96px] lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
              <div>
                <p className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-600">
                  Service areas
                </p>
                <h2 className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.015em] text-balance sm:text-[36px]">
                  Based in Downtown Tampa, working Hillsborough County.
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
                {/* В две колонки от sm: восемь дорог в один столбец вытягивали
                    правую половину заметно ниже левой. */}
                <ul className="mt-8 grid list-none border-t border-bone-300 p-0 sm:grid-cols-2 sm:gap-x-8">
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
