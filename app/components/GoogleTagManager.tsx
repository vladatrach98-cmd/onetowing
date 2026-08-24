import Script from 'next/script';

/**
 * Google Tag Manager — контейнер, из которого метки ставятся без правок кода.
 *
 * ⚠️ ГЛАВНАЯ ОПАСНОСТЬ: ДВОЙНОЙ СЧЁТ.
 *
 * На сайте уже стоят GA4 и Google Ads напрямую — см. `Analytics.tsx`. Если внутри
 * контейнера GTM завести ещё и тег GA4 с тем же идентификатором `G-676GCTBX4Z`
 * (или конверсию Ads с `AW-18365157406`), каждое событие посчитается ДВАЖДЫ:
 * один раз прямым кодом, второй — через контейнер.
 *
 * Выглядит это как «реклама вдруг стала работать вдвое лучше», а на самом деле
 * ломает статистику и оптимизацию ставок в Ads.
 *
 * Правило: один идентификатор ставится ОДИН раз — либо прямым кодом, либо через GTM.
 * Пока прямой код в `Analytics.tsx` на месте, в контейнере GTM не должно быть тегов
 * с `G-676GCTBX4Z` и `AW-18365157406`.
 *
 * Нажатие на телефон (`call_click`) тоже отправляет `Analytics.tsx` напрямую —
 * дублировать его триггером в GTM нельзя по той же причине.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';

/** Основной скрипт. Ставится в начало страницы. */
export function GoogleTagManagerScript() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * Запасной вариант для браузеров с отключённым JavaScript.
 * По инструкции Google должен идти сразу после открывающего тега <body>.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
