import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

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
      </body>
    </html>
  );
}
