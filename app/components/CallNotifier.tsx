'use client';

import { useEffect } from 'react';

/**
 * Сигнал владельцу в Telegram: «сейчас позвонят».
 *
 * Раньше этот файл назывался Analytics.tsx и, кроме уведомления, ставил на сайт
 * GA4 и Google Ads напрямую. Счётчики переехали в Google Tag Manager
 * (см. `GoogleTagManager.tsx`), поэтому здесь остался только Telegram — и файл
 * назван по тому, что он на самом деле делает.
 *
 * ⚠️ Это НЕ аналитика и не счётчик. Это рабочий инструмент: телефон у Романа ещё
 * звонит, а в группе уже видно, кто звонит и откуда. Отключать вместе со
 * счётчиками нельзя — владелец потеряет уведомления о звонках.
 *
 * ⚠️ Событие `call_click` для GA4 и конверсия Google Ads теперь настраиваются
 * ТРИГГЕРОМ ВНУТРИ GTM, а не здесь. Если вернуть их сюда кодом, не убрав из
 * контейнера, каждое нажатие посчитается дважды.
 */

/**
 * sendBeacon, а не обычный запрос: после нажатия на tel: телефон немедленно
 * открывает набор номера и выгружает страницу. Обычный fetch в этот момент
 * браузер отменяет, а beacon система обязана доставить.
 */
function pingOwner() {
  try {
    const payload = JSON.stringify({
      page: window.location.pathname,
      referrer: document.referrer,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/call-click', new Blob([payload], { type: 'application/json' }));
      return;
    }

    void fetch('/api/call-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Уведомление — приятный бонус. Если не ушло, звонок всё равно состоится.
  }
}

export default function CallNotifier() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;

      pingOwner();
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
