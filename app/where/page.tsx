import type { Metadata } from 'next';
import LocationForm from './LocationForm';
import { BUSINESS } from '../lib/constants';

/**
 * СТРАНИЦА «ГДЕ МАШИНА» — /where.
 *
 * Владелец диктует этот адрес голосом, пока говорит с клиентом:
 * «откройте onetowingfl.com слэш where». Клиент ставит точку — владельцу
 * приходит она в Telegram вместе со ссылкой на навигацию.
 *
 * ⚠️ Ни шапки, ни подвала, ни меню здесь намеренно нет. Человек стоит на
 * обочине с одной свободной рукой; всё, что не ведёт к отправке точки, ему
 * мешает. Единственная ссылка на странице — телефон.
 *
 * ⚠️ noindex: страница не для поиска. Она инструмент для тех, кто уже
 * разговаривает с нами по телефону, и в выдаче ей делать нечего. По той же
 * причине её нет в sitemap.
 *
 * ⚠️ Вторая фаза (после регистрации 10DLC) добавит адрес вида /where/ТОКЕН,
 * где телефон подставится сам из данных звонка. Эта страница остаётся как есть
 * и продолжает работать для тех, кто набрал адрес руками.
 */

export const metadata: Metadata = {
  title: `Send your location | ${BUSINESS.name}`,
  description: 'Send us where your vehicle is so we can get the truck to the right place.',
  robots: { index: false, follow: false },
};

export default function WherePage() {
  return (
    <main className="min-h-screen bg-bone-100">
      <div className="bg-ink-950 px-6 py-6">
        <div className="mx-auto flex max-w-[560px] items-center justify-between gap-4">
          <span className="font-display text-[17px] font-extrabold uppercase tracking-[0.22em] text-white">
            {BUSINESS.name}
          </span>
          <a
            href={BUSINESS.phoneHref}
            className="shrink-0 bg-brand-500 px-4 py-[12px] text-[13px] font-bold uppercase leading-none tracking-[0.08em] text-white"
          >
            ☎ Call
          </a>
        </div>
      </div>

      {/* Запас снизу под плашку с кнопкой: она прибита к экрану и накрыла бы
          собой последние строки. Высота плашки ~120 px, берём с полем. */}
      <div className="mx-auto max-w-[560px] px-5 pb-[170px] pt-8">
        <h1 className="font-display text-[27px] font-extrabold leading-[1.12] tracking-[-0.015em] text-ink-700 text-balance sm:text-[32px]">
          Send us your location
        </h1>
        <p className="mt-3 text-[17px] leading-[1.55] text-ink-600 text-pretty">
          Takes about fifteen seconds. Stay on the phone with us while you do it.
        </p>

        <div className="mt-7">
          <LocationForm />
        </div>

        <p className="mt-8 text-center text-[15px] leading-[1.55] text-ink-500 text-pretty">
          Your location is only used to send the truck. We do not store it and we do not share it.
        </p>
      </div>
    </main>
  );
}
