import Link from 'next/link';
import { BUSINESS } from '../lib/constants';
import { getNavLinks } from '../lib/nav';

const topBarItems = ['24/7 Towing & Roadside', 'Tampa Bay Area', 'Local Tow From $95'];

export default function SiteHeader({ showTopBar = true }: { showTopBar?: boolean }) {
  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 bg-ink-950">
      {showTopBar ? (
        <div className="flex flex-wrap justify-center gap-x-9 gap-y-1 bg-brand-500 px-6 py-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-ember-ink">
          {topBarItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}

      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3.5 lg:h-[78px] lg:gap-6 lg:px-8 lg:py-0">
          <Link href="/" className="flex shrink-0 items-center gap-[14px] text-inherit">
            <span className="block h-[34px] w-[6px] bg-brand-500" />
            <span className="block">
              <span className="block font-display text-[17px] font-extrabold uppercase tracking-[0.24em] text-white sm:text-[19px]">
                {BUSINESS.name}
              </span>
              <span className="mt-[3px] hidden text-[12px] uppercase tracking-[0.16em] text-ink-400 sm:block">
                {BUSINESS.tagline}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-x-[30px] text-[13px] font-semibold uppercase leading-none tracking-[0.14em] lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="border-b-[3px] border-transparent py-[29px] text-ink-300 transition-colors hover:border-white/30 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={BUSINESS.phoneHref}
            className="shrink-0 bg-brand-500 px-4 py-[13px] text-[12px] font-bold uppercase leading-none tracking-[0.1em] text-white transition-colors hover:bg-brand-600 hover:text-white sm:px-[22px] sm:py-[15px] sm:text-[13px]"
          >
            <span className="sm:hidden">☎ Call</span>
            <span className="hidden sm:inline">Call {BUSINESS.phone}</span>
          </a>
        </div>
      </div>

      {/* Мобильная навигация: одна строка со скроллом вбок — без бургер-меню, всё видно сразу. */}
      <nav
        aria-label="Main (mobile)"
        className="flex gap-x-6 overflow-x-auto border-b border-white/10 px-6 py-3 text-[12px] font-semibold uppercase leading-none tracking-[0.14em] lg:hidden"
      >
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="whitespace-nowrap text-ink-300 hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
