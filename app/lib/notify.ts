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
  /** Заявки со страницы записи /book: имя, почта и желаемое время. */
  name?: string;
  email?: string;
  /** Значение поля datetime-local, вида «2026-09-02T14:30». */
  when?: string;
};

/** «2026-09-02T14:30» → «02.09 в 14:30». Часовой пояс — тот, что выбрал клиент. */
function humanWhen(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  return m ? `${m[3]}.${m[2]} в ${m[4]}:${m[5]}` : value;
}

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

  if (lead.name) {
    lines.push(`👤 <b>Имя:</b> ${escapeHtml(lead.name)}`);
  }
  if (lead.when) {
    lines.push(`🗓 <b>Хочет на:</b> ${escapeHtml(humanWhen(lead.when))}`);
  }

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
  if (lead.email) {
    lines.push(`✉️ <b>Почта:</b> ${escapeHtml(lead.email)}`);
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

export type CallPing = {
  /** Город по IP — приблизительно, на уровне провайдера. */
  city?: string;
  region?: string;
  /** Откуда пришёл человек: google.com, реклама, прямой заход. */
  referrer?: string;
  /** Страница сайта, с которой нажали. */
  page?: string;
  /** true — телефон/планшет, false — компьютер. */
  mobile?: boolean;
};

/** Время в Тампе — владелец смотрит уведомление в своём часовом поясе. */
const tampaTime = () =>
  new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

function buildCallMessage(ping: CallPing): string {
  const lines: string[] = [];

  lines.push('📞 <b>НАЖАЛИ НА ТЕЛЕФОН</b>');
  lines.push('<i>Человек набирает номер прямо сейчас.</i>');
  lines.push('');
  lines.push(`🕐 ${tampaTime()} по Тампе`);

  const place = [ping.city, ping.region].filter(Boolean).join(', ');
  if (place) {
    lines.push(`📍 <b>Примерно:</b> ${escapeHtml(place)} <i>(по интернет-адресу, неточно)</i>`);
  }

  if (ping.referrer) {
    lines.push(`🔗 <b>Пришёл с:</b> ${escapeHtml(ping.referrer)}`);
  }
  if (ping.page && ping.page !== '/') {
    lines.push(`🌐 <b>Страница:</b> ${escapeHtml(ping.page)}`);
  }
  if (ping.mobile != null) {
    lines.push(ping.mobile ? '📱 С телефона' : '💻 С компьютера');
  }

  lines.push('');
  lines.push(`<i>${BUSINESS.domain}</i>`);

  return lines.join('\n');
}

/** Тихий сигнал «сейчас позвонят» — отправляется, когда кликнули по номеру на сайте. */
export async function sendCallPing(ping: CallPing): Promise<{ delivered: boolean }> {
  if (!telegramReady) {
    console.info('[notify] Telegram не настроен, нажатие на телефон только в логе:', ping);
    return { delivered: false };
  }

  try {
    await callTelegram('sendMessage', {
      text: buildCallMessage(ping),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
    return { delivered: true };
  } catch (error) {
    console.error('[notify] Telegram не принял сигнал о звонке:', error);
    return { delivered: false };
  }
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

/**
 * ЛОКАЦИЯ СО СТРАНИЦЫ /where.
 *
 * Владелец разговаривает с клиентом и одновременно ведёт машину. Поэтому
 * сообщение построено так, чтобы им можно было пользоваться одним пальцем:
 * сначала телефон (перезвонить), потом ссылка на карту (открыть навигацию).
 * Координаты показаны текстом на случай, если ссылка не откроется.
 */
export type CustomerLocation = {
  phone?: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupAccuracy?: number;
  /** Адрес, если клиент вписал его руками вместо GPS. */
  pickupText?: string;
  dropoffText?: string;
  note?: string;
};

const mapsPoint = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export async function sendCustomerLocation(loc: CustomerLocation): Promise<{ delivered: boolean }> {
  const lines: string[] = ['📍 <b>ЛОКАЦИЯ ОТ КЛИЕНТА</b>', ''];

  if (loc.phone) {
    lines.push(`📞 <b>Телефон:</b> ${escapeHtml(loc.phone)}`);
    lines.push('');
  }

  lines.push('🚗 <b>Машина здесь:</b>');
  if (loc.pickupLat != null && loc.pickupLng != null) {
    const acc = loc.pickupAccuracy != null ? ` · точность ~${Math.round(loc.pickupAccuracy)} м` : '';
    lines.push(`${loc.pickupLat.toFixed(5)}, ${loc.pickupLng.toFixed(5)}${acc}`);
    lines.push(mapsPoint(loc.pickupLat, loc.pickupLng));
  }
  if (loc.pickupText) {
    lines.push(escapeHtml(loc.pickupText));
    if (loc.pickupLat == null) {
      lines.push(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.pickupText)}`);
    }
  }

  if (loc.dropoffText) {
    lines.push('');
    lines.push('🏁 <b>Везти сюда:</b>');
    lines.push(escapeHtml(loc.dropoffText));
    lines.push(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.dropoffText)}`);
  }

  // Готовый маршрут от машины до точки назначения — одно нажатие, и навигация ведёт.
  if (loc.pickupLat != null && loc.pickupLng != null && loc.dropoffText) {
    lines.push('');
    lines.push(
      `🗺 <b>Маршрут:</b> https://www.google.com/maps/dir/?api=1&origin=${loc.pickupLat},${loc.pickupLng}&destination=${encodeURIComponent(loc.dropoffText)}`,
    );
  }

  if (loc.note) {
    lines.push('');
    lines.push(`📝 ${escapeHtml(loc.note)}`);
  }

  if (!telegramReady) {
    console.info('[notify] Telegram не настроен, локация только в логе:', loc);
    return { delivered: false };
  }

  try {
    await callTelegram('sendMessage', {
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });

    // Отдельная метка на карте: в Telegram открывается как точка, а не ссылка.
    if (loc.pickupLat != null && loc.pickupLng != null) {
      await callTelegram('sendLocation', { latitude: loc.pickupLat, longitude: loc.pickupLng });
    }

    return { delivered: true };
  } catch (error) {
    console.error('[notify] Telegram не принял локацию:', error);
    return { delivered: false };
  }
}
