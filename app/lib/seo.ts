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
    description: `24/7 towing and roadside assistance across ${BUSINESS.serviceArea}. Local tow from $${PRICING.baseFee}.`,
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phoneE164,
    image: `${BUSINESS.siteUrl}/one-towing-hero.png`,
    priceRange: '$$',
    currenciesAccepted: 'USD',
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
    // Ссылки на профили появятся, когда будет карточка Google Business Profile.
    ...(GOOGLE_MAPS_PROFILE_URL ? { sameAs: [GOOGLE_MAPS_PROFILE_URL] } : {}),
  };
}
