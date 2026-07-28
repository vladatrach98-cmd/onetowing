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

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}
