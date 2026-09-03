/**
 * Простейший ограничитель частоты — чтобы боты не завалили Telegram владельца.
 * Память живёт в процессе (на Vercel — в тёплом инстансе). Это не крепость,
 * а фильтр от очевидного мусора; для нашего трафика достаточно.
 */

const hits = new Map<string, number[]>();

export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const fresh = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (fresh.length >= limit) {
    hits.set(key, fresh);
    return false;
  }

  fresh.push(now);
  hits.set(key, fresh);

  // Не даём карте расти бесконечно.
  if (hits.size > 500) {
    const stale: string[] = [];
    hits.forEach((times, mapKey) => {
      if (times.every((time) => now - time >= windowMs)) stale.push(mapKey);
    });
    stale.forEach((mapKey) => hits.delete(mapKey));
  }

  return true;
}

/**
 * Запрос пришёл с локальной машины, а не с живого сайта?
 *
 * ⚠️ Появилось не от хорошей жизни. Локальный сервер читает тот же
 * `.env.local` с настоящим токеном бота — значит нажатие «Send» на
 * http://localhost во время проверки уходит настоящим сообщением в рабочую
 * группу «ONE TOWING- заявки». Владелец видит заявку, которой нет, и едет
 * или звонит впустую. Один раз так и случилось: проверяющий гонял форму
 * на локальном сервере, а Роману пришла локация.
 *
 * Поэтому уведомления с localhost не уходят — пишутся в консоль.
 * На Vercel host всегда onetowingfl.com, так что живой сайт не задет.
 */
export function isLocalRequest(headers: Headers): boolean {
  const host = (headers.get('host') ?? '').toLowerCase();
  return host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('[::1]');
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}
