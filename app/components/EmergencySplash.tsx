'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BUSINESS } from '../lib/constants';

const locations = ['Tampa', 'Ybor City', 'Clearwater', 'St. Petersburg', '+ Tampa Bay'];

export default function EmergencySplash() {
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduceMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewport = window.innerHeight || 1;
        setProgress(Math.min(1, Math.max(0, window.scrollY / viewport)));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener('change', syncMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const fade = Math.max(0, 1 - progress * 1.3);

  const contentStyle = {
    opacity: fade,
    transform: reduceMotion ? undefined : `translateY(${progress * -56}px) scale(${1 - progress * 0.05})`,
    // Once faded out the splash sits behind the page — keep it out of the tab order.
    visibility: fade === 0 ? ('hidden' as const) : undefined,
  };

  return (
    <section
      aria-label="Emergency towing"
      className="sticky top-0 z-0 h-screen overflow-hidden bg-ink-950"
      style={{ height: '100svh' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_12%,rgba(200,24,31,0.30),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_92%,rgba(200,24,31,0.14),transparent_48%)]" />

      <div
        className="relative flex h-full flex-col justify-between px-6 py-8 will-change-[opacity,transform] lg:px-8 lg:py-10"
        style={contentStyle}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6">
          <div className="flex items-center gap-[14px]">
            <span className="block h-[34px] w-[6px] bg-brand-500" />
            <span className="block">
              <span className="block font-display text-[17px] font-extrabold uppercase tracking-[0.24em] text-white sm:text-[19px]">
                {BUSINESS.name}
              </span>
              <span className="mt-[3px] block text-[11px] uppercase tracking-[0.16em] text-ink-400 sm:text-[12px]">
                {BUSINESS.tagline}
              </span>
            </span>
          </div>
          <span className="hidden text-[12px] font-semibold uppercase leading-none tracking-[0.28em] text-ink-400 sm:block">
            Always open · Live dispatch
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center text-center">
          <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.34em] text-brand-300 sm:text-[12px]">
            Emergency towing · 24/7 dispatch
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.02em] text-white text-balance sm:text-[56px] lg:text-[72px]">
            One call. A truck on the way.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-200 text-pretty sm:text-[19px]">
            Towing and roadside help across Tampa Bay, day and night. Tell us where you are — call for the current ETA.
          </p>

          <div className="relative mt-10 inline-flex">
            <span className="emergency-ring pointer-events-none absolute inset-0 bg-brand-500" aria-hidden="true" />
            <a
              href={BUSINESS.phoneHref}
              className="relative flex items-center gap-4 bg-brand-500 px-9 py-6 font-display text-[20px] font-extrabold uppercase leading-none tracking-[0.08em] text-white transition-colors hover:bg-brand-600 hover:text-white sm:px-14 sm:py-8 sm:text-[28px]"
            >
              <span aria-hidden="true" className="text-[0.85em]">
                ☎
              </span>
              Call {BUSINESS.phone}
            </a>
          </div>

          <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-ink-400">
            Tap to call — we answer day and night
          </p>

          <Link
            href="/estimate"
            className="mt-7 border-b border-white/25 pb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-brand-500 hover:text-brand-300"
          >
            Or check the price first
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[1280px]">
          <p className="text-center text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-ink-400">
            We cover
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {locations.map((location, index) => (
              <span key={location} className="flex items-center gap-6">
                {index > 0 ? <span className="block h-1.5 w-1.5 bg-brand-500" aria-hidden="true" /> : null}
                <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.2em] text-white sm:text-[19px]">
                  {location}
                </span>
              </span>
            ))}
          </div>

          <p className="scroll-cue mt-8 text-center text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-ink-400">
            Scroll for services &amp; pricing ↓
          </p>
        </div>
      </div>
    </section>
  );
}
