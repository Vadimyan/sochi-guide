import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { METRIKA_COUNTER_ID } from '@/lib/metrika';

export const metadata: Metadata = {
  title: 'Гид по Сочи и Красной Поляне',
  description:
    'Лучшие рестораны, велнес и развлечения в Сочи, Красной Поляне, Сириусе и Адлере',
  keywords: ['Сочи', 'Красная Поляна', 'путеводитель', 'рестораны', 'велнес'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <YandexMetrika />
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${METRIKA_COUNTER_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
