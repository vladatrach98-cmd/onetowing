import { BASE_LOCATION, BUSINESS, GOOGLE_MAPS_PROFILE_URL, PRICING, SERVICE_AREAS } from './constants';
import { SERVICES } from './services';

/**
 * JSON-LD — «паспорт» бизнеса для Google: кто мы, где, когда работаем, что делаем.
 * Именно из него Карты и поиск берут телефон, часы работы и зону обслуживания.
 *
 * ⚠️ Никогда не добавлять сюда aggregateRating/review с выдуманными цифрами —
 * это прямое нарушение правил Google и закона США о фейковых отзывах.
 */
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
      `Florida. We provide 24/7 towing, jump starts, vehicle lockouts, fuel delivery, ` +
      `locked-wheel assistance, accident recovery, motorcycle transport and long-distance ` +
      `towing across Tampa and Hillsborough County. Local tow from $${PRICING.baseFee}.`,
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    /**
     * Первым идёт превью для соцсетей, дальше — настоящие фото с работы.
     * ⚠️ Проверять при смене файлов: битая ссылка здесь = 404 для Google.
     */
    image: [
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
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
      containedInPlace: { '@type': 'State', name: 'Florida' },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Towing & roadside services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
        ...(service.kind === 'tow'
          ? {
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: PRICING.baseFee,
                priceCurrency: 'USD',
              },
            }
          : {}),
      })),
    },
    // Карточка в Картах — и как ссылка на профиль, и как карта бизнеса.
    ...(GOOGLE_MAPS_PROFILE_URL
      ? { sameAs: [GOOGLE_MAPS_PROFILE_URL], hasMap: GOOGLE_MAPS_PROFILE_URL }
      : {}),
  };
}
