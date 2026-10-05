import Image from 'next/image';
import Link from 'next/link';
import { BASE_LOCATION, BUSINESS, ESTIMATOR_ENABLED, HIGHWAYS, MAIN_SERVICE_AREAS, PRICING } from '../lib/constants';
import { CORE_SERVICE_PAGES } from '../data/services-content';
import { getNavLinks } from '../lib/nav';

export default function SiteFooter() {
  const navLinks = getNavLinks();

  return (
    // Снизу отступ под липкую кнопку звонка, чтобы она не закрывала подвал.
    <footer className="bg-ink-950 pb-[84px] text-ink-400 lg:pb-0">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-[30px] pt-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-[14px]">
            <Image
              src="/images/logo/one-towing-badge-128.png"
              alt=""
              width={128}
              height={128}
              className="h-[42px] w-[42px] shrink-0"
            />
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
          <p className="text-[15px] leading-[1.6]">{MAIN_SERVICE_AREAS.join(' · ')}</p>
          <p className="mt-2 text-[15px] leading-[1.6]">{HIGHWAYS.join(' · ')}</p>
          <Link href="/service-areas" className="mt-3 inline-block text-[15px] text-ink-300 hover:text-white">
            All service areas →
          </Link>

          <p className="mb-3 mt-8 text-[12px] font-semibold uppercase leading-none tracking-[0.2em] text-white">
            Services
          </p>
          <div className="grid gap-2 text-[15px]">
            {CORE_SERVICE_PAGES.map((page) => (
              <Link key={page.slug} href={`/services/${page.slug}`} className="text-ink-400 hover:text-white">
                {page.name}
              </Link>
            ))}
          </div>
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
              SMS Privacy Policy
            </Link>
            <Link href="/terms" className="text-ink-450 transition-colors hover:text-white">
              SMS Terms
            </Link>
            <span>Prices on this site are estimates, not final quotes</span>
          </span>
        </div>
      </div>

      {/* ЛИПКАЯ КНОПКА ЗВОНКА — только на телефоне. Висит внизу экрана на
          каждой странице с подвалом, так что позвонить можно с любого места
          без прокрутки. На /where подвала нет: там своя нижняя панель. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-950/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-sm lg:hidden">
        <p className="text-center text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-ink-200">
          24/7 Towing &amp; Roadside Assistance
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-2 flex w-full items-center justify-center gap-2.5 bg-brand-500 py-[15px] font-display text-[20px] font-black leading-none text-white hover:bg-brand-600 hover:text-white"
        >
          <span aria-hidden="true">☎</span>
          Call Now · {BUSINESS.phone}
        </a>
      </div>
    </footer>
  );
}
