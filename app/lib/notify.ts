import { BUSINESS } from './constants';
import { directionsLink, mapsLink, type LatLng } from './maps';

/**
 * УВЕДОМЛЕНИЯ ВЛАДЕЛЬЦУ — в Telegram (никаких писем).
 *
 * Нужны две переменные окружения (.env.local + Vercel):
 *   TELEGRAM_BOT_TOKEN=1234567:AA...   ← выдаёт @BotFather
 *   TELEGRAM_CHAT_ID=123456789         ← id твоего чата с ботом
 *
 * Пока их нет — ничего не падает: заявка просто пишется в лог сервера.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? '';

export const telegramReady = TOKEN.length > 0 && CHAT_ID.length > 0;

export type Lead = {
  /** 'auto' — клиент только определил локацию; 'request' — нажал кнопку заявки. */
  kind: 'auto' | 'request';
  service: string;
  serviceKind: 'tow' | 'roadside';
  customerAddress?: string;
  customerPoint?: LatLng;
  /** Подъезд: от базы до клиента. */
  approachMiles?: number;
  approachMinutes?: number;
  /** true — считали без Google, по прямой. */
  approximateRoute?: boolean;
  destinationAddress?: string;
  towMiles?: number;
  estimateLow?: number;
  estimateHigh?: number;
  phone?: string;
  note?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const round = (value: number) => Math.round(value);

function buildMessage(lead: Lead): string {
  const lines: string[] = [];

  lines.push(
    lead.kind === 'request'
      ? '🔴 <b>ЗАЯВКА С САЙТА</b>'
      : '👀 <i>Кто-то считает цену на сайте</i>',
  );
  lines.push('');
  lines.push(`🚗 <b>Проблема:</b> ${escapeHtml(lead.service)}`);

  if (lead.customerAddress) {
    lines.push(`📍 <b>Клиент:</b> ${escapeHtml(lead.customerAddress)}`);
  }

  if (lead.approachMiles != null && lead.approachMinutes != null) {
    const suffix = lead.approximateRoute ? ' <i>(грубо, без Google)</i>' : '';
    lines.push(`🛣 <b>Ехать до него:</b> ${round(lead.approachMiles)} миль · ~${round(lead.approachMinutes)} мин${suffix}`);
  }

  if (lead.destinationAddress) {
    lines.push(`🏁 <b>Куда везти:</b> ${escapeHtml(lead.destinationAddress)}`);
  }
  if (lead.towMiles != null && lead.towMiles > 0) {
    lines.push(`📏 <b>Длина буксировки:</b> ${round(lead.towMiles)} миль`);
  }

  // Цену в уведомлении НЕ пишем: её называет владелец по телефону, глядя на мили выше.
  // Сумма в сообщении сбивала бы с толку — её легко принять за уже согласованную с клиентом.
  // Поля estimateLow/estimateHigh приходят с формы, но намеренно не показываются.

  if (lead.phone) {
    lines.push(`📞 <b>Его телефон:</b> ${escapeHtml(lead.phone)}`);
  }
  if (lead.note) {
    lines.push(`📝 ${escapeHtml(lead.note)}`);
  }

  if (lead.customerPoint) {
    lines.push('');
    lines.push(
      `<a href="${mapsLink(lead.customerPoint)}">Точка на карте</a> · <a href="${directionsLink(lead.customerPoint)}">Маршрут от базы</a>`,
    );
  }

  lines.push('');
  lines.push(`<i>${BUSINESS.domain}</i>`);

  return lines.join('\n');
}

async function callTelegram(method: string, payload: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, ...payload }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Telegram ${method} ${response.status}: ${await response.text()}`);
  }
}

export async function sendLead(lead: Lead): Promise<{ delivered: boolean }> {
  if (!telegramReady) {
    console.info('[notify] Telegram не настроен, заявка только в логе:', lead);
    return { delivered: false };
  }

  try {
    await callTelegram('sendMessage', {
      text: buildMessage(lead),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });

    // Отдельная гео-точка: в Telegram она открывается как метка на карте.
    if (lead.kind === 'request' && lead.customerPoint) {
      await callTelegram('sendLocation', {
        latitude: lead.customerPoint.lat,
        longitude: lead.customerPoint.lng,
      });
    }

    return { delivered: true };
  } catch (error) {
    console.error('[notify] Telegram не принял сообщение:', error);
    return { delivered: false };
  }
}
