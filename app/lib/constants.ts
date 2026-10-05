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
  /** Псевдоним ящика roman@onetowingfl.com в Google Workspace. */
  email: 'info@onetowingfl.com',
  emailHref: 'mailto:info@onetowingfl.com',
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
  /**
   * Прикурить — единственная дорожная услуга с опубликованной ценой («from $65»).
   * Остальная дорожная помощь (топливо, запаска) — «call for price».
   * Поставить null — везде на сайте снова станет «Call for price».
   */
  jumpStartFrom: 65 as number | null,
  currency: 'USD',
} as const;

/**
 * Районы обслуживания — ГРУППАМИ. Из них собирается страница /service-areas,
 * блок «Areas» на главной и подвал.
 *
 * ⚠️ Держать таким же, как зона в карточке Google Business Profile —
 * расхождение между сайтом и карточкой Google считает признаком неточных данных.
 * Добавили район здесь — добавьте его и в карточку.
 *
 * `main: true` — показывается на главной и в подвале. Остальное только на
 * /service-areas: огромный список районов на главной никто не читает.
 */
export const AREA_GROUPS = [
  {
    title: 'Tampa',
    note: 'Our home turf — the truck runs out of Downtown Tampa.',
    areas: [
      { name: 'Tampa', main: true },
      { name: 'Downtown Tampa' },
      { name: 'Ybor City' },
      { name: 'South Tampa' },
      { name: 'Hyde Park' },
      { name: 'Davis Islands' },
      { name: 'West Tampa' },
      { name: 'Tampa Heights' },
      { name: 'Seminole Heights' },
      { name: 'Drew Park' },
      { name: 'Carrollwood' },
      { name: 'University Area' },
    ],
  },
  {
    title: 'East of Tampa',
    note: 'Straight out along the Selmon Expressway and I-75.',
    areas: [{ name: 'Brandon', main: true }, { name: 'Riverview', main: true }, { name: 'Palm River' }],
  },
  {
    title: 'North of Tampa',
    note: 'Up I-275, the Veterans Expressway and Dale Mabry.',
    areas: [{ name: 'Temple Terrace', main: true }, { name: 'Lutz', main: true }],
  },
  {
    title: 'Northwest',
    note: 'Along Hillsborough Avenue and the Veterans toward the county line.',
    areas: [{ name: 'Town ’n’ Country' }, { name: 'Westchase' }, { name: 'Oldsmar', main: true }],
  },
  {
    title: 'Across the bay',
    note: 'Pinellas County, reached over the bridges.',
    areas: [
      { name: 'St. Petersburg', main: true },
      { name: 'Clearwater', main: true },
      { name: 'Tampa International Airport & Westshore' },
    ],
  },
] as const;

/**
 * Мосты и коридоры через залив — отдельно от районов: это не город, а место,
 * где люди чаще всего и застревают.
 */
export const BRIDGE_CORRIDORS = [
  { name: 'Howard Frankland Bridge', road: 'I-275', note: 'Tampa ↔ St. Petersburg, the busiest crossing of the bay.' },
  { name: 'Gandy Bridge', road: 'US-92', note: 'South Tampa ↔ St. Petersburg.' },
  { name: 'Courtney Campbell Causeway', road: 'SR-60', note: 'Tampa airport and Westshore ↔ Clearwater.' },
] as const;

/** Плоский список всех районов — для подвала, текстов и поиска страниц районов. */
export const SERVICE_AREAS = AREA_GROUPS.flatMap((group) => group.areas.map((area) => area.name));

/** Главные районы — главная страница, подвал, первый экран. */
export const MAIN_SERVICE_AREAS = AREA_GROUPS.flatMap((group) =>
  group.areas.filter((area) => 'main' in area && area.main).map((area) => area.name),
);

/** Шоссе и главные магистрали, на которые выезжаем. */
export const HIGHWAYS = [
  'I-275',
  'I-4',
  'I-75',
  'Selmon Expressway',
  'Veterans Expressway',
  'US-301',
  'Dale Mabry Highway',
  'Hillsborough Avenue',
] as const;

/**
 * Пункты меню. Первые два — главные направления (буксировка и дорожная помощь):
 * с них человек из рекламы должен попадать на нужную страницу в один тап.
 */
export const NAV_LINKS = [
  { href: '/services/towing', label: 'Towing' },
  { href: '/services/roadside-assistance', label: 'Roadside' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Areas' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/book', label: 'Book' },
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
 * Номера CallRail, с которых будут уходить SMS.
 *
 * ⚠️ Их обязательно называть в тексте согласия. Правило CTIA §5.1.1: человек
 * до согласия должен знать, «с какого номера придёт сообщение». Если номер
 * в SMS не совпадает ни с одним названным на сайте, это выглядит как чужая
 * рассылка — и для проверяющего, и для получателя.
 *
 * 656-777-2980 — основная линия, её набирают клиенты. Два номера ниже —
 * подменные номера CallRail: первый для органики, второй для рекламы.
 */
export const SMS_SENDING_NUMBERS = ['656-232-3046', '656-261-4503'] as const;
export const SMS_NUMBERS_SENTENCE =
  `Messages are sent from ${SMS_SENDING_NUMBERS.join(' or ')}. Our main line is ${BUSINESS.phone}.`;

/**
 * Ссылка на карточку Google Business Profile («оставить отзыв»).
 * Появится в .env.local и в Vercel, когда карточка будет создана.
 */
export const GOOGLE_REVIEWS_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? '';
export const GOOGLE_MAPS_PROFILE_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? '';

/**
 * Профили в соцсетях и каталогах — идут в `sameAs` разметки бизнеса.
 * Так Google связывает сайт, карточку в Картах, Yelp и соцсети в одну сущность.
 * Пустые строки отбрасываются. Вписывать полный адрес, например
 * 'https://www.yelp.com/biz/one-towing-tampa'.
 */
export const SOCIAL_PROFILES = {
  yelp: 'https://www.yelp.com/biz/one-towing-tampa',
  facebook: '',
  instagram: '',
} as const;
