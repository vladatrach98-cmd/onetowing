/**
 * Единственный источник бизнес-данных ONE TOWING.
 * Меняешь телефон/адрес/цены — только здесь, по всему сайту подхватится само.
 */

export const BUSINESS = {
  name: 'ONE TOWING',
  tagline: '24/7 Towing & Roadside Assistance',
  phone: '656-777-2980',
  phoneHref: 'tel:+16567772980',
  phoneE164: '+16567772980',
  hours: 'Open 24 hours, 7 days a week',
  serviceArea: 'Tampa Bay',
  domain: 'onetowingfl.com',
  siteUrl: 'https://onetowingfl.com',
} as const;

/**
 * База (откуда выезжает эвакуатор). От неё считается время в пути до клиента.
 * Координаты — Harbour Island, Downtown Tampa.
 */
export const BASE_LOCATION = {
  address: '124 S Morgan St, Tampa, FL 33602',
  lat: 27.94607,
  lng: -82.45422,
} as const;

/**
 * Реальные цены владельца. Ничего не выдумывать.
 * База $95 = выезд до 10 миль + стандартная погрузка + буксировка до 10 миль.
 */
export const PRICING = {
  baseFee: 95,
  includedApproachMiles: 10,
  includedTowMiles: 10,
  extraMileRate: 5,
  longDistanceMileRate: 3,
  /**
   * Порог из прайса владельца («дальняя буксировка — от 50 миль»). Для расчёта
   * НЕ используется: калькулятор берёт тот тариф, что дешевле клиенту, и по
   * математике это происходит уже с 25 миль (см. LONG_DISTANCE_FROM_MILES).
   */
  longDistanceThresholdMiles: 50,
  currency: 'USD',
} as const;

/** Районы обслуживания (для доверия и локального SEO). */
export const SERVICE_AREAS = [
  'Downtown Tampa',
  'Tampa',
  'Ybor City',
  'St. Petersburg',
  'Largo',
  'Clearwater',
  'Brandon',
  'Riverview',
] as const;

/** Шоссе, на которые выезжаем. */
export const HIGHWAYS = ['I-275', 'I-4', 'I-75', 'Selmon Expressway / SR 618', 'US-301'] as const;

/** Пункты меню — одностраничная навигация со скроллом к секции. */
export const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#areas', label: 'Areas' },
  { href: '/#photos', label: 'Photos' },
  { href: '/#reviews', label: 'Reviews' },
] as const;

/**
 * КАЛЬКУЛЯТОР ЦЕНЫ (/estimate) — выключен по умолчанию.
 *
 * Включить: в .env.local (и в Vercel) поставить NEXT_PUBLIC_ESTIMATOR_ENABLED=1
 * и пересобрать сайт. Пока выключен — страница отдаёт 404, а все ссылки на неё
 * с сайта пропадают и ведут в блок цен.
 */
export const ESTIMATOR_ENABLED = process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED === '1';

/** Куда ведёт кнопка «узнать цену»: в калькулятор или в блок цен на главной. */
export const PRICE_LINK = ESTIMATOR_ENABLED ? '/estimate' : '/#pricing';

/**
 * Ссылка на карточку Google Business Profile («оставить отзыв»).
 * Появится в .env.local и в Vercel, когда карточка будет создана.
 */
export const GOOGLE_REVIEWS_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? '';
export const GOOGLE_MAPS_PROFILE_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? '';
