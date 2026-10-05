import {
  BASE_LOCATION,
  BUSINESS,
  GOOGLE_MAPS_PROFILE_URL,
  MAIN_SERVICE_AREAS,
  PRICING,
  SOCIAL_PROFILES,
} from './constants';
import { SERVICE_PAGES, servicePrice } from '../data/services-content';

/**
 * JSON-LD — «паспорт» бизнеса для Google: кто мы, где, когда работаем, что делаем.
 * Именно из него Карты и поиск берут телефон, часы работы и зону обслуживания.
 *
 * ⚠️ Никогда не добавлять сюда aggregateRating/review с выдуманными цифрами —
 * это прямое нарушение правил Google и закона США о фейковых отзывах.
 */
const SAME_AS = [GOOGLE_MAPS_PROFILE_URL, ...Object.values(SOCIAL_PROFILES)].filter(Boolean);

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${BUSINESS.siteUrl}/#business`,
    name: BUSINESS.name,
    legalName: 'ONE TOWING LLC',
    // Описание пишем так, чтобы машина поняла с первой фразы: кто, что делает, где.
    description:
      `${BUSINESS.name} is a towing and roadside assistance company based in Downtown Tampa, ` +
      `Florida. We provide 24/7 local towing, accident towing, roadside assistance, jump starts, ` +
      `fuel delivery and spare tire changes across Tampa Bay. Local tow from $${PRICING.baseFee}.`,
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    /**
     * Первым идёт превью для соцсетей, дальше — настоящие фото с работы.
     * ⚠️ Проверять при смене файлов: битая ссылка здесь = 404 для Google.
     */
    /**
     * Логотип отдельным полем. Google берёт именно `logo` для карточки знаний
     * и для панели рядом с выдачей — из общего `image` он его не угадывает.
     * Квадрат 1200×1200 с прозрачным фоном лежит в public/images/logo.
     */
    logo: `${BUSINESS.siteUrl}/images/logo/one-towing-logo-1200.png`,
    image: [
      `${BUSINESS.siteUrl}/images/logo/one-towing-logo-1200-white.jpg`,
      `${BUSINESS.siteUrl}/images/one-towing-og.jpg`,
      `${BUSINESS.siteUrl}/images/gallery/one-towing-bmw-x4-wheel-lift.jpg`,
      `${BUSINESS.siteUrl}/images/gallery/one-towing-accident-recovery-highway.jpg`,
      `${BUSINESS.siteUrl}/images/gallery/one-towing-mercedes-dollies.jpg`,
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124 S Morgan St',
      addressLocality: 'Tampa',
      addressRegion: 'FL',
      postalCode: '33602',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BASE_LOCATION.lat,
      longitude: BASE_LOCATION.lng,
    },
    // Круглосуточно, без выходных.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    // Только главные города — те же, что в карточке Google. Районы Тампы
    // сюда не пишем: это части города, а не отдельные места обслуживания.
    areaServed: MAIN_SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
      containedInPlace: { '@type': 'State', name: 'Florida' },
    })),
    /**
     * Каталог услуг — из страниц услуг, каждая со ссылкой на свою страницу.
     * ⚠️ Страницы `adsExcluded` (lockout) сюда не попадают: эта разметка стоит
     * на КАЖДОЙ странице сайта, включая рекламные посадочные.
     */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Towing & roadside services',
      itemListElement: SERVICE_PAGES.filter((page) => !page.adsExcluded).map((page) => {
        const price = servicePrice(page);
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${BUSINESS.siteUrl}/services/${page.slug}#service`,
            name: page.name,
            description: page.cardLine,
            url: `${BUSINESS.siteUrl}/services/${page.slug}`,
          },
          ...(price.amount
            ? {
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: price.amount,
                  priceCurrency: 'USD',
                },
              }
            : {}),
        };
      }),
    },
    // Карточка в Картах — и как ссылка на профиль, и как карта бизнеса.
    // + Yelp / Facebook / Instagram из SOCIAL_PROFILES, как только их впишут.
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
    ...(GOOGLE_MAPS_PROFILE_URL ? { hasMap: GOOGLE_MAPS_PROFILE_URL } : {}),
  };
}
