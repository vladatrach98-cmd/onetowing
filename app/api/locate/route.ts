import { NextResponse } from 'next/server';
import { BASE_LOCATION } from '../../lib/constants';
import { geocode, hasMapsKey, reverseGeocode, routeBetween, type LatLng } from '../../lib/maps';
import { sendLead } from '../../lib/notify';
import { allow, clientIp } from '../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  lat?: number;
  lng?: number;
  address?: string;
  destination?: string;
  service?: string;
  serviceKind?: 'tow' | 'roadside';
  /** true только при ПЕРВОМ определении локации — тогда владельцу летит тихое сообщение. */
  notifyOwner?: boolean;
};

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const clean = (value: unknown, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!allow(`locate:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }

  const address = clean(body.address);
  const destination = clean(body.destination);

  let point: LatLng | null = null;
  let formatted = '';

  if (isFiniteNumber(body.lat) && isFiniteNumber(body.lng)) {
    // Клиент разрешил геолокацию в браузере — самый точный вариант.
    point = { lat: body.lat, lng: body.lng };
    formatted = (await reverseGeocode(point)) ?? `${body.lat.toFixed(5)}, ${body.lng.toFixed(5)}`;
  } else if (address) {
    const found = await geocode(address);
    if (found) {
      point = found.point;
      formatted = found.formatted;
    } else if (hasMapsKey) {
      return NextResponse.json({ error: 'address_not_found' }, { status: 422 });
    } else {
      // Без ключа Google адрес в координаты не превратить — маршрут посчитать нечем.
      formatted = address;
    }
  } else {
    return NextResponse.json({ error: 'no_location' }, { status: 400 });
  }

  const approach = point ? await routeBetween(BASE_LOCATION, point) : null;

  let tow: { miles: number; minutes: number; approximate: boolean } | null = null;
  let destinationFormatted = '';
  if (destination) {
    const target = await geocode(destination);
    if (target) {
      destinationFormatted = target.formatted;
      tow = point ? await routeBetween(point, target.point) : null;
    } else {
      destinationFormatted = destination;
    }
  }

  // Тихое сообщение владельцу: он видит движение на сайте ещё до звонка.
  if (body.notifyOwner && allow(`locate-notify:${ip}`, 1, 15 * 60_000)) {
    void sendLead({
      kind: 'auto',
      service: clean(body.service, 120) || 'не выбрано',
      serviceKind: body.serviceKind === 'roadside' ? 'roadside' : 'tow',
      customerAddress: formatted,
      customerPoint: point ?? undefined,
      approachMiles: approach?.miles,
      approachMinutes: approach?.minutes,
      approximateRoute: approach?.approximate,
      destinationAddress: destinationFormatted || undefined,
      towMiles: tow?.miles,
    });
  }

  return NextResponse.json({
    customer: { address: formatted, point },
    approach: approach
      ? { miles: Number(approach.miles.toFixed(1)), minutes: Math.round(approach.minutes), approximate: approach.approximate }
      : null,
    tow: tow ? { miles: Number(tow.miles.toFixed(1)), minutes: Math.round(tow.minutes) } : null,
    destination: destinationFormatted || null,
    mapsConfigured: hasMapsKey,
  });
}
