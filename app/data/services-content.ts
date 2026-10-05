/**
 * СТРАНИЦЫ УСЛУГ — содержимое.
 *
 * ⚠️ ГЛАВНОЕ ПРАВИЛО, из-за которого файл выглядит именно так.
 *
 * Здесь НЕТ шаблона, в который подставляется название услуги. Каждый абзац
 * написан руками под конкретную работу: свои ситуации, свои шаги, своя цена,
 * свои вопросы. Страницы услуг, отличающиеся только словом в заголовке, Google
 * считает такими же doorway-страницами, как и города-клоны, и наказывает за них
 * весь сайт целиком.
 *
 * Проверка простая: если абзац можно без правок перенести на другую услугу —
 * значит он пустой и его надо переписать или выбросить.
 *
 * ⚠️ ЧЕГО ЗДЕСЬ НЕ ДОЛЖНО БЫТЬ НИКОГДА:
 *   — времени подачи. Вместо минут — «позвоните, скажем, где машина сейчас»;
 *   — слов «licensed & insured»: сертификат пока на другом юрлице;
 *   — ремонта и продажи шин. Колесо меняем ТОЛЬКО на запаску клиента (если она
 *     есть и цела). Нет запаски или разбит диск — буксируем в шиномонтаж;
 *   — цифр в дорожной помощи, кроме прикуривания («from $65», берётся из
 *     PRICING.jumpStartFrom). Топливо и запаска — «call for price»;
 *   — слова «flatbed» как нашей услуги: платформы нет, есть wheel-lift + тележки;
 *   — мотоциклов, эвакуации без согласия владельца, repo, impound, private
 *     property — ничего этого не продвигаем, даже в виде «мы этого не делаем»;
 *   — lockout на рекламных страницах. Страница lockout-service живёт только для
 *     органики (`adsExcluded`), на неё не ссылаются основные страницы услуг.
 *     Там не писать «unlock», «we open cars», «locksmith» — Google Ads требует
 *     для этого Advanced Verification.
 *
 * ⚠️ Услуга «трезвый водитель» описана ТОЛЬКО как буксировка: клиент едет в
 * кабине, машина на эвакуаторе. Вариант «наш человек за рулём вашей машины»
 * сюда не добавлять — страховка эвакуатора этого не покрывает.
 */

import { PRICING } from '../lib/constants';

export type ServiceFaq = { question: string; answer: string };

/**
 * Как показывается цена услуги:
 *   tow            — «Local tow from $95»
 *   jump-start     — «Jump start from $65» (или call for price, если цена не задана)
 *   roadside       — «Call for price»
 *   roadside-mixed — страница дорожной помощи: прикуривание с ценой, остальное по звонку
 */
export type ServicePriceKind = 'tow' | 'jump-start' | 'roadside' | 'roadside-mixed';

const JUMP_START_PHRASE = PRICING.jumpStartFrom
  ? `jump starts from $${PRICING.jumpStartFrom}`
  : 'jump starts';
const JUMP_START_SENTENCE = PRICING.jumpStartFrom
  ? `From $${PRICING.jumpStartFrom}, 24/7.`
  : 'Around the clock — call for price.';

/**
 * Фото с работы на странице услуги.
 *
 * `alt` — то, по чему Google понимает, что на снимке, и то, что читают вслух
 * незрячим. Описывать надо ЧЕСТНО и конкретно: «ONE TOWING wrecker loading a
 * sedan on Water Street», а не «tow truck». Врать здесь нельзя — за подписи,
 * не совпадающие с картинкой, Google выкидывает из поиска по изображениям.
 *
 * `width`/`height` — настоящие размеры файла. Нужны, чтобы страница не
 * подпрыгивала при загрузке: браузер заранее резервирует место под кадр.
 */
export type ServicePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ServicePage = {
  slug: string;
  /** Короткая подпись над заголовком. */
  kicker: string;
  /** Название в меню, в оглавлении и в хлебных крошках. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Вводный абзац под H1. */
  intro: string;
  /** Одна строка для плитки в оглавлении /services. */
  cardLine: string;
  /** «Какие машины возим» — с конкретными марками: их и ищут в поиске. */
  vehiclesTitle?: string;
  vehicles?: string[];
  situationsTitle: string;
  situations: string[];
  stepsTitle: string;
  steps: string[];
  /** Как считается цена именно за эту работу. Абзацами. */
  pricing: string[];
  faq: ServiceFaq[];
  /** Фото с работы. Нет фото — блок не рисуется, пустой рамки не остаётся. */
  photos?: ServicePhoto[];
  /** Слаги соседних услуг — внутренняя перелинковка. */
  related: string[];
  price: ServicePriceKind;
  /**
   * Одна из пяти главных посадочных страниц (Towing, Roadside, Jump Start,
   * Fuel, Accident). Под них идёт реклама, они ссылаются друг на друга.
   */
  core?: boolean;
  /**
   * Страница только для органики: не показывается в блоках основных услуг,
   * на главной и в разметке бизнеса, не используется в рекламе. Сейчас это
   * lockout — Google Ads требует для него Advanced Verification.
   */
  adsExcluded?: boolean;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'towing',
    kicker: 'Towing',
    name: 'Towing',
    core: true,
    price: 'tow',
    metaTitle: 'Towing in Tampa, FL | 24/7 Local, Accident & Roadside Towing | ONE TOWING',
    metaDescription:
      `24/7 towing across Tampa Bay — local towing, accident towing and roadside breakdowns. Cars, SUVs, vans and pickups. Local tow from $${PRICING.baseFee}. Call 656-777-2980.`,
    h1: 'Towing in Tampa, 24/7',
    intro:
      `Local towing, accident towing and roadside breakdowns across Tampa Bay, at any hour. A local tow starts at $${PRICING.baseFee}, and you hear the whole price on the phone before anything moves. Our 2022 RAM 4500 carries a wheel-lift and a full set of dollies, so a car that will not start, roll or steer still ends up on the truck.`,
    cardLine: `Local, accident and roadside towing — from $${PRICING.baseFee}, around the clock.`,
    vehiclesTitle: 'Vehicles we tow',
    vehicles: [
      'Sedans and coupes — Toyota Camry, Honda Accord, Nissan Altima, Hyundai Sonata and everything alongside them.',
      'SUVs and crossovers — RAV4, CR-V, Explorer, Highlander, Tahoe, Grand Cherokee.',
      'Minivans and passenger vans — Odyssey, Sienna, Pacifica, Transit.',
      'Half-ton pickups — F-150, Silverado 1500, RAM 1500, Tacoma, Ranger.',
      'All-wheel drive — Subaru, Audi quattro, 4Motion and the rest, with dollies so nothing turns through the drivetrain.',
      'Electric and hybrid — Tesla Model 3 and Model Y, Mustang Mach-E, Ioniq, Prius, all four wheels off the ground.',
    ],
    situationsTitle: 'What we tow',
    situations: [
      'Local towing — a car that has to reach a repair shop, a dealership service bay or your own driveway anywhere around Tampa Bay.',
      'Accident towing — a car that cannot be driven after a collision, taken where you choose.',
      'Roadside towing — a breakdown on I-275, I-4, I-75, the Selmon Expressway or one of the bridges, day or night.',
      'A car that will not start or will not drive — engine, gearbox, overheating.',
      'All-wheel drive and electric cars — dollies under the second axle, so all four wheels are off the ground.',
      'Seized brakes or a locked steering column, so the wheels will not turn at all.',
      'Long runs across Florida at a reduced per-mile rate.',
    ],
    stepsTitle: 'How a towing call goes',
    steps: [
      'You call and tell us the make, roughly where you are, where the car should go, and whether it rolls and steers.',
      'We give you the price on the phone before anything moves.',
      'The truck comes out and the driver looks at how the car sits — kerb, slope, tight garage, all of it changes the approach.',
      'Wheel-lift for most cars, dollies under the remaining wheels when the car will not roll or is all-wheel drive.',
      'The car is secured and taken where you said: your mechanic, a dealer, a body shop or home.',
    ],
    pricing: [
      `A local tow starts at $${PRICING.baseFee}. That includes up to ${PRICING.includedApproachMiles} miles for us to reach you, standard loading, and up to ${PRICING.includedTowMiles} miles of towing.`,
      `Every mile past the included ones is $${PRICING.extraMileRate}. Long runs drop to $${PRICING.longDistanceMileRate} a mile automatically, as soon as that works out cheaper for you.`,
      'No night, weekend or holiday surcharge. You hear the whole figure before the car is loaded, not after.',
    ],
    faq: [
      {
        question: 'How much does a tow cost in Tampa?',
        answer: `A local tow starts at $${PRICING.baseFee}. That covers driving out to you, loading, and towing the car up to ${PRICING.includedTowMiles} miles. Past that it is $${PRICING.extraMileRate} per extra mile, and long runs move to $${PRICING.longDistanceMileRate} per mile. We give you the exact figure on the phone before anything moves.`,
      },
      {
        question: 'Do you have a flatbed?',
        answer:
          'No, and we would rather say so up front. We run a wheel-lift truck with a full set of dollies. For most cars that is all it takes, and for all-wheel-drive and electric cars the dollies go under the second axle so all four wheels are off the ground — which is usually the reason people ask for a flatbed in the first place. If your car genuinely needs a flatbed, we will tell you on the phone.',
      },
      {
        question: 'Can you tow an all-wheel-drive car or a Tesla?',
        answer:
          'Yes. An all-wheel-drive or electric car should not be dragged on two wheels. Our wheel-lift takes one axle and dollies take the other, so all four wheels are up — the method the manufacturers name themselves.',
      },
      {
        question: 'My car will not roll at all. Can you still take it?',
        answer:
          'Yes. Seized brakes, a locked steering column, a parking brake that will not release — the wheels that will not turn go up on dollies. Tell us on the phone so the right gear is on the truck when it arrives.',
      },
      {
        question: 'Where can you take my car?',
        answer:
          'Wherever you tell us — your mechanic, a dealership, a body shop or your driveway. We have no storage yard of our own, so we have no reason to steer you anywhere.',
      },
      {
        question: 'Who can call you for a tow?',
        answer:
          'The owner of the car, or the person driving it. We work for the driver: you call us, you decide where the car goes, and you hear the price before we start.',
      },
    ],
    photos: [
      {
        src: '/images/services/one-towing-local-tow-tampa.jpg',
        alt: 'ONE TOWING wrecker on a local tow call in Tampa, Florida',
        width: 1280,
        height: 960,
        caption: 'A local tow in Tampa — the everyday half of the job.',
      },
      {
        src: '/images/services/one-towing-dollies-locked-wheels-tampa.jpg',
        alt: 'Car loaded on dollies behind the ONE TOWING wrecker in Tampa, wheels off the ground',
        width: 1069,
        height: 1280,
        caption: 'Wheels that will not turn go up on dollies — nothing drags.',
      },
    ],
    related: ['emergency-towing', 'wont-start-towing', 'long-distance-towing'],
  },

  {
    slug: 'roadside-assistance',
    kicker: 'Roadside',
    name: 'Roadside Assistance',
    core: true,
    price: 'roadside-mixed',
    metaTitle: 'Roadside Assistance in Tampa, FL | Jump Start, Fuel, Flat Tire 24/7 | ONE TOWING',
    metaDescription: `24/7 roadside assistance across Tampa Bay — ${JUMP_START_PHRASE}, fuel delivery, spare tire changes and roadside help. Often cheaper than a tow. Call 656-777-2980.`,
    h1: 'Roadside assistance in Tampa, 24/7',
    intro:
      'A good share of the calls we get do not need a tow truck at all, and we would rather tell you that on the phone than load your car and charge you for it. A dead battery, an empty tank, a flat with a good spare in the trunk — we fix those where the car stands, at any hour, anywhere around Tampa Bay.',
    cardLine: 'Jump start, fuel or a spare tire — fixed where the car stands.',
    situationsTitle: 'What we do on the roadside',
    situations: [
      `Jump start — a dead battery boosted, then watched to see whether it actually holds. ${JUMP_START_SENTENCE}`,
      'Fuel delivery — enough gasoline or diesel brought to you to reach the nearest station.',
      'Flat tire — we put your spare on, if the car has a usable one.',
      'Roadside help — a car stalled on a shoulder, a ramp or in a parking lot. If it cannot be fixed on the spot, the truck is already there to tow it.',
      'And what we do not do: mechanical repairs, tire repairs, or selling tires and batteries. Those go to a shop, and we can take the car there.',
    ],
    stepsTitle: 'How we work out what you need',
    steps: [
      'You describe what happened. For a car that will not start, the sound it makes when you turn the key tells us most of it.',
      'We say plainly whether this is a roadside job or a tow. Roadside is cheaper, and steering you to the expensive one would be a bad way to keep a customer.',
      'You get the price for whichever it is, before anyone sets off.',
      'The driver comes out and does the work at the car.',
      'If the roadside fix does not hold — a battery that will not keep charge, for instance — the truck is already there, and we tell you the tow price before loading.',
    ],
    pricing: [
      PRICING.jumpStartFrom
        ? `A jump start starts at $${PRICING.jumpStartFrom}. Fuel delivery and spare tire changes are quoted on the call, because what they take depends on where the car is and what it needs.`
        : 'Roadside work is quoted on the call — call for price. What it takes depends on where the car is and what it needs.',
      'The price you hear on the phone is the price you pay. It does not change when the driver sees the car.',
      `If the car has to be towed after all, a local tow starts at $${PRICING.baseFee} — and you hear that figure before anything is loaded.`,
    ],
    faq: [
      {
        question: 'What exactly do you do on the roadside?',
        answer:
          'Jump starts, fuel delivery and putting on your spare tire. We keep the list short on purpose — those are the jobs that can be done properly at the side of a road. Anything else goes to a shop, and we can tow it there.',
      },
      {
        question: 'How much is roadside assistance?',
        answer: PRICING.jumpStartFrom
          ? `A jump start starts at $${PRICING.jumpStartFrom}. Fuel delivery and spare tire changes are quoted on the call. Either way you get the figure before the driver sets off.`
          : 'Roadside work is quoted on the call. You get the figure before the driver sets off, and it does not change on arrival.',
      },
      {
        question: 'Do you change tires?',
        answer:
          `We put your own spare on, if the car has a usable one. We do not repair, sell or mount tires. If there is no spare, or the wheel itself is damaged, we tow the car to a tire shop — a local tow starts at $${PRICING.baseFee}.`,
      },
      {
        question: 'What if the roadside fix does not work?',
        answer:
          'Then the truck is already with you and we load the car. You hear the tow price at that point, before anything moves, not on the invoice afterwards.',
      },
      {
        question: 'Where do you provide roadside assistance?',
        answer:
          'Across Tampa Bay — Tampa, Brandon, Riverview, Temple Terrace, Lutz, Oldsmar, St. Petersburg and Clearwater, plus the interstates and the bridges between them. Call with where you are and we will tell you straight away.',
      },
    ],
    photos: [
      {
        src: '/images/services/one-towing-roadside-assistance-tampa.jpg',
        alt: 'ONE TOWING truck on a roadside assistance call in Tampa, Florida',
        width: 1280,
        height: 960,
        caption: 'Most roadside calls end without the car ever going on the truck.',
      },
    ],
    related: ['flat-tire-towing', 'emergency-towing', 'wont-start-towing'],
  },

  {
    slug: 'jump-start',
    kicker: 'Roadside',
    name: 'Jump Start',
    core: true,
    price: 'jump-start',
    metaTitle: `Mobile Jump Start in Tampa, FL | ${PRICING.jumpStartFrom ? `From $${PRICING.jumpStartFrom}, ` : ''}24/7 | ONE TOWING`,
    metaDescription: `Dead battery in Tampa Bay? Mobile jump start service — we come to the car, boost it and check that it holds. ${JUMP_START_SENTENCE} Call 656-777-2980.`,
    h1: 'Mobile jump start in Tampa',
    intro:
      'Dead battery? This is a mobile roadside service: we drive to the car — your driveway, a parking garage, an office lot or a highway shoulder — boost it with a professional jump pack, and stay long enough to see whether it holds. No second car, no cables, no flagging down strangers at eleven at night.',
    cardLine: 'Dead battery boosted where the car stands — and checked that it holds.',
    situationsTitle: 'Signs it really is the battery',
    situations: [
      'Rapid clicking when you turn the key, and nothing else happens.',
      'Dashboard lights come on but the engine will not crank.',
      'Completely dead — no lights, no sound, no dome light.',
      'The engine turns over slowly, like it is tired, and never catches.',
      'You left the headlights, the dome light or a door ajar overnight.',
      'The battery is over three years old and has been slow to start for a while.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us where the car is, what it is, and exactly what happens when you turn the key.',
      'We come out to you with the jump pack. No need for you to find cables or a second car.',
      'The driver connects, you crank it, and in most cases it fires within seconds.',
      'We let it idle and watch whether the alternator is actually charging. This is the part people skip, and it is why a car jumped by a passer-by dies again two blocks later.',
      'If it holds, you drive away. If it does not, the truck is already there and we can tow it.',
    ],
    pricing: [
      PRICING.jumpStartFrom
        ? `A jump start starts at $${PRICING.jumpStartFrom}. That covers coming out to you and the boost.`
        : 'A jump start is quoted on the call — call for price. It covers coming out to you and the boost.',
      'You get the figure before the driver sets off, and it does not change on arrival.',
      `If the battery will not hold and the car has to be towed instead, a local tow starts at $${PRICING.baseFee} — and we tell you the price before loading.`,
    ],
    faq: [
      {
        question: 'How much is a jump start?',
        answer: PRICING.jumpStartFrom
          ? `A jump start starts at $${PRICING.jumpStartFrom}, around the clock, with no night or weekend surcharge. We confirm the exact figure on the phone before the driver sets off.`
          : 'It is quoted on the call, with no night or weekend surcharge. You hear the figure before the driver sets off.',
      },
      {
        question: 'Where do you come out to?',
        answer:
          'Anywhere the car is — driveways, parking garages, office and store lots, and highway shoulders across Tampa, Brandon, Riverview, Temple Terrace, Lutz, Oldsmar, St. Petersburg and Clearwater.',
      },
      {
        question: 'What if the engine cranks fast but still will not start?',
        answer:
          'Then it is probably not the battery — fuel, spark or the starter are more likely. Describe what you hear when you call. If a boost is not going to fix it, we would rather say so on the phone than charge you to find out.',
      },
      {
        question: 'Will a jump start damage my car?',
        answer:
          'Done properly, no. We use a jump pack rather than another vehicle, which keeps the voltage controlled and avoids the surges that come from a bad cable connection.',
      },
      {
        question: 'Do you sell and fit batteries?',
        answer:
          'No. We get you started so you can drive to a shop, or we tow you to one. We do not carry batteries to sell.',
      },
      {
        question: 'It started, then died again the next morning. What now?',
        answer:
          'That usually means the battery is no longer holding charge, or the alternator is not replacing it. At that point another jump just buys you one more day — the car needs a shop, and we can take it there.',
      },
    ],
    related: ['wont-start-towing', 'flat-tire-towing', 'emergency-towing'],
  },

  {
    slug: 'fuel-delivery',
    kicker: 'Roadside',
    name: 'Fuel Delivery',
    core: true,
    price: 'roadside',
    metaTitle: 'Fuel Delivery in Tampa, FL | Out of Gas? 24/7 Roadside | ONE TOWING',
    metaDescription:
      'Out of gas in Tampa? We bring gasoline or diesel to the car — enough to reach the nearest station. Around the clock on I-275, I-4 and I-75. Call 656-777-2980.',
    h1: 'Fuel delivery in Tampa — out of gas, we bring it to you',
    intro:
      'Running dry on the Selmon or halfway across the Howard Frankland is not a moment to go looking for a gas can. We bring enough fuel to get the car to the nearest station under its own power. On a bridge or an interstate shoulder, staying in the car and calling is also the safest thing you can do.',
    cardLine: 'Gasoline or diesel brought to the car — enough to reach a station.',
    situationsTitle: 'When this is the right call',
    situations: [
      'The gauge sat on empty a little too long and the engine cut out.',
      'You are stopped on an interstate shoulder or a bridge, where walking is genuinely dangerous.',
      'A diesel truck run dry — say so when you call, diesel and gasoline are not interchangeable.',
      'The fuel gauge is broken and lied to you.',
      'You are somewhere with no station within sensible walking distance, which in this county is most places.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us the location, whether it takes gasoline or diesel, and which side of the road you are on.',
      'Stay in the vehicle with your seatbelt fastened and the hazards on if you are on a highway. Standing beside a car on I-275 is far more dangerous than sitting inside it.',
      'We arrive with fuel and put in enough to get you moving.',
      'You start the car and drive to the nearest station to fill up properly.',
    ],
    pricing: [
      'Quoted on the call — call for price. The figure covers coming out to you and the fuel itself.',
      'We deliver enough to reach a station, not a full tank. Filling up at the pump costs you less than having it carried to you.',
      'If a diesel has run completely dry and needs priming before it will start, we will tell you on the phone that it may need a shop instead.',
    ],
    faq: [
      {
        question: 'How much fuel do you bring?',
        answer:
          'Enough to comfortably reach the nearest station and fill up properly there. Carrying a full tank to you would be slow and would cost you more than the pump.',
      },
      {
        question: 'Do you carry diesel?',
        answer:
          'Yes, but tell us on the phone. Putting the wrong fuel in a modern diesel is an expensive repair, so we confirm it twice before pouring anything.',
      },
      {
        question: 'I am on the interstate. What should I do while I wait?',
        answer:
          'Stay in the car, seatbelt on, hazards blinking, doors locked. If you can, tell us the nearest exit number or mile marker — it is the fastest way for the driver to find you.',
      },
      {
        question: 'I put the wrong fuel in. Can you fix that?',
        answer:
          'Not on the roadside, and you should not start the engine. That car needs its tank drained at a shop. We can tow it there, which is much cheaper than what running the engine would cost you.',
      },
    ],
    photos: [
      {
        src: '/images/services/one-towing-fuel-delivery-tampa.jpg',
        alt: 'ONE TOWING truck delivering fuel to a stranded car in Tampa, Florida',
        width: 1280,
        height: 960,
        caption: 'Enough fuel to reach the nearest station under your own power.',
      },
    ],
    related: ['emergency-towing', 'flat-tire-towing', 'wont-start-towing'],
  },

  {
    slug: 'accident-towing',
    kicker: 'Towing',
    name: 'Accident Towing',
    core: true,
    price: 'tow',
    metaTitle: 'Accident Towing in Tampa, FL | 24/7 After a Collision | ONE TOWING',
    metaDescription: `Accident towing across Tampa Bay, day or night. We load damaged vehicles carefully and take them to a body shop, a dealership or your home — where you say. From $${PRICING.baseFee}. Call 656-777-2980.`,
    h1: 'Accident towing in Tampa',
    intro:
      'After a crash nobody is thinking clearly, and that is exactly when people get talked into decisions they regret. The most important thing to know is this: it is your car, and you say where it goes. We load it carefully and take it to the body shop, dealer or driveway you choose — at any hour.',
    cardLine: 'Damaged vehicles loaded carefully and taken where you choose.',
    situationsTitle: 'What we handle here',
    situations: [
      'A car that cannot be driven after a collision, whether or not it looks bad from outside.',
      'Vehicles with flat or destroyed tires, bent wheels or a broken suspension — dollies handle what will not roll.',
      'Cars that need to reach a specific body shop your insurer has already approved.',
      'A vehicle to be taken home and parked while you work out the claim.',
      'Debris around the car cleared so the vehicle can be lifted without dragging anything across the road.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'People first. If anyone is hurt, call 911 before you call us.',
      'If the cars are drivable and in traffic, Florida law wants them moved out of the lane. If they are not, stay belted in with the hazards on.',
      'Photograph everything before the car is moved — all sides, the other vehicle, the position on the road, the plates. Once it is on the truck, that evidence is gone.',
      'Call us and tell us where the car should go. If you do not know yet, home is a fine answer and costs you nothing in storage.',
      'We load it carefully, taking account of damage, and take it there.',
    ],
    pricing: [
      `An accident tow is priced like any other local tow: from $${PRICING.baseFee}, covering the run out to you and up to ${PRICING.includedTowMiles} miles of towing, then $${PRICING.extraMileRate} per extra mile.`,
      'We do not have a storage yard, so there is no storage clock ticking and no daily fee to get your car back.',
      'Insurance often reimburses towing after a collision. Keep the receipt we give you and send it with your claim.',
    ],
    faq: [
      {
        question: 'Do I have to use the tow truck that turns up at the scene?',
        answer:
          'No. It is your vehicle and your choice, always. A truck arriving uninvited at a crash does not have any right to your car, and you are free to call someone else.',
      },
      {
        question: 'Where will my car end up?',
        answer:
          'Wherever you tell us — a body shop, a dealership, your driveway. We do not have a yard of our own, so we have no reason to steer you anywhere.',
      },
      {
        question: 'How much does accident towing cost?',
        answer: `The same as any local tow: from $${PRICING.baseFee}, then $${PRICING.extraMileRate} per mile past the included distance. No night, weekend or holiday surcharge. You hear the figure on the phone before the car is loaded.`,
      },
      {
        question: 'The wheels are bent and it will not roll. Is that a problem?',
        answer:
          'No. That is what dollies are for. Tell us what is damaged when you call so the driver brings the right equipment.',
      },
      {
        question: 'Will my insurance pay for this?',
        answer:
          'Very often it does, depending on your policy. We give you a receipt with everything itemised on it so you have what the claim needs.',
      },
    ],
    related: ['emergency-towing', 'tow-to-repair-shop', 'wont-start-towing'],
  },

  {
    slug: 'emergency-towing',
    kicker: 'Towing',
    name: 'Emergency Towing',
    price: 'tow',
    metaTitle: 'Emergency Towing in Tampa, FL | 24/7 Highway Breakdowns | ONE TOWING',
    metaDescription:
      'Emergency towing in Tampa, day or night. Broken down on I-275, I-4, the Selmon or a bridge? Stay in the car and call 656-777-2980. No night or weekend surcharge.',
    h1: 'Emergency towing, day or night',
    intro:
      'A car that dies in your own driveway is an inconvenience. A car that dies in the second lane of I-275 at eleven at night is something else, and it is worth knowing what to do in the first sixty seconds. Most of what follows is about keeping you safe while the truck is on its way, because that part is on you and it matters more than anything we do afterwards.',
    cardLine: 'Breakdowns on the highway, at night, in the rain — any hour.',
    situationsTitle: 'Where emergencies actually happen',
    situations: [
      'On the shoulder of I-275, I-4 or I-75, where traffic is passing a metre away at seventy.',
      'On a bridge — the Howard Frankland, the Gandy, the Courtney Campbell — where there is barely a shoulder at all.',
      'On the Selmon Expressway, elevated, with nowhere to walk to.',
      'Stopped in a live lane after a breakdown or a collision, which is the most dangerous of all.',
      'In an intersection or a turn lane where you are blocking traffic.',
      'At night or in heavy rain, when other drivers will see you late.',
      'In an empty lot or a garage after everything has closed, where the danger is different but you still should not be walking.',
    ],
    stepsTitle: 'What to do while you wait',
    steps: [
      'Hazard lights on immediately, before anything else. That is what makes you visible and, in Florida, what puts the law on your side.',
      'If the car still moves, get it off the roadway and as far onto the shoulder as you can, ideally past the white line and beyond a guardrail gap.',
      'Stay in the car with your seatbelt fastened. People assume standing outside is safer. On a Florida interstate the opposite is true — the car is a steel shell and the shoulder is not.',
      'If you must get out, leave by the passenger side, away from traffic, and stand well behind the guardrail rather than beside the car.',
      'Call and give us the road, the direction of travel and the nearest exit number or mile marker. Direction matters as much as the road — the wrong side of a divided highway is a long way round.',
      'Anyone hurt: 911 first, us second.',
    ],
    pricing: [
      'An emergency tow costs the same as any other local tow. From $95 for the run out plus a set towing distance, then a flat rate per extra mile.',
      'There is no night surcharge, no weekend surcharge and no holiday surcharge. Three in the morning on New Year’s Day is priced like two in the afternoon on a Tuesday.',
      'You get the figure on the phone before the truck sets off, which is the point at which you can still say no.',
    ],
    faq: [
      {
        question: 'Should I get out of the car and stand behind it?',
        answer:
          'On a highway, no. Stay belted in with the hazards on. The most dangerous place on an interstate shoulder is standing next to a stopped car. If you have to get out, use the passenger door and get well behind a barrier.',
      },
      {
        question: 'Does the law protect me while I am stopped?',
        answer:
          'It does, and more than people realise. Florida’s Move Over law now covers any vehicle stopped on the roadside with hazard lights flashing — not just police and tow trucks. Drivers must change lanes, or slow to 20 mph under the limit if they cannot. Your hazard lights are what triggers that protection, so put them on straight away.',
      },
      {
        question: 'Do you charge more at night?',
        answer:
          'No. Same base price at any hour, on any day of the year. We do not think you should pay extra for having bad luck after dark.',
      },
      {
        question: 'My car is stopped in a live lane. What now?',
        answer:
          'Call 911 as well as us. A vehicle blocking a lane needs traffic control, not just a tow truck, and the police can shut the lane so the recovery happens safely. Do not stand in the roadway trying to push it.',
      },
      {
        question: 'How quickly can you get there?',
        answer:
          'We will not give you a number over the internet that we might not keep — traffic on I-275 makes any promise like that dishonest. Call and we will tell you where the truck actually is and what that means for you.',
      },
    ],
    related: ['wont-start-towing', 'flat-tire-towing', 'tow-to-repair-shop'],
  },

  {
    slug: 'flat-tire-towing',
    kicker: 'Roadside',
    name: 'Flat Tire Help',
    price: 'roadside',
    metaTitle: 'Flat Tire in Tampa, FL? Spare Tire Change or Tow, 24/7 | ONE TOWING',
    metaDescription:
      'Flat tire in Tampa Bay? We put your spare on at the roadside, or tow the car to a tire shop if there is no usable spare. Around the clock. Call 656-777-2980.',
    h1: 'Flat tire — we put the spare on, or tow it',
    intro:
      'There are two outcomes, and we will tell you on the phone which one you are in. If there is a usable spare in the car, we come out and put it on, so you can drive to a tire shop yourself. If there is no spare — increasingly normal on new cars — or the wheel itself is damaged, we tow the car to a shop that can fix it properly.',
    cardLine: 'Your spare put on at the roadside — or a tow to a tire shop.',
    situationsTitle: 'Spare change or tow?',
    situations: [
      'A usable spare in the trunk, including a compact “donut” — we put it on at the roadside.',
      'No spare in the car, only an inflator kit — that becomes a tow to a tire shop.',
      'The spare is flat too, or the jack and wrench are missing — tell us on the phone and we will say what makes sense.',
      'The wheel itself is bent or cracked from a kerb or a pothole — a tow, because a spare will not fix the damage behind it.',
      'More than one tire down after hitting debris — a tow.',
      'A locking wheel nut whose key has gone missing — a tow to a shop.',
      'Stopped on a narrow highway shoulder or a bridge — safety decides, and sometimes the car has to come off the road before any wheel is touched.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Pull as far off the road as you can, hazards on, and stay in the car with your seatbelt on if you are on a highway.',
      'Call and tell us which wheel is down, whether you have a spare, and whether the car uses a locking wheel nut.',
      'If there is a usable spare and a safe spot to work, the driver puts it on. If not, you hear the tow price before the car is loaded.',
      'A spare is a temporary fix. Drive gently to a tire shop and get the flat repaired or replaced.',
    ],
    pricing: [
      'Putting on your spare is quoted on the call — call for price. It depends on where the car is and how safe the spot is to work in.',
      `If the car has to be towed instead, it is priced as a local tow: from $${PRICING.baseFee} for the run out plus up to ${PRICING.includedTowMiles} miles of towing, then $${PRICING.extraMileRate} per extra mile.`,
      'We do not sell, repair or mount tires — that is the tire shop’s job, and we can take you there.',
    ],
    faq: [
      {
        question: 'Do you change tires?',
        answer:
          'We put your own spare on, if the car has a usable one. We do not repair, sell or mount tires. If there is no spare or the wheel is damaged, we tow the car to a tire shop instead.',
      },
      {
        question: 'My car has no spare at all. Is that unusual?',
        answer:
          'Not any more. A large share of new cars ship with an inflator kit instead of a spare wheel, and those kits do nothing for a sidewall tear or a bent rim. That is why flat tires turn into tow calls far more often than they used to.',
      },
      {
        question: 'I hit a pothole and the wheel is bent. Now what?',
        answer:
          'A bent or cracked wheel will not seal against a tire, so the wheel has to be repaired or replaced. The car needs a shop, and it should not be driven there on the damaged wheel — we tow it.',
      },
      {
        question: 'Can you take it to a specific tire shop?',
        answer:
          'Yes. Name the shop and that is where it goes. If they are shut, we can drop it for opening or take it home instead.',
      },
    ],
    related: ['emergency-towing', 'tow-to-repair-shop', 'wont-start-towing'],
  },

  {
    slug: 'wont-start-towing',
    kicker: 'Towing',
    name: 'Car Won’t Start or Won’t Drive',
    price: 'tow',
    metaTitle: 'Car Won’t Start? Towing in Tampa, FL 24/7 | ONE TOWING',
    metaDescription:
      'Car will not start or will not drive in Tampa? We tow it to your shop, your dealer or your driveway. From $95, around the clock. Call 656-777-2980.',
    h1: 'The car will not start, or will not drive',
    intro:
      'There is a gap between a car that will not start and a car that needs a tow, and a lot of money lives in that gap. A dead battery is a five-minute fix. A dead engine is a tow. We will spend a minute on the phone working out which one you have, because sending a truck for something a boost would have solved does neither of us any good.',
    cardLine: 'Dead engine, gearbox or overheating — loaded and taken to a shop.',
    situationsTitle: 'When it is a tow, not a boost',
    situations: [
      'The engine cranks strongly but never fires — fuel or spark, not the battery.',
      'One loud click and nothing, which usually means the starter rather than the battery.',
      'Temperature gauge in the red, or steam from under the hood. Do not keep driving it.',
      'The gearbox slips, will not select a gear, or the car will not move in drive.',
      'A noise that arrived suddenly — knocking, grinding, a bang followed by silence.',
      'A warning light came on and the car went into limp mode.',
      'It was jumped yesterday and it is dead again today.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and describe what happens when you turn the key. The sound tells us most of what we need.',
      'If a jump start would fix it, we say so — that is a cheaper visit than a tow.',
      'If it is a tow, you get the price before the truck sets off.',
      'Tell us where the car goes: your mechanic, a dealer service bay, or your own driveway. If you have no shop in mind we can suggest one.',
      'It is loaded on the wheel-lift, with dollies if it will not roll, and taken there.',
    ],
    pricing: [
      'A local tow starts at $95, covering the run out to you and a set towing distance, then a flat rate per extra mile.',
      'If we come out for a jump start and the car will not hold, the truck is already there and we load it. You hear the tow price before that happens.',
      'Nothing is decided at the roadside that was not agreed on the phone.',
    ],
    faq: [
      {
        question: 'How do I know whether I need a jump or a tow?',
        answer:
          'Listen to it. Rapid clicking or a slow, tired crank is usually the battery, and a boost fixes that. A strong, healthy crank that never catches is not the battery, and a jump will not help. Tell us what you hear and we will tell you which visit you need.',
      },
      {
        question: 'The car is overheating. Can I drive it a short distance?',
        answer:
          'Better not to. An engine driven hot can turn a hose into a head gasket, and that is the difference between a small bill and a very large one. Shut it off and let it cool while you call.',
      },
      {
        question: 'Can you take it to my own mechanic?',
        answer:
          'Yes. That is the most common destination there is. Give us the shop name and address. If they are closed, we can leave it there for opening, or take it home instead — your call.',
      },
      {
        question: 'What if it will not come out of park or will not roll?',
        answer:
          'That is normal for us. A locked steering column or a seized brake just means the wheels go up on dollies. Mention it on the phone so the driver arrives ready.',
      },
    ],
    related: ['emergency-towing', 'tow-to-repair-shop', 'long-distance-towing'],
  },

  {
    slug: 'tow-to-repair-shop',
    kicker: 'Towing',
    name: 'Towing to a Shop or Dealership',
    price: 'tow',
    metaTitle: 'Towing to a Repair Shop or Dealership in Tampa, FL | ONE TOWING',
    metaDescription:
      'We tow your car to your mechanic, a dealership service bay or your driveway in Tampa. After-hours drop-offs handled. From $95. Call 656-777-2980.',
    h1: 'Taking the car to your shop or dealer',
    intro:
      'Moving the car is the simple half. The half that goes wrong is the handover: a shop that shut at five, a dealer that will only take warranty work through a particular door, keys with nowhere to go. This is the most common destination we drive to, so we have run into all of it before.',
    cardLine: 'To your mechanic, a dealer service bay, or your own driveway.',
    situationsTitle: 'Where cars usually need to go',
    situations: [
      'Your own mechanic, the one you already trust.',
      'A dealership service bay, when the car is under warranty and the work has to be done there to stay covered.',
      'A body shop your insurer has already approved after a collision.',
      'A tire shop, when the wheel or the tire is the whole problem.',
      'Your own driveway, to sit until you have decided what to do — which costs nothing in storage and is a perfectly good answer.',
      'Somewhere you have not chosen yet, because it broke down before you had a mechanic.',
    ],
    stepsTitle: 'How the handover works',
    steps: [
      'Tell us the shop name and address when you call. If you do not have one, say so and we can suggest somewhere.',
      'Tell us whether they are open. It changes what happens at the far end, not whether we go.',
      'If they are closed, the car goes in their after-hours drop area and the keys into their key box, the way those places are designed to work.',
      'If they are open, the car is handed to whoever takes it in and you get told it arrived.',
      'You do not have to be there. Plenty of people are at work while their car changes address.',
    ],
    pricing: [
      'Priced as an ordinary local tow: from $95 covering the run out to you and a set towing distance, then a flat rate per extra mile.',
      'The destination does not change the rate. A dealership across town costs the same as an independent shop the same distance away.',
      'If a shop turns you away and the car needs to go somewhere else, we will tell you what that second move costs before doing it.',
    ],
    faq: [
      {
        question: 'The shop is closed. Can you still take it?',
        answer:
          'Usually yes. Most shops have an after-hours drop area and a key box, and that is what they are for. Tell us on the phone that they are shut so the driver knows to look for it.',
      },
      {
        question: 'Do I need to be there?',
        answer:
          'No. Give us the address, tell us where the keys should end up, and get on with your day. We will tell you when the car has arrived.',
      },
      {
        question: 'I do not have a mechanic. Can you recommend one?',
        answer:
          'Yes, and we will tell you plainly that it is a suggestion, not a partnership. We do not take a cut from any shop, which is exactly why the suggestion is worth something.',
      },
      {
        question: 'Will a dealership accept a car that arrives on a tow truck?',
        answer:
          'Nearly always — it is routine for them. For warranty work it is worth phoning the service department first, because some brands want the car logged in a particular way to keep the coverage intact.',
      },
      {
        question: 'Can you take it home instead?',
        answer:
          'Of course. Your driveway is a destination like any other, and it costs you nothing to park it there while you think. We have no yard and no storage clock, so there is no reason for us to push you anywhere else.',
      },
    ],
    related: ['wont-start-towing', 'long-distance-towing', 'flat-tire-towing'],
  },

  {
    slug: 'long-distance-towing',
    kicker: 'Towing',
    name: 'Long Distance Towing',
    price: 'tow',
    metaTitle: 'Long Distance Towing from Tampa, FL | $3 per Mile Statewide | ONE TOWING',
    metaDescription:
      'Long-distance towing out of Tampa across Florida — Orlando, Miami, Jacksonville, Fort Myers. Long runs drop to $3 per mile. Flat quote on the phone. Call 656-777-2980.',
    h1: 'Long distance towing out of Tampa',
    intro:
      'A car that has to cross the state is a different job from a car that has to cross town. The price works differently too: past a certain distance the per-mile rate drops, because a long run is cheaper for us per mile and there is no reason not to pass that on. You get a flat figure on the phone before anything is booked.',
    cardLine: 'Runs across Florida at the reduced rate of $3 a mile.',
    vehiclesTitle: 'What we move long distance',
    vehicles: [
      'A car being relocated with you to another city.',
      'A vehicle bought online, at auction or from a private seller out of town.',
      'A non-running project car or a classic that cannot be driven.',
      'A student’s car going to or coming back from a university across the state.',
      'A family member’s car that needs to come back to Tampa.',
      'Dealer-to-dealer moves and estate vehicles.',
    ],
    situationsTitle: 'Routes we run most',
    situations: [
      'Tampa ↔ Orlando — roughly 85 miles.',
      'Tampa ↔ Sarasota and Bradenton — roughly 50 miles.',
      'Tampa ↔ Fort Myers and Naples — roughly 130 miles.',
      'Tampa ↔ Jacksonville — roughly 200 miles.',
      'Tampa ↔ Tallahassee — roughly 275 miles.',
      'Tampa ↔ Miami and Fort Lauderdale — roughly 280 miles.',
    ],
    stepsTitle: 'How to book one',
    steps: [
      'Call with the pickup address, the drop-off address and what the vehicle is.',
      'Tell us whether it runs, rolls and steers — a non-runner is loaded differently.',
      'We quote the whole run as one flat figure on the phone.',
      'We agree a pickup time. Long runs are scheduled rather than dispatched on the spot.',
      'The car is loaded, moved and handed over at the far end.',
    ],
    pricing: [
      'A long run is charged per mile, and the rate drops to $3 a mile once the distance makes that the cheaper of the two rates for you. Our calculator and our quotes always take whichever rate costs you less.',
      'On a route like Tampa to Orlando that means the distance, not a fixed surcharge, is what drives the number — which is why we quote the whole thing on the phone rather than printing a table here.',
      'The quote is flat. It does not grow at the far end.',
    ],
    faq: [
      {
        question: 'How is a long-distance tow priced?',
        answer:
          'By distance. Past a certain point the per-mile rate drops to $3, and we always apply whichever rate works out cheaper for you rather than whichever is better for us. Call with both addresses and you get the whole figure at once.',
      },
      {
        question: 'Do you leave Florida?',
        answer:
          'Ask. Runs into Georgia and Alabama are possible depending on the week and what else is booked. We will give you a straight yes or no on the phone rather than string you along.',
      },
      {
        question: 'Can you move an electric car?',
        answer:
          'Call us with the model and both addresses. An EV travels with all four wheels off the ground, which our wheel-lift and dollies do, and we will work out the right way to move yours on the phone.',
      },
      {
        question: 'Can it be done today?',
        answer:
          'Sometimes, but long runs are usually scheduled rather than immediate, because the truck is out of the area for hours. Call and we will tell you what is actually possible today.',
      },
    ],
    related: ['tow-to-repair-shop', 'car-home-service', 'wont-start-towing'],
  },

  {
    slug: 'car-home-service',
    kicker: 'Tampa nights',
    name: 'Car Home Service',
    price: 'tow',
    metaTitle: 'Cannot Drive It Home Tonight? We Take You Both | Tampa, FL | ONE TOWING',
    metaDescription:
      'Left your car in Ybor City or downtown Tampa and cannot drive it home tonight? The car rides on our truck, you ride in the cab, and it is in your driveway by morning. Call 656-777-2980.',
    h1: 'Your car comes home with you',
    intro:
      'You left the car where it was, and that was the right call. Now there is a second problem: the car is sitting on a street in Ybor City, you need it at seven in the morning, and getting back to it means another ride across town before you have even had coffee. So we take both of you home. The car rides on the truck, you ride in the cab, and it is in your driveway when you wake up.',
    cardLine: 'We bring you and your car home. You ride in the cab.',
    situationsTitle: 'When people use this',
    situations: [
      'A night out on 7th Avenue in Ybor City that ran later than planned.',
      'You live out toward Brandon, Riverview or Carrollwood, and a rideshare there and back the next morning costs more than you would think.',
      'You need the car early tomorrow and cannot spend the morning collecting it.',
      'The street you parked on has overnight parking restrictions.',
      'A work event, a wedding or a game where somebody else did the driving.',
      'A friend cannot drive tonight and you would rather their car did not spend the night downtown.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us where the car is parked and where home is.',
      'You get the price on the phone before we set off. No meter, no surprise at the door.',
      'The truck comes, the car goes up on the wheel-lift, you get in the cab.',
      'We drop the car at your address and you go to bed.',
    ],
    pricing: [
      'Priced as an ordinary local tow: from $95 for the run out plus a set towing distance, then a flat rate per extra mile. There is no night surcharge and no weekend surcharge.',
      'Set that against what the alternative actually costs — a ride home, a ride back tomorrow, a night of downtown parking, and the risk of a parking ticket.',
    ],
    faq: [
      {
        question: 'So you drive my car home for me?',
        answer:
          'No, and we want to be precise about that. Your car travels on our truck and you travel in the cab beside the driver. Nobody but you drives your car. It is a tow, priced like a tow.',
      },
      {
        question: 'Can I ride along?',
        answer:
          'Yes, that is the whole point of it. There is room in the cab. Tell us how many of you there are when you call, because the cab is not unlimited.',
      },
      {
        question: 'Is it not cheaper to just leave the car and get it tomorrow?',
        answer:
          'Sometimes it is, and we will not pretend otherwise. It stops being cheaper when you add the ride home, the ride back, overnight parking and the chance of a ticket — and when you actually need the car first thing.',
      },
      {
        question: 'Do you do this late?',
        answer:
          'We work around the clock, every night of the year, and two in the morning is an ordinary time for us.',
      },
      {
        question: 'Can I book it for someone else?',
        answer:
          'Yes. You just need to be able to tell us where the car is and where it is going, and the owner needs to be there to hand it over.',
      },
    ],
    related: ['tow-to-repair-shop', 'long-distance-towing', 'emergency-towing'],
  },

  {
    slug: 'lockout-service',
    kicker: 'Roadside',
    name: 'Lockout Assistance',
    price: 'roadside',
    adsExcluded: true,
    metaTitle: 'Car Lockout Assistance in Tampa, FL | Roadside Help 24/7 | ONE TOWING',
    metaDescription:
      'Locked out of your car in Tampa? Roadside lockout assistance for the vehicle owner, around the clock. Proof of ownership required. Call 656-777-2980 for the price.',
    h1: 'Locked out of your car',
    intro:
      'It happens in the same three places every time: a beach lot, a grocery store, and the moment you close the trunk with the keys still in it. We offer roadside lockout assistance to the owner of the vehicle, done carefully and without damage on most cars.',
    cardLine: 'Keys shut inside — roadside lockout help for the vehicle owner.',
    situationsTitle: 'When people call us for this',
    situations: [
      'Keys visible on the driver’s seat, doors locked, and the spare is at home.',
      'The trunk closed with the keys inside it.',
      'A key fob that stopped working and locked the car on its own.',
      'A child or a pet shut inside — call 911 first, then say it the moment we pick up.',
      'The car locked itself while running, which some models do.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us the year, make and model. Different cars need different approaches, and knowing in advance saves time at the car.',
      'We ask you to have ID and something showing the car is yours — registration, insurance card, or the rental agreement.',
      'The driver works carefully with proper tools.',
      'You check the car over before we leave.',
    ],
    pricing: [
      'Quoted on the call — call for price. What it takes depends heavily on the vehicle, and a single printed number would be wrong more often than right.',
      'The price you hear on the phone is the price you pay.',
      'If a car cannot be handled without damage, we say so before starting rather than after.',
    ],
    faq: [
      {
        question: 'Will you damage the door or the paint?',
        answer:
          'The whole method is built around not damaging anything. On the rare vehicle where that is not possible, we tell you before we begin and you decide what to do next.',
      },
      {
        question: 'Do you need proof the car is mine?',
        answer:
          'Yes, and we ask every single time without exception. ID plus registration, an insurance card, or the rental agreement.',
      },
      {
        question: 'A child or a pet is locked inside. What do I do?',
        answer:
          'Call 911 first, then call us. On a hot Tampa day the inside of a car becomes dangerous within minutes, and the fire department is equipped to act immediately.',
      },
      {
        question: 'Can you make me a new key?',
        answer: 'No. We do not cut or program keys — a replacement key is a dealer job.',
      },
    ],
    related: ['jump-start', 'fuel-delivery', 'roadside-assistance'],
  },
];

/** Цена услуги для плашки: «from $95», «from $65» или «call for price». */
export function servicePrice(page: ServicePage): { label: string; value: string; amount: number | null } {
  const jump = PRICING.jumpStartFrom;
  switch (page.price) {
    case 'tow':
      return { label: 'Local tow from', value: `$${PRICING.baseFee}`, amount: PRICING.baseFee };
    case 'jump-start':
    case 'roadside-mixed':
      return jump
        ? { label: 'Jump start from', value: `$${jump}`, amount: jump }
        : { label: 'Price', value: 'Call for price', amount: null };
    default:
      return { label: 'Price', value: 'Call for price', amount: null };
  }
}

/** Пять главных посадочных страниц — в порядке важности. */
export const CORE_SERVICE_PAGES = [
  'towing',
  'roadside-assistance',
  'jump-start',
  'fuel-delivery',
  'accident-towing',
].map((slug) => SERVICE_PAGES.find((page) => page.slug === slug)!);

export function findServicePage(slug: string) {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

/**
 * Связанные услуги для блока «смотрите также». Несуществующие слаги молча
 * отбрасываются — так ссылка-обещание на 404 не появится, даже если в
 * `related` осталось имя страницы, которую ещё не написали.
 */
export function relatedServicePages(page: ServicePage) {
  return page.related
    .map((slug) => SERVICE_PAGES.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ServicePage => Boolean(candidate));
}
