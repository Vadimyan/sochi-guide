'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { METRIKA_COUNTER_ID } from '@/lib/metrika';

// Counter is disabled in development so local runs don't pollute the stats
const isEnabled = process.env.NODE_ENV === 'production';

export function YandexMetrika() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Load the Metrika tag and init the counter once
  useEffect(() => {
    if (!isEnabled) return;

    const w = window as any;
    if (w.ym) return;

    w.ym = function (...args: unknown[]) {
      (w.ym.a = w.ym.a || []).push(args);
    };
    w.ym.l = Date.now();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_COUNTER_ID}`;
    document.head.appendChild(script);

    w.ym(METRIKA_COUNTER_ID, 'init', {
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      referrer: document.referrer,
      url: location.href,
    });
  }, []);

  // The site is a static export with client-side navigation, so route
  // changes don't reload the page — report them to Metrika manually.
  // The initial page view is already counted by 'init' above.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isEnabled) return;

    (window as any).ym?.(METRIKA_COUNTER_ID, 'hit', window.location.href);
  }, [pathname]);

  return null;
}
