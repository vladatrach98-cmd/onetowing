import type { Metadata } from 'next';
import { Archivo, Barlow } from 'next/font/google';
import './globals.css';
import { BUSINESS, PRICING } from './lib/constants';

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

export const metadata: Metadata = {
  title: `${BUSINESS.name} | 24/7 Tow Truck & Roadside Assistance in Tampa, FL`,
  description: `Towing and roadside assistance across Tampa Bay, 24 hours a day. Local tow from $${PRICING.baseFee}, $${PRICING.extraMileRate} per extra mile. Call ${BUSINESS.phone}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
