import { NextResponse } from 'next/server';
import { sendCallPing } from '../../lib/notify';
import { allow, clientIp, isLocalRequest } from '../../lib/rate-limit';

/**
 * «Сейчас позвонят» — сигнал в Telegram в момент нажатия на номер телефона.
 *
 * ВАЖНО про то, что тут можно и чего нельзя:
 * сайт видит только НАЖАТИЕ на номер, а не сам разговор. Дозвонился человек
 * или передумал — знает телефонная сеть, а не браузер. Практически это одно
 * и то же: нажал → у него открылся набор номера.
 *
 * Город берём из заголовков Vercel (по интернет-адресу). Это уровень района
 * или города провайдера — для «откуда клиент» годится, для навигации нет.
 * Точную точку даёт только сам клиент в калькуляторе (/api/locate).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = { page?: string; referrer?: string };

const clean = (value: unknown, max = 120) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Заголовки Vercel приходят в процентной кодировке: «Saint%20Petersburg». */
const decode = (value: string | null) => {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Из полного адреса оставляем только сайт: «https://www.google.com/search?q=…» → «google.com». */
function shortSource(referrer: string): string {
  if (!referrer) return 'прямой заход или реклама';
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    return host || 'прямой заход или реклама';
  } catch {
    return referrer.slice(0, 60);
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  /**
   * Проверка с локальной машины не должна будить владельца.
   * Локальный сервер читает тот же .env.local с настоящим токеном бота,
   * поэтому без этой заглушки нажатие «Send» на localhost уходит настоящей
   * заявкой в рабочую группу. Один раз так и вышло.
   */
  if (isLocalRequest(request.headers)) {
    console.info('[call-click] локальный запрос — в Telegram не шлём');
    return NextResponse.json({ ok: true, delivered: false, local: true });
  }

  // Один сигнал в 90 секунд с адреса: человек в панике жмёт кнопку несколько раз,
  // а владельцу нужен один звонок — одно сообщение.
  if (!allow(`call:${ip}`, 1, 90_000)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    // Пустое тело — не беда, сигнал всё равно отправим.
  }

  const userAgent = request.headers.get('user-agent') ?? '';

  const { delivered } = await sendCallPing({
    city: decode(request.headers.get('x-vercel-ip-city')),
    region: decode(request.headers.get('x-vercel-ip-country-region')),
    referrer: shortSource(clean(body.referrer, 300)),
    page: clean(body.page, 80),
    mobile: /Mobile|Android|iPhone|iPad/i.test(userAgent),
  });

  return NextResponse.json({ ok: true, delivered });
}
