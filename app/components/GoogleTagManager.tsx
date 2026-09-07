'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Google Tag Manager — единственное место, откуда на сайт ставятся счётчики.
 *
 * Прямой код GA4 и Google Ads из проекта УБРАН (был в `Analytics.tsx`, файл удалён).
 * Теперь всё живёт в контейнере, и метки меняются в интерфейсе GTM без правок кода
 * и без пересборки сайта.
 *
 * ⚠️ ЧТО ОБЯЗАТЕЛЬНО НАСТРОИТЬ ВНУТРИ КОНТЕЙНЕРА — иначе учёта нет вообще:
 *
 *   1. Тег GA4 Configuration           →  G-676GCTBX4Z, триггер All Pages
 *   2. Тег Google Ads Conversion       →  AW-18365157406 / A_YuCJzc7twcEJ6gmLVE
 *   3. Триггер «нажали на телефон»     →  Click - Just Links,
 *                                          Click URL начинается с `tel:`
 *      На него вешаются событие GA4 `call_click` и конверсия Ads.
 *
 * ⚠️ Обратно в код эти идентификаторы не возвращать. Один идентификатор ставится
 * ОДИН раз — либо кодом, либо через GTM. Иначе каждое событие считается дважды,
 * статистика врёт вдвое, а Google Ads оптимизирует ставки по выдуманным конверсиям.
 *
 * ⚠️ Уведомление владельцу в Telegram («сейчас позвонят») к счётчикам отношения не
 * имеет и работает независимо — см. `CallNotifier.tsx`. Оно должно жить в коде:
 * это рабочий инструмент, а не аналитика.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';

/**
 * Страницы, где контейнер НЕ ставится.
 *
 * ⚠️ /where — страница, на которой человек отдаёт нам своё точное
 * местоположение, и та же страница обещает: «мы никогда не продаём его
 * и не используем для рекламы». Рекламный контейнер на ней — это ровно то
 * противоречие, которого мы избегаем. Сегодня внутри контейнера лежит только
 * подмена номеров CallRail, но завтра кто-то добавит тег ремаркетинга,
 * и он молча начнёт срабатывать именно здесь. Дешевле закрыть заранее.
 *
 * ⚠️ /privacy и /terms — по другой причине. Подмена номеров CallRail
 * переписывает телефон прямо в тексте юридических страниц, и два проверяющих,
 * открывшие /terms с разницей в минуту, увидят разные номера — ни один из них
 * не совпадёт со структурированными данными и с карточкой в Google. Здесь
 * должен стоять один-единственный настоящий номер.
 */
const NO_TAGS = ['/where', '/privacy', '/terms'];

function useTagsDisabled() {
  const pathname = usePathname();
  return !GTM_ID || NO_TAGS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Основной скрипт. Ставится в начало страницы. */
export function GoogleTagManagerScript() {
  const disabled = useTagsDisabled();
  if (disabled) return null;

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
  const disabled = useTagsDisabled();
  if (disabled) return null;

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
