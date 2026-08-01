'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Счётчики Google. Всё через переменные окружения — нет переменной, нет и кода
 * на странице (сайт не тормозит и не грузит лишнего).
 *
 *   NEXT_PUBLIC_GA_ID                 — Google Analytics 4, вида G-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID         — Google Ads, вида AW-123456789
 *   NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL — метка конверсии «звонок», вида AbC-D_efGh
 *
 * Главная конверсия у эвакуатора — НАЖАТИЕ НА ТЕЛЕФОН. Ловим клик по любой
 * ссылке tel: на сайте и отправляем событие в GA4 и в Google Ads.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '';
const ADS_CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL ?? '';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Сигнал владельцу в Telegram «сейчас позвонят».
 *
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

export default function Analytics() {
  const primaryId = GA_ID || ADS_ID;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;

      // Telegram — независимо от счётчиков Google.
      pingOwner();

      window.gtag?.('event', 'call_click', { event_category: 'engagement' });

      if (ADS_ID && ADS_CALL_LABEL) {
        window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${ADS_CALL_LABEL}` });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!primaryId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
