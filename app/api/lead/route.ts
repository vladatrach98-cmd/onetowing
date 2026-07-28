import { NextResponse } from 'next/server';
import { estimate } from '../../lib/pricing';
import { sendLead } from '../../lib/notify';
import { allow, clientIp } from '../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  service?: string;
  serviceKind?: 'tow' | 'roadside';
  customerAddress?: string;
  lat?: number;
  lng?: number;
  approachMiles?: number;
  approachMinutes?: number;
  approximateRoute?: boolean;
  destinationAddress?: string;
  towMiles?: number;
  phone?: string;
  note?: string;
  /** Honeypot: настоящий человек это поле не видит и не заполняет. */
  company?: string;
  /** Сколько миллисекунд форма была открыта — боты отправляют мгновенно. */
  elapsedMs?: number;
};

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const clean = (value: unknown, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!allow(`lead:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }

  // Анти-спам: приманка заполнена или форму отправили быстрее, чем человек успел бы.
  if (clean(body.company) || (isFiniteNumber(body.elapsedMs) && body.elapsedMs < 2000)) {
    return NextResponse.json({ ok: true });
  }

  const serviceKind = body.serviceKind === 'roadside' ? 'roadside' : 'tow';
  const approachMiles = isFiniteNumber(body.approachMiles) ? body.approachMiles : undefined;
  const towMiles = isFiniteNumber(body.towMiles) ? body.towMiles : undefined;

  // Цену считаем на сервере той же формулой, что и в браузере, — чтобы в Telegram
  // всегда была ровно та вилка, которую увидел клиент.
  const price =
    serviceKind === 'tow' && approachMiles != null
      ? estimate({ approachMiles, towMiles: towMiles ?? 0 })
      : null;

  const { delivered } = await sendLead({
    kind: 'request',
    service: clean(body.service, 120) || 'не выбрано',
    serviceKind,
    customerAddress: clean(body.customerAddress) || undefined,
    customerPoint:
      isFiniteNumber(body.lat) && isFiniteNumber(body.lng) ? { lat: body.lat, lng: body.lng } : undefined,
    approachMiles,
    approachMinutes: isFiniteNumber(body.approachMinutes) ? body.approachMinutes : undefined,
    approximateRoute: body.approximateRoute === true,
    destinationAddress: clean(body.destinationAddress) || undefined,
    towMiles,
    estimateLow: price?.low,
    estimateHigh: price?.high,
    phone: clean(body.phone, 40) || undefined,
    note: clean(body.note, 300) || undefined,
  });

  return NextResponse.json({ ok: true, delivered });
}
