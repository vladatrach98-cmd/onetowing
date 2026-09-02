import Link from 'next/link';
import { BASE_LOCATION, BUSINESS, ESTIMATOR_ENABLED, HIGHWAYS, PRICING, SERVICE_AREAS } from '../lib/constants';
import { getNavLinks } from '../lib/nav';

export default function SiteFooter() {
  const navLinks = getNavLinks();

  return (
    <footer className="bg-ink-950 text-ink-400">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-[30px] pt-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-[14px]">
            <span className="block h-[30px] w-[6px] bg-brand-500" />
            <span className="font-display text-[17px] font-extrabold uppercase tracking-[0.24em] text-white">
              {BUSINESS.name}
            </span>
          </div>
          <p className="mt-5 max-w-[340px] text-[16px] leading-[1.6] text-pretty">
            Towing and roadside assistance across {BUSINESS.serviceArea}, around the clock. Local tow from $
            {PRICING.baseFee}.
          </p>
          <a
            href={BUSINESS.phoneHref}
            className="mt-6 inline-block bg-brand-500 px-6 py-4 text-[14px] font-bold uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-brand-600 hover:text-white"
          >
            Call {BUSINESS.phone}
          </a>
        </div>

        <div>
          <p className="mb-[18px] text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-white">Site</p>
          <div className="grid gap-3 text-[16px]">
            <Link href="/" className="text-ink-400 transition-colors hover:text-white">
              Home
            </Link>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-ink-400 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link href="/about" className="text-ink-400 transition-colors hover:text-white">
              About
            </Link>
            <Link href="/faq" className="text-ink-400 transition-colors hover:text-white">
              FAQ
            </Link>
            <Link href="/book" className="text-ink-400 transition-colors hover:text-white">
              Book a pickup
            </Link>
            {ESTIMATOR_ENABLED ? (
              <Link href="/estimate" className="text-ink-400 transition-colors hover:text-white">
                Price Estimate
              </Link>
            ) : null}
          </div>
        </div>

        <div>
          <p className="mb-[18px] text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-white">
            Contact
          </p>
          <div className="grid gap-3 text-[16px]">
            <a href={BUSINESS.phoneHref} className="text-ink-400 transition-colors hover:text-white">
              {BUSINESS.phone}
            </a>
            {/* Почта — скромно, только здесь. Главное действие на сайте везде звонок. */}
            <a href={BUSINESS.emailHref} className="text-ink-400 transition-colors hover:text-white">
              {BUSINESS.email}
            </a>
            <span>{BUSINESS.hours}</span>
            <span>Call for current ETA</span>
          </div>

          <p className="mb-3 mt-8 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-white">
            We cover
          </p>
          <p className="text-[15px] leading-[1.6]">{SERVICE_AREAS.join(' · ')}</p>
          <p className="mt-2 text-[15px] leading-[1.6]">{HIGHWAYS.join(' · ')}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-4 px-6 py-[22px] text-[13px] tracking-[0.06em] text-ink-450 lg:px-8">
          {/* Полное юридическое имя на видном месте: при регистрации SMS
              проверяющий сверяет сайт с письмом IRS, а «ONE TOWING» без «LLC»
              с ним не совпадает — это отдельная причина отказа. */}
          <span>© 2026 ONE TOWING LLC · {BASE_LOCATION.address}</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="text-ink-450 transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-ink-450 transition-colors hover:text-white">
              Terms
            </Link>
            <span>Prices on this site are estimates, not final quotes</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
