import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import LocationForm from './LocationForm';
import { BASE_LOCATION, BUSINESS } from '../lib/constants';

/**
 * СТРАНИЦА «ГДЕ МАШИНА» — /where.
 *
 * Владелец диктует этот адрес голосом, пока говорит с клиентом:
 * «откройте onetowingfl.com слэш where». Клиент ставит точку — владельцу
 * приходит она в Telegram вместе со ссылкой на навигацию.
 *
 * ⚠️ Ни общей шапки, ни меню здесь намеренно нет. Человек стоит на обочине
 * с одной свободной рукой; всё, что не ведёт к отправке точки, ему мешает.
 *
 * Но внизу обязаны стоять название юрлица, адрес и ссылки на Privacy
 * и Terms — без них регистрацию SMS отклонят, и это справедливо: человек
 * пришёл по ссылке с незнакомого номера, и у него просят геолокацию.
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
          <span className="flex items-center gap-[10px]">
            <Image
              src="/images/logo/one-towing-badge-128.png"
              alt=""
              width={128}
              height={128}
              priority
              className="h-[34px] w-[34px] shrink-0"
            />
            <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.18em] text-white sm:text-[17px] sm:tracking-[0.22em]">
              {BUSINESS.name}
            </span>
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
          Takes about fifteen seconds. If you are on the phone with us, stay on it.
        </p>

        <div className="mt-7">
          <LocationForm />
        </div>

        {/* ⚠️ Текст был другой: «мы это не храним и никому не передаём».
            Все три утверждения были неправдой. Координаты уходят в карту
            за тайлами, в геокодер за адресом и в Telegram владельцу, где
            лежат бессрочно — наша же /privacy это честно перечисляет.
            Обещание приватности, которого бизнес не держит, — это обман
            потребителя по §5 закона о FTC, а точная геолокация у них
            в списке приоритетов. Плюс проверяющий регистрации SMS увидел бы
            противоречие между двумя страницами сайта. */}
        <p className="mt-8 text-center text-[15px] leading-[1.55] text-ink-500 text-pretty">
          We use your location for one thing — sending the truck to you. To turn the coordinates into
          an address it passes through our map provider, and it reaches our dispatcher as a message.
          We never sell it and never use it for advertising.{' '}
          <Link href="/privacy" className="font-bold text-brand-600 underline underline-offset-2">
            See our Privacy Policy
          </Link>
          .
        </p>

        {/* Кто мы. Единственная страница сайта без подвала — и при этом та,
            которую открывает человек, получивший SMS с незнакомого номера,
            и у которого сразу просят точное местоположение. Правило CTIA:
            сайт по ссылке из сообщения обязан однозначно называть владельца
            и давать почтовый адрес. */}
        <p className="mt-6 border-t border-bone-300 pt-5 text-center text-[13px] leading-[1.7] text-ink-500">
          ONE TOWING LLC · {BASE_LOCATION.address}
          <br />
          <a href={BUSINESS.phoneHref} className="font-bold text-ink-600 underline underline-offset-2">
            {BUSINESS.phone}
          </a>
          {' · '}
          <Link href="/privacy" className="font-bold text-ink-600 underline underline-offset-2">
            Privacy Policy
          </Link>
          {' · '}
          <Link href="/terms" className="font-bold text-ink-600 underline underline-offset-2">
            Terms of Service
          </Link>
        </p>
      </div>
    </main>
  );
}
