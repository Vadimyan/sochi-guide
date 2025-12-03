'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { title: 'Главная', slug: '/', icon: '🏠' },
  { title: 'Красная Поляна', slug: '/krasnaya-polyana', icon: '🏔️' },
  { title: 'Сочи', slug: '/sochi', icon: '🌴' },
  { title: 'Сириус и Адлер', slug: '/sirius-adler', icon: '🎭' },
  { title: 'Окрестности', slug: '/around-sochi', icon: '🚗' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (slug: string) => {
    if (slug === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(slug);
  };

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
          >
            Гид по Сочи
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive(item.slug)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.slug)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
