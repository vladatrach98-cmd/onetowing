/**
 * СТРАНИЦЫ РАЙОНОВ — содержимое.
 *
 * ⚠️ ГЛАВНОЕ ПРАВИЛО, из-за которого этот файл выглядит именно так.
 *
 * Google наказывает «doorway pages» — страницы под каждый город, где меняется
 * только название, а текст один и тот же. Наказание прилетает не отдельной
 * странице, а всему сайту. Сайты эвакуаторов заражены этим поголовно.
 *
 * Поэтому здесь НЕТ шаблона, из которого текст собирается подстановкой города.
 * Каждый абзац написан руками под конкретное место: свои дороги, свои съезды,
 * свои типичные вызовы. Одинаковыми у страниц остаются только шапка, подвал и
 * цены — это оформление и факты, а не содержание.
 *
 * Добавляешь район — пишешь ему настоящий текст. Не можешь написать про место
 * ничего, чего нет на главной, — значит, страница ему не нужна.
 *
 * ⚠️ Время подачи не обещаем нигде. Вместо числа — «позвоните, скажем, где
 * машина сейчас». Конкретные минуты превращаются в отзыв на одну звезду
 * в первый же час пик.
 *
 * ⚠️ Упоминать в `neighbors` можно только районы из SERVICE_AREAS. Если сайт
 * заявляет зону шире, чем карточка в Картах, Google считает данные неточными.
 */

export type AreaRoad = { name: string; note: string };
export type AreaFaq = { question: string; answer: string };

export type ServiceArea = {
  slug: string;
  /** Город/район так, как его пишут местные. Идёт в заголовок и в разметку. */
  city: string;
  /** Короткая подпись над заголовком. */
  kicker: string;
  metaTitle: string;
  metaDescription: string;
  /** Вводный абзац под H1. */
  intro: string;
  /** Как доезжаем: маршрут от базы. Абзацами. */
  approach: string[];
  roads: AreaRoad[];
  /** С чем реально сюда вызывают. */
  calls: string[];
  /** Соседние районы — только из SERVICE_AREAS. */
  neighbors: string;
  faq: AreaFaq[];
};

export const SERVICE_AREA_PAGES: ServiceArea[] = [
  {
    slug: 'brandon-fl',
    city: 'Brandon',
    kicker: 'Service area',
    metaTitle: 'Tow Truck in Brandon, FL | 24/7 Towing & Roadside Assistance',
    metaDescription:
      'Towing and roadside assistance in Brandon, FL, around the clock. Local tow from $95. We run the Selmon Expressway out of downtown Tampa straight to the I-75 interchange. Call 656-777-2980.',
    intro:
      'Brandon sits at the eastern end of the Lee Roy Selmon Expressway — the same road our trucks take out of downtown Tampa, where we are based on S Morgan Street. It runs east with no city stoplights and ends at the I-75 interchange in Brandon. That is why Brandon is one of the first places outside the city core we cover, and why we are here at three in the morning as readily as at noon.',
    approach: [
      'Out of our downtown base the Selmon Expressway (SR 618) heads east and ends at a direct interchange with I-75 in Brandon. The express lanes carry on to Brandon Parkway (SR 628) at Town Center Boulevard, which feeds the middle of Brandon.',
      'Coming off I-75 we use Exit 257 — SR-60 / Brandon Blvd — the main street through Brandon and the way east toward Valrico. Most of the shopping plazas people call us from sit along it.',
      'Brandon is roughly 13 miles east of downtown Tampa. What that means in minutes changes enormously between the evening commute and an empty highway at 3 a.m., so we do not publish an arrival time. Call us and we will tell you where the truck actually is right now.',
    ],
    roads: [
      {
        name: 'I-75',
        note: 'Exit 257 (SR-60 / Brandon Blvd) is the main Brandon interchange. I-75 is also how we run south toward Riverview.',
      },
      {
        name: 'Lee Roy Selmon Expressway (SR 618)',
        note: 'Our direct line from downtown Tampa. It ends at I-75 here in Brandon.',
      },
      {
        name: 'Brandon Parkway (SR 628)',
        note: 'Picks up from the Selmon express lanes at Town Center Boulevard.',
      },
      {
        name: 'SR-60 / Brandon Blvd',
        note: 'The main east–west street through Brandon and on toward Valrico.',
      },
      {
        name: 'US-301',
        note: 'Runs north–south along the west side of Brandon, toward Riverview and back into Tampa.',
      },
    ],
    calls: [
      'Cars that quit in commuter traffic on the Selmon and on Brandon Blvd, morning and evening.',
      'Dead batteries and keys locked inside in the mall and plaza parking off Brandon Blvd and Town Center Boulevard.',
      'Cars that will not start in driveways across Brandon’s subdivisions — often a jump start, sometimes a tow.',
      'Accident recovery on I-75 around the Exit 257 interchange.',
      'Vehicles moved to a repair shop or dealership in Brandon, or hauled back into Tampa.',
      'Cars that will not roll — seized brakes, a missing key, a locked steering column — loaded onto dollies.',
    ],
    neighbors:
      'From this side of town we also run to Riverview and Palm River, and back west into Ybor City, Downtown Tampa and South Tampa.',
    faq: [
      {
        question: 'Do you cover Brandon 24 hours a day?',
        answer:
          'Yes. We answer the phone and send trucks to Brandon at any hour, including weekends and holidays. There is no night or holiday surcharge on the base price.',
      },
      {
        question: 'How fast can you get to Brandon?',
        answer:
          'It depends on where in Brandon you are and what the Selmon and I-75 look like at that moment, so we will not give you a number over the internet that we might not keep. Call us and we will tell you where the nearest truck is and what it looks like from there.',
      },
      {
        question: 'How much does a tow in Brandon cost?',
        answer:
          'A local tow starts at $95, which covers driving to you and towing the car a set distance. Beyond that it is a flat rate per extra mile, and longer runs move to a cheaper per-mile rate. The exact figure depends on where you are and where the car is going — we give it to you on the phone before anything moves, not after.',
      },
      {
        question: 'Can you tow my car from Brandon to a shop in Tampa?',
        answer:
          'Yes, that is one of our most common runs. Tell us the shop or dealership and we take it there. If you do not have one in mind, we can suggest a place.',
      },
      {
        question: 'My car will not start in a parking lot. Do I need a tow?',
        answer:
          'Often not. If it is the battery we can jump it on the spot and check the car keeps running, which is cheaper than a tow. If it will not hold, the truck is already there and we load it.',
      },
    ],
  },
];

export function findServiceArea(slug: string) {
  return SERVICE_AREA_PAGES.find((area) => area.slug === slug);
}

/**
 * Район из SERVICE_AREAS → адрес его страницы, если она уже написана.
 * Нужна, чтобы плитки районов на главной становились ссылками по мере
 * появления страниц, а не превращались в ссылки-обещания на 404.
 */
export function serviceAreaHref(city: string) {
  const area = SERVICE_AREA_PAGES.find((page) => page.city === city);
  return area ? `/service-areas/${area.slug}` : null;
}
