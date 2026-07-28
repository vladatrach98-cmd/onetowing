import { BASE_LOCATION } from './constants';

/**
 * Google Maps — ТОЛЬКО на сервере. Ключ (GOOGLE_MAPS_API_KEY) никогда не уходит
 * в браузер, иначе его украдут и накрутят счёт.
 *
 * Используем текущие API Google (не устаревшие):
 *   - Routes API      → расстояние и время в пути с учётом пробок
 *   - Geocoding API   → координаты ↔ человеческий адрес
 *
 * Если ключа нет — сайт продолжает работать: считаем по прямой линии
 * с коэффициентом на дороги. Такой результат помечаем approximate: true.
 */

const KEY = process.env.GOOGLE_MAPS_API_KEY ?? '';
export const hasMapsKey = KEY.length > 0;

export type LatLng = { lat: number; lng: number };

export type RouteResult = {
  miles: number;
  /** Время в пути, минут. */
  minutes: number;
  /** true — посчитано без Google, по прямой линии. */
  approximate: boolean;
};

const METERS_PER_MILE = 1609.344;

function haversineMiles(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8; // радиус Земли в милях
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Запасной расчёт: прямая × 1.25 (петли дорог) при средней скорости 30 миль/ч. */
function fallbackRoute(from: LatLng, to: LatLng): RouteResult {
  const miles = haversineMiles(from, to) * 1.25;
  return { miles, minutes: (miles / 30) * 60, approximate: true };
}

type Waypoint = { location: { latLng: { latitude: number; longitude: number } } } | { address: string };

const toWaypoint = (point: LatLng | string): Waypoint =>
  typeof point === 'string' ? { address: point } : { location: { latLng: { latitude: point.lat, longitude: point.lng } } };

/** Расстояние и время по дорогам между двумя точками (координаты или адрес строкой). */
export async function routeBetween(from: LatLng | string, to: LatLng | string): Promise<RouteResult | null> {
  if (!hasMapsKey) {
    if (typeof from === 'string' || typeof to === 'string') return null;
    return fallbackRoute(from, to);
  }

  try {
    const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
      },
      body: JSON.stringify({
        origin: toWaypoint(from),
        destination: toWaypoint(to),
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        units: 'IMPERIAL',
      }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`Routes API ${response.status}`);

    const data = (await response.json()) as {
      routes?: { distanceMeters?: number; duration?: string }[];
    };
    const route = data.routes?.[0];
    if (!route?.distanceMeters) throw new Error('Routes API: no route');

    const seconds = Number.parseFloat(String(route.duration ?? '0').replace('s', '')) || 0;
    return {
      miles: route.distanceMeters / METERS_PER_MILE,
      minutes: seconds / 60,
      approximate: false,
    };
  } catch (error) {
    console.error('[maps] routeBetween failed:', error);
    if (typeof from === 'string' || typeof to === 'string') return null;
    return fallbackRoute(from, to);
  }
}

/** Координаты → адрес («1234 Morgan St, Tampa, FL»). */
export async function reverseGeocode(point: LatLng): Promise<string | null> {
  if (!hasMapsKey) return null;

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    url.searchParams.set('latlng', `${point.lat},${point.lng}`);
    url.searchParams.set('key', KEY);

    const response = await fetch(url, { cache: 'no-store' });
    const data = (await response.json()) as { results?: { formatted_address?: string }[] };
    return data.results?.[0]?.formatted_address ?? null;
  } catch (error) {
    console.error('[maps] reverseGeocode failed:', error);
    return null;
  }
}

/** Адрес → координаты. Нужен, когда клиент не даёт геолокацию, а пишет адрес руками. */
export async function geocode(address: string): Promise<{ point: LatLng; formatted: string } | null> {
  if (!hasMapsKey) return null;

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    url.searchParams.set('address', address);
    // Ограничиваем США, но НЕ Флоридой: дальняя буксировка бывает и в соседний штат.
    url.searchParams.set('components', 'country:US');
    // bounds — это подсказка, а не запрет: при неоднозначном названии улицы
    // Google предпочтёт Tampa Bay, но адрес в Джорджии всё равно найдёт.
    url.searchParams.set('bounds', '27.5,-82.9|28.3,-82.1');
    url.searchParams.set('key', KEY);

    const response = await fetch(url, { cache: 'no-store' });
    const data = (await response.json()) as {
      results?: { formatted_address?: string; geometry?: { location?: { lat: number; lng: number } } }[];
    };
    const first = data.results?.[0];
    const location = first?.geometry?.location;
    if (!location) return null;

    return { point: { lat: location.lat, lng: location.lng }, formatted: first?.formatted_address ?? address };
  } catch (error) {
    console.error('[maps] geocode failed:', error);
    return null;
  }
}

/** Ссылка на точку в Google Maps — её владелец откроет одним тапом из Telegram. */
export const mapsLink = (point: LatLng) => `https://www.google.com/maps?q=${point.lat},${point.lng}`;

/** Ссылка «проложить маршрут от базы до клиента». */
export const directionsLink = (point: LatLng) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(BASE_LOCATION.address)}&destination=${point.lat},${point.lng}&travelmode=driving`;
