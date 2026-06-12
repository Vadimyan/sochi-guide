'use client';

import { AnchorHTMLAttributes } from 'react';
import { METRIKA_COUNTER_ID } from '@/lib/metrika';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  goal: string; // Metrika JS-goal identifier, e.g. 'open-place-map'
  label?: string; // what was clicked, e.g. a place id
}

// External <a> that reports the click to Yandex Metrika: as a goal
// (needs the goal created in the Metrika UI) and as a visit param
// (shows up in Отчёты → Содержание → Параметры визитов with no setup).
export function TrackedLink({ goal, label, children, ...anchorProps }: TrackedLinkProps) {
  const handleClick = () => {
    const ym = (window as any).ym;
    if (!ym) return; // counter is disabled in development

    ym(METRIKA_COUNTER_ID, 'reachGoal', goal, label ? { label } : undefined);
    if (label) {
      ym(METRIKA_COUNTER_ID, 'params', { [goal]: label });
    }
  };

  return (
    <a {...anchorProps} onClick={handleClick}>
      {children}
    </a>
  );
}
