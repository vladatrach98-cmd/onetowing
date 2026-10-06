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
    slug: 'tampa-fl',
    city: 'Tampa',
    kicker: 'Service area · Our home base',
    metaTitle: 'Towing in Tampa, FL | 24/7 Tow Truck & Roadside Assistance',
    metaDescription:
      'Towing and roadside assistance in Tampa around the clock — Downtown, South Tampa, West Tampa, Westshore and Ybor City. Our truck is based downtown. Local tow from $95. Call 656-777-2980.',
    intro:
      'Tampa is where our truck lives. We are based on S Morgan Street in Downtown Tampa, a few blocks from the Selmon Expressway and the I-275 ramps, so most of the city sits inside the miles already included in a local tow. Downtown garages, South Tampa side streets, the Westshore office parks, Ybor City after closing time — this is the ground we cover every single night.',
    approach: [
      'From Downtown the Selmon Expressway (SR 618) runs west to South Tampa and Gandy Boulevard, and east toward Brandon. I-275 crosses the city north–south and meets I-4 just north of downtown at the interchange locals still call Malfunction Junction — one of the most common places in the city for a car to give out in traffic.',
      'Kennedy Boulevard (SR 60) carries us west to Westshore and Tampa International Airport; Dale Mabry Highway runs the length of South and West Tampa past Raymond James Stadium; Bayshore Boulevard and Howard Avenue cover South Tampa and Hyde Park.',
      'Most addresses in Tampa are within the 10 miles of driving to you that the base price already includes. What that means in minutes depends on the hour — the Selmon at 5 p.m. and the Selmon at 3 a.m. are different roads — so we do not publish an arrival time. Call and we will tell you where the truck is right now.',
    ],
    roads: [
      { name: 'I-275', note: 'North–south through the city, from the Howard Frankland Bridge past Westshore and downtown to North Tampa.' },
      { name: 'I-4', note: 'East out of downtown toward Ybor City, I-75 and Plant City. Meets I-275 at Malfunction Junction.' },
      { name: 'Selmon Expressway (SR 618)', note: 'South Tampa and Gandy Boulevard to Downtown and on east to Brandon. Elevated in places, with very little shoulder.' },
      { name: 'Dale Mabry Highway', note: 'The long north–south artery through South and West Tampa, past Raymond James Stadium.' },
      { name: 'Kennedy Boulevard (SR 60)', note: 'Downtown to Westshore and the airport, and on to the Courtney Campbell Causeway.' },
      { name: 'Bayshore Boulevard', note: 'Along the water from Downtown through Hyde Park into South Tampa.' },
    ],
    calls: [
      'Cars that will not start on a parking garage level downtown — Water Street, the Channel District, Harbour Island. Usually a jump start; tell us the level when you call.',
      'Breakdowns on I-275 and I-4 around Malfunction Junction, where stopping is genuinely dangerous.',
      'Accident towing on Dale Mabry, Kennedy and Hillsborough Avenue to a body shop or home.',
      'Flat tires in South Tampa and Hyde Park — we put the spare on, or tow the car to a tire shop if there is none.',
      'Cars towed from Westshore and the airport area to a dealership service bay.',
      'Getting you and your car home from Ybor City or downtown late at night, with you riding in the cab.',
    ],
    neighbors:
      'Inside the city we cover Downtown Tampa, Ybor City, South Tampa, Hyde Park, Davis Islands, West Tampa, Tampa Heights, Seminole Heights, Drew Park, Carrollwood and the University Area, and we run straight out to Temple Terrace, Brandon and Riverview.',
    faq: [
      {
        question: 'Where in Tampa is your truck based?',
        answer:
          'Downtown, at 124 S Morgan St. That puts most of Tampa — Downtown, South Tampa, West Tampa, Ybor City, Westshore — within the miles already included in a local tow.',
      },
      {
        question: 'How much does a tow cost in Tampa?',
        answer:
          'A local tow starts at $95. That includes up to 10 miles for us to reach you, loading, and up to 10 miles of towing. Extra miles are $5 each. For most trips inside the city the base price covers the whole run — we confirm the exact figure on the phone before anything moves.',
      },
      {
        question: 'Can you get a car out of a downtown parking garage?',
        answer:
          'Usually yes, and for a dead battery the truck often does not even need to go in — the jump pack does. For a tow, the ceiling height is the limit rather than the car. Tell us the garage and the level when you call and we will say honestly whether the truck fits.',
      },
      {
        question: 'My car broke down at Malfunction Junction. What do I do?',
        answer:
          'Hazards on, stay belted in, and call. If you are blocking a live lane, call 911 as well so traffic can be controlled. Tell us which direction you were heading and the nearest exit — on that interchange, direction matters as much as the road.',
      },
      {
        question: 'Do you tow at night in Tampa?',
        answer:
          'Yes, every night of the year, at the same price as during the day. There is no night, weekend or holiday surcharge.',
      },
    ],
  },

  {
    slug: 'temple-terrace-fl',
    city: 'Temple Terrace',
    kicker: 'Service area',
    metaTitle: 'Tow Truck in Temple Terrace, FL | 24/7 Towing & Roadside Help',
    metaDescription:
      'Towing and roadside assistance in Temple Terrace and the USF area, around the clock. Jump starts, accident towing, local tows from $95. Call 656-777-2980.',
    intro:
      'Temple Terrace sits on the Hillsborough River northeast of Tampa, right next to the University of South Florida. It is a short run up from downtown, and the calls here have their own pattern: student cars that sat too long in an apartment lot, commuters on Fowler Avenue and 56th Street, and breakdowns on I-75 at the Fowler interchange.',
    approach: [
      'From our downtown base we take I-4 east to I-75 north, or head straight up 56th Street. Either way Temple Terrace is roughly 10 miles out, which is within the driving distance a local tow already includes.',
      'On I-75 the main Temple Terrace exit is Exit 265, Fowler Avenue. Fowler runs west past USF and east into Temple Terrace; Busch Boulevard and Temple Terrace Highway cover the southern half of the city.',
      'We do not publish an arrival time — Fowler at rush hour and Fowler at midnight are not the same road. Call and we will tell you where the truck is right now.',
    ],
    roads: [
      { name: 'I-75', note: 'Exit 265 (Fowler Avenue) is the main interchange for Temple Terrace and the USF side of the area.' },
      { name: 'Fowler Avenue (SR 582)', note: 'East–west past USF and into Temple Terrace. Heavy traffic, frequent breakdowns.' },
      { name: '56th Street (SR 583)', note: 'Our direct line north from Tampa into Temple Terrace.' },
      { name: 'Busch Boulevard (SR 580)', note: 'Crosses the southern part of the area, east toward Temple Terrace.' },
      { name: 'Bullard Parkway & Temple Terrace Highway', note: 'Residential streets along the river, where most driveway calls come from.' },
    ],
    calls: [
      'Dead batteries on student cars that have not moved in weeks — a jump start, then a check that the battery holds.',
      'Breakdowns on I-75 around the Fowler Avenue interchange.',
      'Accident towing on Fowler Avenue and 56th Street.',
      'Flat tires in apartment and campus-area lots — your spare put on, or a tow to a tire shop.',
      'Cars that will not start in a Temple Terrace driveway, towed to a mechanic nearby or back into Tampa.',
      'Running out of fuel on I-75, with enough gas brought out to reach the next station.',
    ],
    neighbors:
      'From here we also run to the University Area, Seminole Heights and Tampa Heights, north to Lutz, and back into Downtown Tampa and Ybor City.',
    faq: [
      {
        question: 'Do you cover Temple Terrace and the USF area?',
        answer:
          'Yes, both, at any hour. It is roughly 10 miles from our downtown base, which is within the driving distance a local tow already includes.',
      },
      {
        question: 'My car sat for weeks and now will not start. Do I need a tow?',
        answer:
          'Probably not — a car that sat is usually a flat battery, and a jump start fixes it. We also let it run and check that the battery is actually charging, because a battery that went completely flat often does not hold. If it does not, the truck is already there to tow it to a shop.',
      },
      {
        question: 'How much is a tow from Temple Terrace?',
        answer:
          'A local tow starts at $95, covering the drive out to you and up to 10 miles of towing, then $5 per extra mile. A tow from Temple Terrace to most of Tampa stays close to the base price. You hear the exact figure on the phone first.',
      },
      {
        question: 'Can you take my car from Temple Terrace to a dealership in Tampa?',
        answer:
          'Yes. Give us the dealership and we take it to the service bay — or to the after-hours drop area if they are closed.',
      },
    ],
  },

  {
    slug: 'riverview-fl',
    city: 'Riverview',
    kicker: 'Service area',
    metaTitle: 'Tow Truck in Riverview, FL | 24/7 Towing & Roadside Assistance',
    metaDescription:
      'Towing and roadside assistance in Riverview, FL, around the clock — US-301, I-75, Big Bend Road and Boyette. Jump starts, accident towing, local tows from $95. Call 656-777-2980.',
    intro:
      'Riverview has grown faster than its roads. Subdivisions along Boyette Road, Big Bend Road and Gibsonton Drive empty onto US-301 and I-75 every morning, and that is where most of our Riverview calls come from — cars that quit in commuter traffic, and cars that would not start in the driveway before it.',
    approach: [
      'From Downtown Tampa we take the Selmon Expressway east to I-75 and come south. Riverview is around 14 miles from our base, a little past the 10 miles of driving to you that the base price includes, so a few extra miles at $5 each are usually added — we tell you the exact figure on the phone.',
      'On I-75 we use Exit 250 (Gibsonton Drive) for the western side and Exit 246 (Big Bend Road) for the southern subdivisions. US-301 runs north–south through the middle of Riverview and carries us between them.',
      'What that means in minutes depends heavily on I-75 traffic, so we do not publish an arrival time. Call and we will tell you where the truck is right now.',
    ],
    roads: [
      { name: 'I-75', note: 'Exit 250 (Gibsonton Drive) and Exit 246 (Big Bend Road) are the main Riverview interchanges.' },
      { name: 'US-301', note: 'The main north–south road through Riverview, up to Brandon and the Selmon.' },
      { name: 'Big Bend Road', note: 'East–west across the south end, with most of the newer subdivisions along it.' },
      { name: 'Boyette Road', note: 'Through the eastern residential side of Riverview.' },
      { name: 'Gibsonton Drive', note: 'Links I-75 with US-301 across the west side.' },
    ],
    calls: [
      'Cars that will not start in a subdivision driveway first thing in the morning — often a jump start.',
      'Breakdowns on I-75 between the Big Bend Road and Gibsonton Drive exits.',
      'Accident towing on US-301 and Big Bend Road to a body shop or home.',
      'Flat tires on the way to work — your spare put on at the roadside, or a tow to a tire shop.',
      'Cars towed from Riverview up to a dealership in Brandon or into Tampa.',
      'Running out of fuel on I-75, with enough brought out to reach a station.',
    ],
    neighbors:
      'From Riverview we also run north to Brandon and Palm River, and back up the Selmon into Downtown Tampa and South Tampa.',
    faq: [
      {
        question: 'Do you come out to Riverview at night?',
        answer:
          'Yes, any hour, with no night or weekend surcharge on the base price.',
      },
      {
        question: 'How much does a tow in Riverview cost?',
        answer:
          'A local tow starts at $95, which includes up to 10 miles for us to reach you and up to 10 miles of towing. Riverview is around 14 miles from our downtown base, so a few extra miles at $5 each are usually added to the drive out. You get the whole figure on the phone before anything moves.',
      },
      {
        question: 'Can you tow my car from Riverview to a shop in Brandon or Tampa?',
        answer:
          'Yes, both are common runs. Tell us the shop or dealership and we take it there. If you do not have one in mind, we can suggest one.',
      },
      {
        question: 'My car will not start in the driveway. Do I need a tow?',
        answer:
          'Not necessarily. Rapid clicking or a slow crank is usually the battery, and a jump start fixes that on the spot — from $65. If the engine cranks strongly but never fires, it is not the battery, and that is a tow. Describe the sound when you call and we will tell you which one you need.',
      },
    ],
  },

  {
    slug: 'lutz-fl',
    city: 'Lutz',
    kicker: 'Service area',
    metaTitle: 'Tow Truck in Lutz, FL | 24/7 Towing & Roadside Assistance',
    metaDescription:
      'Towing and roadside assistance in Lutz, FL, around the clock — US-41, Dale Mabry, the Veterans Expressway and Van Dyke Road. Jump starts, accident towing, local tows. Call 656-777-2980.',
    intro:
      'Lutz is the far north end of where we work — wooded lots, lakes and long residential roads where the nearest shop is not around the corner. That changes what people call us for: fewer garage jump starts, more tows on US-41 and Dale Mabry, and cars that have to go a fair distance to reach the mechanic the owner actually trusts.',
    approach: [
      'From Downtown Tampa we head north on I-275 or up Dale Mabry Highway, which runs all the way into Lutz and ends at US-41. The Veterans Expressway covers the west side and Van Dyke Road.',
      'Lutz is around 18 miles from our base, past the 10 miles of driving to you that the base price includes, so expect extra miles at $5 each on the run out. We would rather tell you that up front than have it surprise you — call and you get the whole figure before we set off.',
      'We do not publish an arrival time. Call and we will tell you where the truck is right now.',
    ],
    roads: [
      { name: 'US-41', note: 'The main north–south road through the middle of Lutz.' },
      { name: 'Dale Mabry Highway', note: 'Runs north out of Tampa and ends at US-41 in Lutz — our most direct route up.' },
      { name: 'Veterans Expressway (SR 589)', note: 'Toll road along the west side, with access at Van Dyke Road.' },
      { name: 'I-275', note: 'North out of Tampa toward its junction with I-75 near Lutz and Wesley Chapel.' },
      { name: 'Van Dyke Road & Lutz Lake Fern Road', note: 'East–west roads across the residential north end.' },
    ],
    calls: [
      'Breakdowns on US-41 and Dale Mabry, where traffic moves fast and the shoulders are narrow.',
      'Cars that will not start at home, towed into Tampa to the owner’s own mechanic or dealer.',
      'Accident towing on the Veterans Expressway and Dale Mabry.',
      'Dead batteries in store and church parking lots along US-41 — a jump start from $65.',
      'Flat tires on long residential roads — your spare put on, or a tow to a tire shop.',
      'Running out of fuel between stations, with enough brought out to reach one.',
    ],
    neighbors:
      'From Lutz we also run east to Temple Terrace, south through Carrollwood and the University Area, and back into Tampa.',
    faq: [
      {
        question: 'Do you really come out as far as Lutz?',
        answer:
          'Yes, at any hour. It is around 18 miles from our downtown base, so the drive out costs a little more than in the city — we tell you the full figure on the phone before we set off.',
      },
      {
        question: 'How much does a tow from Lutz cost?',
        answer:
          'A local tow starts at $95, which includes up to 10 miles for us to reach you and up to 10 miles of towing. Lutz is further than 10 miles from our base, so extra miles at $5 each are added on the drive out, and on the tow if the car is going a long way. One phone call gives you the exact number.',
      },
      {
        question: 'Can you tow my car from Lutz to my mechanic in Tampa?',
        answer:
          'Yes, and it is one of the most common reasons people in Lutz call us. Give us the shop and we take it there — or to the after-hours drop area if they are closed.',
      },
      {
        question: 'Is a jump start in Lutz worth it, or should I just get a tow?',
        answer:
          'If it is the battery, a jump start from $65 is much cheaper than a tow, especially this far out. Tell us what happens when you turn the key and we will tell you honestly which one you need.',
      },
    ],
  },

  {
    slug: 'st-petersburg-fl',
    city: 'St. Petersburg',
    kicker: 'Service area · Across the bay',
    metaTitle: 'Tow Truck in St. Petersburg, FL | Towing to Tampa & Roadside Help',
    metaDescription:
      'Towing and roadside assistance in St. Petersburg, FL, around the clock — including tows across the Howard Frankland and Gandy bridges to Tampa. Call 656-777-2980 for the price.',
    intro:
      'We are based in Downtown Tampa, so St. Petersburg means crossing the bay — over the Howard Frankland on I-275 or the Gandy Bridge. A lot of our St. Pete calls are exactly that run in reverse: a car that broke down in Pinellas and has to get back to a shop, a dealer or a driveway in Tampa.',
    approach: [
      'Out of Downtown Tampa we take I-275 west across the Howard Frankland Bridge, or the Selmon Expressway to the Gandy Bridge for the north-east side of St. Pete. I-275 then runs south through the city, with I-375 and I-175 dropping into downtown St. Petersburg.',
      'Downtown St. Pete is a little over 20 miles from our base — well past the 10 miles of driving to you that the base price includes. So a St. Pete call always carries extra miles at $5 each, and we would rather say that plainly here than have it come as a surprise. You get the whole figure on the phone before we set off.',
      'Bridge traffic decides the timing more than anything else, so we do not publish an arrival time. Call and we will tell you where the truck is right now.',
    ],
    roads: [
      { name: 'Howard Frankland Bridge (I-275)', note: 'The main crossing between Tampa and St. Petersburg, and one of the worst places in the region to break down.' },
      { name: 'Gandy Bridge (US-92)', note: 'South Tampa to the north-east side of St. Petersburg.' },
      { name: 'I-275', note: 'South through St. Petersburg, with I-375 and I-175 into downtown.' },
      { name: 'US-19 (34th Street)', note: 'The long north–south commercial road through the west side of the city.' },
      { name: '4th Street North', note: 'North–south from downtown St. Pete up toward Gandy Boulevard.' },
    ],
    calls: [
      'Breakdowns on the Howard Frankland and the Gandy, where there is barely a shoulder — stay in the car, hazards on, and call.',
      'Cars towed from St. Petersburg back across the bay to a shop, dealer or home in Tampa.',
      'Accident towing on I-275 and US-19.',
      'Cars that will not start in downtown St. Pete garages — often a jump start.',
      'Running out of fuel on the bridge approaches, with enough brought out to get across.',
    ],
    neighbors:
      'Across the bay we also cover Clearwater and the Courtney Campbell corridor to the Tampa airport and Westshore, and of course the whole of Tampa on the other side.',
    faq: [
      {
        question: 'Do you tow in St. Petersburg, or only in Tampa?',
        answer:
          'Both. St. Petersburg is across the bay from our downtown Tampa base, and we run there at any hour — the most common job is bringing a car back across to Tampa.',
      },
      {
        question: 'How much does a tow from St. Petersburg to Tampa cost?',
        answer:
          'A tow starts at $95, which includes up to 10 miles for us to reach you and up to 10 miles of towing, with every extra mile at $5. St. Pete is a little over 20 miles from our base, so both the drive out and a tow back to Tampa include extra miles. Call with both addresses and we give you one figure before anything moves.',
      },
      {
        question: 'I broke down on the Howard Frankland Bridge. What should I do?',
        answer:
          'Hazards on immediately, stay in the car with your seatbelt fastened, and call. If you are stopped in a live lane, call 911 too — the bridge needs traffic control, not just a tow truck. Tell us which direction you were heading.',
      },
      {
        question: 'Can you take my car to a specific dealer in Tampa?',
        answer:
          'Yes. Tell us the dealership or shop and that is where it goes, including the after-hours drop area if they are closed.',
      },
    ],
  },

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
      'Dead batteries and flat tires in the mall and plaza parking off Brandon Blvd and Town Center Boulevard.',
      'Cars that will not start in driveways across Brandon’s subdivisions — often a jump start, sometimes a tow.',
      'Accident towing on I-75 around the Exit 257 interchange.',
      'Vehicles moved to a repair shop or dealership in Brandon, or hauled back into Tampa.',
      'Cars that will not roll — seized brakes or a locked steering column — loaded onto dollies.',
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
