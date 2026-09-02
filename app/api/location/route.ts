import { NextResponse } from 'next/server';
import { sendCustomerLocation } from '../../lib/notify';
import { allow, clientIp } from '../../lib/rate-limit';

/**
 * Приём локации со страницы /where.
 *
 * Ничего не хранит. Клиент нажал «отправить» — сообщение ушло владельцу
 * в Telegram, и на этом всё. Базы данных в проекте нет и для этой задачи
 * не нужно: между нажатием и доставкой нет ожидания, которое надо пережить.
 *
 * ⚠️ Когда появится автоматическая SMS (после регистрации 10DLC), сюда
 * добавится токен из ссылки, чтобы телефон подставлялся сам. Формат ответа
 * при этом не меняется — страницу переделывать не придётся.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  phone?: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupAccuracy?: number;
  pickupText?: string;
  dropoffText?: string;
  note?: string;
  /** Honeypot: человек этого поля не видит. */
  company?: string;
};

const num = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : undefined);
const clean = (value: unknown, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  // Человек на обочине может отправить дважды — это нормально. Но не двадцать раз.
  if (!allow(`loc:${ip}`, 6, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400 });
  }

  if (clean(body.company)) return NextResponse.json({ ok: true });

  const pickupLat = num(body.pickupLat);
  const pickupLng = num(body.pickupLng);
  const pickupText = clean(body.pickupText, 200);

  // Пустая отправка бессмысленна: без точки и без адреса сообщать нечего.
  if (pickupLat == null && !pickupText) {
    return NextResponse.json({ error: 'No pickup location' }, { status: 400 });
  }

  const { delivered } = await sendCustomerLocation({
    phone: clean(body.phone, 40) || undefined,
    pickupLat,
    pickupLng,
    pickupAccuracy: num(body.pickupAccuracy),
    pickupText: pickupText || undefined,
    dropoffText: clean(body.dropoffText, 200) || undefined,
    note: clean(body.note, 300) || undefined,
  });

  return NextResponse.json({ ok: true, delivered });
}
