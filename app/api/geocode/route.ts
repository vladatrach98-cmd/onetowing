import { NextResponse } from 'next/server';
import { allow, clientIp } from '../../lib/rate-limit';
import { BUSINESS } from '../../lib/constants';
import { hasMapsKey, reverseGeocode } from '../../lib/maps';

/**
 * Поиск места и обратный геокодинг для страницы /where.
 *
 * ⚠️ ДВА ИСТОЧНИКА, ПЕРЕКЛЮЧАЮТСЯ САМИ.
 *
 *   Есть GOOGLE_MAPS_API_KEY → Google Places Text Search.
 *   Нет ключа                → Nominatim (OpenStreetMap).
 *
 * Разница не косметическая. OSM прекрасно знает адреса («1234 Bayshore Blvd»),
 * но почти не знает названий компаний: «BMW of Tampa» он не находит. А клиент
 * говорит именно названиями — «в БМВ на Фаулер», «в шиномонтаж у Волмарта».
 * Поэтому пока ключа нет, поиск работает наполовину, и это осознанный
 * компромисс ради того, чтобы страница работала уже сегодня.
 *
 * Заведёте ключ — этот файл начнёт находить компании сам, менять больше нечего.
 *
 * ⚠️ Запрос идёт через сервер намеренно: ключ Google не должен попадать
 * в браузер, а Nominatim требует осмысленный User-Agent и не больше запроса
 * в секунду — из браузера ни того ни другого не обеспечить.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const KEY = process.env.GOOGLE_MAPS_API_KEY ?? '';
const UA = `ONE TOWING dispatch tool (${BUSINESS.siteUrl}; ${BUSINESS.email})`;

/** Центр поиска — Тампа. Смещает выдачу к нам, но не запирает: возят и в Орландо. */
const TAMPA = { lat: 27.9506, lng: -82.4572 };

type Hit = { label: string; lat: number; lng: number };

/** Google Places Text Search: понимает названия компаний, а не только адреса. */
async function searchGoogle(q: string): Promise<Hit[]> {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location',
    },
    body: JSON.stringify({
      textQuery: q,
      maxResultCount: 6,
      languageCode: 'en',
      regionCode: 'US',
      locationBias: { circle: { center: { latitude: TAMPA.lat, longitude: TAMPA.lng }, radius: 60000 } },
    }),
  });
  if (!response.ok) return [];

  const data = (await response.json()) as {
    places?: Array<{
      displayName?: { text?: string };
      formattedAddress?: string;
      location?: { latitude?: number; longitude?: number };
    }>;
  };

  return (data.places ?? [])
    .map((place) => {
      const name = place.displayName?.text?.trim();
      const address = place.formattedAddress?.trim();
      return {
        label: [name, address].filter(Boolean).join(' — ') || (address ?? ''),
        lat: place.location?.latitude ?? NaN,
        lng: place.location?.longitude ?? NaN,
      };
    })
    .filter((hit) => hit.label && Number.isFinite(hit.lat) && Number.isFinite(hit.lng));
}

/** Nominatim: бесплатно и без ключа, но названия компаний знает плохо. */
async function searchOsm(q: string): Promise<Hit[]> {
  const api =
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}` +
    `&format=jsonv2&limit=6&countrycodes=us&viewbox=-83.6,28.6,-81.6,27.3`;
  const response = await fetch(api, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' } });
  if (!response.ok) return [];

  const data = (await response.json()) as Array<{ display_name: string; lat: string; lon: string }>;
  return data
    .map((row) => ({ label: row.display_name, lat: Number(row.lat), lng: Number(row.lon) }))
    .filter((row) => Number.isFinite(row.lat) && Number.isFinite(row.lng));
}

async function reverseOsm(lat: number, lng: number): Promise<string | null> {
  const api = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`;
  const response = await fetch(api, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' } });
  if (!response.ok) return null;
  const data = (await response.json()) as { display_name?: string };
  return data.display_name ?? null;
}

export async function GET(request: Request) {
  const ip = clientIp(request.headers);
  if (!allow(`geo:${ip}`, 40, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 120);

  /**
   * ⚠️ Через Number() напрямую нельзя: параметра нет → get() вернёт null,
   * Number(null) === 0, а Number.isFinite(0) === true. Код решал бы, что ему
   * дали координаты 0,0 — точку в Гвинейском заливе — и уходил в обратный
   * геокодинг вместо поиска. Поэтому сначала проверяем, что параметр вообще был.
   */
  const rawLat = url.searchParams.get('lat');
  const rawLng = url.searchParams.get('lng');
  const lat = rawLat === null ? NaN : Number(rawLat);
  const lng = rawLng === null ? NaN : Number(rawLng);

  try {
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const address = hasMapsKey ? await reverseGeocode({ lat, lng }) : await reverseOsm(lat, lng);
      return NextResponse.json({ address });
    }

    if (q.length < 3) return NextResponse.json({ hits: [] });

    const hits = hasMapsKey ? await searchGoogle(q) : await searchOsm(q);
    return NextResponse.json({ hits, source: hasMapsKey ? 'google' : 'osm' });
  } catch {
    // Геокодер лёг — это не повод ломать страницу: клиент поставит точку
    // на карте пальцем, и этого достаточно.
    return NextResponse.json({ hits: [], address: null });
  }
}
