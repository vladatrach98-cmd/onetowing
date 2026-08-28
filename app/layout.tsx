import type { Metadata } from 'next';
import { Archivo, Barlow } from 'next/font/google';
import './globals.css';
import CallNotifier from './components/CallNotifier';
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from './components/GoogleTagManager';
import { BUSINESS, PRICING } from './lib/constants';
import { businessJsonLd } from './lib/seo';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const title = `${BUSINESS.name} | 24/7 Tow Truck & Roadside Assistance in Tampa, FL`;
const description = `Towing and roadside assistance across Tampa Bay, 24 hours a day. Local tow from $${PRICING.baseFee}, $${PRICING.extraMileRate} per extra mile. Call ${BUSINESS.phone}.`;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '';

/**
 * Подтверждение прав в Bing Webmaster Tools.
 *
 * Записан прямо в коде, а не в переменной окружения, намеренно: это публичный
 * ключ (он и так виден в исходном коде каждой страницы), он никогда не меняется,
 * и держать его в репозитории надёжнее — переменную в Vercel можно случайно
 * удалить, и сайт молча потеряет подтверждение.
 *
 * ⚠️ НЕ УДАЛЯТЬ после успешной проверки. Bing перепроверяет тег периодически:
 * пропадёт строка — слетит подтверждение, и данные по сайту исчезнут.
 *
 * Импорт из Google Search Console не сработал: там ресурс подтверждён как
 * «домен» (через TXT-запись в DNS), а Bing умеет забирать только ресурсы вида
 * «URL-префикс». Поэтому подтверждаем отдельно, мета-тегом.
 */
const BING_SITE_VERIFICATION = '40C94E4494904AF089BCAB8CC0281A49';

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  keywords: [
    'towing Tampa',
    'tow truck Tampa',
    'roadside assistance Tampa',
    '24 hour towing Tampa Bay',
    'эвакуатор Тампа',
    'grúa Tampa',
  ],
  openGraph: {
    type: 'website',
    siteName: BUSINESS.name,
    title,
    description,
    url: BUSINESS.siteUrl,
    locale: 'en_US',
    images: [{ url: '/images/one-towing-og.jpg', width: 1200, height: 630, alt: `${BUSINESS.name} tow truck` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/one-towing-og.jpg'] },
  robots: { index: true, follow: true },
  // Подтверждение прав в Google Search Console (появится, когда зададим переменную).
  verification: {
    ...(gscVerification ? { google: gscVerification } : {}),
    other: { 'msvalidate.01': BING_SITE_VERIFICATION },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable}`}>
      <body>
        {/* По инструкции Google — сразу после открывающего <body>. */}
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        {children}
        {/* Карточка бизнеса для Google: телефон, адрес, часы работы, зона выезда. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }}
        />
        {/* Только Telegram-уведомление о звонке. Счётчики — в GTM. */}
        <CallNotifier />
      </body>
    </html>
  );
}
