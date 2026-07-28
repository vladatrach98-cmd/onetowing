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
 * TODO(owner): вписать точный адрес на Morgan St и координаты из Google Maps
 * (правый клик по точке на карте → первая строка = "27.9506, -82.4572").
 */
export const BASE_LOCATION = {
  address: 'Morgan St, Tampa, FL',
  lat: 27.9459,
  lng: -82.4584,
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
 * Ссылка на карточку Google Business Profile («оставить отзыв»).
 * Появится в .env.local и в Vercel, когда карточка будет создана.
 */
export const GOOGLE_REVIEWS_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? '';
export const GOOGLE_MAPS_PROFILE_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? '';
