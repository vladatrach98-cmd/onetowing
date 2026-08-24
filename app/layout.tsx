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
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
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
