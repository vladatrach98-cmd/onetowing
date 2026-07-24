import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'One Towing | 24/7 Tow Truck & Roadside Assistance',
  description: 'Fast, reliable towing and roadside assistance across the city. Available day and night for emergency towing, jump starts, lockouts, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
