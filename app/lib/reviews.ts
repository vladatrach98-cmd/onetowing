/**
 * ОТЗЫВЫ — настоящие, из карточки Google Business Profile.
 *
 * ⚠️ ТЕКСТ ПЕРЕНЕСЁН ДОСЛОВНО И ПРАВИТЬ ЕГО НЕЛЬЗЯ. Ни сокращать, ни
 * «причёсывать», ни исправлять опечатки. Отредактированный отзыв перестаёт быть
 * отзывом клиента: в США это нарушение правил FTC о достоверных отзывах, а для
 * Google — повод заблокировать карточку.
 *
 * ⚠️ Добавлять сюда можно только то, что реально написано в карточке. Ничего не
 * досочинять. Проверить оригинал: maps.google.com/?cid=11608764308225182732
 *
 * ⚠️ Про «20 минут» и «30 минут» в текстах. Правило проекта — САМИМ время подачи
 * не обещать (на сайте везде «Call for current ETA»). Но это слова клиентов о том,
 * как было у них, а не наше обещание. Публиковать их дословно — законно и честно;
 * вычёркивать цифры из чужого отзыва — как раз нарушение. Поэтому оставлены как есть.
 *
 * Когда отзывов станет 30+, имеет смысл перейти на автоматическую подгрузку:
 *   вариант 1: виджет Elfsight/Trustindex (~$10/мес, показывает все);
 *   вариант 2: Google Places API (бесплатно до лимита, но отдаёт только 5).
 * Вёрстка секции при этом не меняется — переписывается только getReviews().
 */

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Например 'August 2026'. */
  date: string;
  source: 'google';
};

/** Настоящие отзывы из карточки Google. Перенесены дословно 27 августа 2026. */
export const REVIEWS: Review[] = [
  {
    author: 'Lidiia B',
    rating: 5,
    text: 'Roman was awesome! I called him when I was stuck on the side of I-275 and he got to me within 20 minutes. I needed my car towed to Tampa, and he made the whole thing quick and easy.\n\nHe was helpful, polite, and really easy to deal with. Great service, great price, great guy! Would absolutely call Roman again if I ever need a tow',
    date: 'August 2026',
    source: 'google',
  },
  {
    author: 'Daniil Holfeld',
    rating: 5,
    text: 'ONE TOWING honestly saved my work trip from Miami. My car broke down on I-275 while I was heading into Tampa, and I had no idea how long I was going to be stuck there.\n\nWhen I called, the dispatcher explained the price and wait time right away. About 30 minutes later, the driver was already there, loaded my car, and got everything handled without any problems.\n\nSeriously, save their number, you never know when your car might decide to ruin your plans 😄\n\nThanks guys, you really helped me out, and the price was actually reasonable too. If you’re ever stuck around Tampa and need towing or roadside help, these are the guys to call!',
    date: 'August 2026',
    source: 'google',
  },
  {
    author: 'Anna Z',
    rating: 5,
    text: 'Had my car towed from St. Petersburg to Downtown Tampa today. I was worried I’d be stuck waiting for hours, but the driver got to me in about 20 minutes. He got there fast, handled everything carefully, and made the whole situation way less stressful.\n\nThe trip across the Howard Frankland Bridge into Tampa went smoothly, and everything was taken care of without any issues. Fast, reliable service. Thank you, ONE TOWING!',
    date: 'August 2026',
    source: 'google',
  },
  {
    author: 'Aleksei Mukhlynin',
    rating: 5,
    text: 'Excellent towing company! The tow truck arrived very quickly, and the service was fast and professional. Their price was significantly lower than the other companies I called. When you find yourself in a difficult situation, these guys won’t leave you stranded—they will come and help. I highly recommend this towing service!',
    date: 'August 2026',
    source: 'google',
  },
  {
    author: 'Yurii Sedlachek',
    rating: 5,
    text: 'I got into an accident and needed my car towed. One Towing showed up quickly and made a stressful situation a lot easier. Really appreciate the help!',
    date: 'August 2026',
    source: 'google',
  },
  {
    /**
     * ⚠️ В тексте есть «tire blowout», но услуга здесь — БУКСИРОВКА, а не замена
     * колеса: клиент прямо пишет, что машину надо было отвезти в Downtown Tampa.
     * Правило «tire change не предлагаем» не нарушено — это слова клиента о своей
     * поломке, а не наша услуга. Править чужой отзыв нельзя в любом случае.
     */
    author: 'Mr. Tsymbal',
    rating: 5,
    text: 'Best towing service! I had a tire blowout while I was in the Brandon area and needed to get my car to Downtown Tampa.\nThe driver arrived quickly, carefully secured my car, and made sure everything was loaded safely before the tow. The whole process was fast and easy. Really appreciate the quick response and reliable service. Definitely recommend ONE TOWING!',
    date: 'August 2026',
    source: 'google',
  },
];

/** Только для предпросмотра вёрстки. Не для продакшена. */
export const DEMO_REVIEWS: Review[] = [
  {
    author: 'Demo review — not a real customer',
    rating: 5,
    text: 'Пример того, как будет выглядеть отзыв из Google: короткий текст, звёзды, имя и дата.',
    date: 'July 2026',
    source: 'google',
  },
];

export const isDemoContent = process.env.NEXT_PUBLIC_DEMO_CONTENT === '1';

export function getReviews(): Review[] {
  if (REVIEWS.length > 0) return REVIEWS;
  return isDemoContent ? DEMO_REVIEWS : [];
}
