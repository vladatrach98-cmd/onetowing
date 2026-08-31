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
 *   — замены колёс: услуги нет. Есть страница про буксировку с пробитым колесом,
 *     и она честно говорит, что колесо мы не меняем;
 *   — цифр в дорожной помощи. Прикурить, вскрыть, привезти топливо — «call for
 *     price», потому что работа слишком разная.
 *
 * ⚠️ Услуга «трезвый водитель» описана ТОЛЬКО как буксировка: клиент едет в
 * кабине, машина на эвакуаторе. Вариант «наш человек за рулём вашей машины»
 * сюда не добавлять — страховка эвакуатора этого не покрывает.
 */

export type ServiceFaq = { question: string; answer: string };

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
  /** Слаги соседних услуг — внутренняя перелинковка. */
  related: string[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'light-duty-towing',
    kicker: 'Towing',
    name: 'Light-Duty Towing',
    metaTitle: 'Light-Duty Towing in Tampa, FL | Cars, SUVs & Vans | ONE TOWING',
    metaDescription:
      'Light-duty towing in Tampa for cars, SUVs, vans and pickups. Wheel-lift and dollies, so even a car that will not roll goes on the truck. Local tow from $95. Call 656-777-2980.',
    h1: 'Light-duty towing in Tampa',
    intro:
      'Light-duty is the everyday half of this trade: passenger cars, SUVs, minivans, small pickups. It covers almost everything parked on a Tampa street. We run a 2022 RAM 4500 with a wheel-lift and a full set of dollies, which means the car does not need to roll, steer or even have a key in it to end up on our truck.',
    cardLine: 'Cars, SUVs, vans and pickups moved anywhere around Tampa Bay.',
    vehiclesTitle: 'Vehicles we tow',
    vehicles: [
      'Sedans and coupes — Toyota Camry, Honda Accord, Nissan Altima, Hyundai Sonata and everything alongside them.',
      'SUVs and crossovers — RAV4, CR-V, Explorer, Highlander, Tahoe, Grand Cherokee.',
      'Minivans and passenger vans — Odyssey, Sienna, Pacifica, Transit.',
      'Half-ton pickups — F-150, Silverado 1500, RAM 1500, Tacoma, Ranger.',
      'All-wheel drive — Subaru, Audi quattro, 4Motion and the rest, with dollies so nothing turns through the drivetrain.',
      'Electric and hybrid — Tesla Model 3 and Model Y, Mustang Mach-E, Ioniq, Prius, all four wheels off the ground.',
    ],
    situationsTitle: 'What light-duty actually covers',
    situations: [
      'A car that died and will not restart, wherever it stopped.',
      'A vehicle that has to reach a shop, a dealership service bay or your own driveway.',
      'All-wheel drive, where dragging two wheels would wreck the drivetrain — that is what dollies are for.',
      'Seized brakes, a locked steering column or a missing key, so the wheels will not turn at all.',
      'A car bought online or at auction that needs moving across town.',
      'A vehicle sitting where it must not sit any longer — expired parking, a blocked driveway, a tow-away zone.',
    ],
    stepsTitle: 'How a light-duty call goes',
    steps: [
      'You call and tell us the make, roughly where you are, and whether the car rolls and steers.',
      'We give you the price on the phone before anything moves.',
      'The truck comes out and the driver looks at how the car sits — kerb, slope, tight garage, all of it changes the approach.',
      'Wheel-lift for most cars, dollies under the remaining wheels when the car will not roll or is all-wheel drive.',
      'The car is secured and taken where you said. You get a call if anything about the destination changes.',
    ],
    pricing: [
      'A local light-duty tow starts at $95. That covers driving out to you and towing the car a set distance.',
      'Past the included miles it is a flat rate per extra mile, and a long run drops to the cheaper long-distance rate automatically, because that works out better for you.',
      'You hear the whole figure before the car moves, not after it is loaded.',
    ],
    faq: [
      {
        question: 'What counts as light-duty?',
        answer:
          'Passenger cars, SUVs, minivans, crossovers and half-ton pickups — the vehicles most people drive daily. Box trucks, RVs and commercial rigs are heavy-duty and need different equipment than ours.',
      },
      {
        question: 'My car will not roll at all. Can you still take it?',
        answer:
          'Yes. Seized brakes, a locked steering column, a missing key, a parking brake that will not release — the wheels that will not turn go up on dollies. Tell us on the phone so the right gear is on the truck when it arrives.',
      },
      {
        question: 'Is all-wheel drive a problem?',
        answer:
          'No, but it does change the method. An all-wheel-drive car should not be dragged on two wheels; we put dollies under the other axle so nothing spins through the drivetrain.',
      },
      {
        question: 'Can you tow a Tesla or another electric car?',
        answer:
          'Yes. An electric car has to travel with every wheel off the ground, because a turning wheel pushes current back into the motor. Our wheel-lift takes one axle and dollies take the other, so all four are up — the method the manufacturers name themselves. Call with the model and where it is going and we will sort out the details on the phone.',
      },
      {
        question: 'Can you get the car out of a parking garage?',
        answer:
          'Usually. Low ceilings and tight ramps are the limit, not the car. Tell us the garage and the level when you call and we will say honestly whether the truck fits.',
      },
    ],
    related: ['wont-start-towing', 'long-distance-towing', 'accident-recovery'],
  },

  {
    slug: 'jump-start',
    kicker: 'Roadside',
    name: 'Jump Start',
    metaTitle: 'Mobile Jump Start in Tampa, FL | Dead Battery Help 24/7 | ONE TOWING',
    metaDescription:
      'Dead battery in Tampa? We come to you, boost the car and make sure it keeps running before we leave. Around the clock. Call 656-777-2980 for the price.',
    h1: 'Jump start — we come to the car',
    intro:
      'A dead battery is the most common reason people call a tow truck and the one least likely to actually need one. You should not have to flag down a stranger with cables in a parking garage at eleven at night. We bring the boost to the car, start it, and stay long enough to see whether it holds.',
    cardLine: 'Dead battery boosted on the spot — and checked that it holds.',
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
      'We come out with the boost pack. No need for you to find cables or a second car.',
      'The driver connects, you crank it, and in most cases it fires within seconds.',
      'We let it idle and watch whether the alternator is actually charging. This is the part people skip, and it is why a car jumped by a passer-by dies again two blocks later.',
      'If it holds, you drive away. If it does not, the truck is already there and we load it.',
    ],
    pricing: [
      'Roadside work is quoted on the call — call for price. We do not print a number here because what a jump start takes varies with where the car sits and what the battery has done.',
      'You get the figure before the driver sets off, and it does not change on arrival.',
      'If the battery will not hold and the car has to be towed instead, we tell you the tow price then and there, before loading.',
    ],
    faq: [
      {
        question: 'What if the engine cranks fast but still will not start?',
        answer:
          'Then it is probably not the battery — fuel, spark or the starter are more likely. Describe what you hear when you call. If a boost is not going to fix it, we would rather say so on the phone than charge you to find out.',
      },
      {
        question: 'Will a jump start damage my car?',
        answer:
          'Done properly, no. We use a boost pack rather than another vehicle, which keeps the voltage controlled and avoids the surges that come from a bad cable connection.',
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
    related: ['lockout-service', 'fuel-delivery', 'wont-start-towing'],
  },

  {
    slug: 'lockout-service',
    kicker: 'Roadside',
    name: 'Car Lockout',
    metaTitle: 'Car Lockout Service in Tampa, FL | Keys Locked in Car 24/7 | ONE TOWING',
    metaDescription:
      'Keys locked in the car in Tampa? We open most vehicles without damage, around the clock. Consent only — we check the car is yours. Call 656-777-2980.',
    h1: 'Keys locked in the car',
    intro:
      'It happens in the same three places every time: a beach lot, a grocery store, and the moment you close the trunk with the keys still in it. Most cars can be opened without touching the paint or the glass. We come out, open it, and you carry on with your day.',
    cardLine: 'Keys shut inside — most vehicles opened without damage.',
    situationsTitle: 'When people call us for this',
    situations: [
      'Keys visible on the driver’s seat, doors locked, and the spare is at home.',
      'The trunk closed with the keys inside it.',
      'A key fob that stopped working and locked the car on its own.',
      'A child or a pet shut inside — say this first when you call, it changes everything about how we respond.',
      'The car locked itself while running, which some models do.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us the year, make and model. Different cars need different approaches, and knowing in advance saves time at the car.',
      'We ask you to have ID and something showing the car is yours — registration, insurance card, or the app if it is a rental.',
      'The driver works the door open with proper tools, not a coat hanger and not a slim jim on cars where that damages the wiring.',
      'You check the car over before we leave.',
    ],
    pricing: [
      'Quoted on the call — call for price. What a lockout takes depends heavily on the vehicle, and a single printed number would be wrong more often than right.',
      'The price you hear on the phone is the price you pay.',
      'If a car turns out not to be openable without damage, we say so before starting rather than after.',
    ],
    faq: [
      {
        question: 'Will you damage the door or the paint?',
        answer:
          'The whole method is built around not damaging anything. On the rare vehicle where a clean opening is not possible, we tell you that before we begin and you decide what to do next.',
      },
      {
        question: 'Do you need proof the car is mine?',
        answer:
          'Yes, and we ask every single time without exception. ID plus registration, an insurance card, or the rental agreement. It is what separates a lockout service from helping someone steal a car.',
      },
      {
        question: 'A child or a pet is locked inside. What do I do?',
        answer:
          'Call 911 first, then call us. On a hot Tampa day the inside of a car becomes dangerous within minutes, and the fire department is equipped to get in immediately. Say it is a child or a pet the moment we pick up.',
      },
      {
        question: 'Can you make me a new key?',
        answer:
          'No. We open the car so you can get to your keys. Cutting and programming a replacement key is a locksmith or dealer job.',
      },
    ],
    related: ['jump-start', 'fuel-delivery', 'light-duty-towing'],
  },

  {
    slug: 'fuel-delivery',
    kicker: 'Roadside',
    name: 'Fuel Delivery',
    metaTitle: 'Emergency Fuel Delivery in Tampa, FL | Out of Gas 24/7 | ONE TOWING',
    metaDescription:
      'Out of gas in Tampa? We bring gasoline or diesel to the car — enough to reach the nearest station. Around the clock on I-275, I-4 and I-75. Call 656-777-2980.',
    h1: 'Out of gas — we bring fuel to you',
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
    related: ['jump-start', 'lockout-service', 'light-duty-towing'],
  },

  {
    slug: 'accident-recovery',
    kicker: 'Towing',
    name: 'Accident Recovery',
    metaTitle: 'Accident Recovery & Towing in Tampa, FL | After a Collision | ONE TOWING',
    metaDescription:
      'Towing after a collision in Tampa. We load damaged vehicles carefully and take them to a body shop, a storage lot or your home — where you say, not where we choose. Call 656-777-2980.',
    h1: 'After a collision',
    intro:
      'After a crash nobody is thinking clearly, and that is exactly when people get talked into decisions they regret. The most important thing to know is this: it is your car, and you say where it goes. Not the first truck that shows up, and not a yard that charges you storage to get it back.',
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
      'An accident tow is priced the same way as any other local tow: from $95, covering the run out to you and a set towing distance, then a flat rate per extra mile.',
      'We do not run an impound lot, so there is no storage clock ticking and nothing to buy your car back from.',
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
    related: ['light-duty-towing', 'flat-tire-towing', 'wont-start-towing'],
  },

  {
    slug: 'motorcycle-towing',
    kicker: 'Towing',
    name: 'Motorcycle Towing',
    metaTitle: 'Motorcycle Towing in Tampa, FL | Bike Transport 24/7 | ONE TOWING',
    metaDescription:
      'Motorcycle towing in Tampa. Bikes strapped down and moved on dollies — cruisers, sportbikes, baggers and adventure bikes. Around the clock. Call 656-777-2980.',
    h1: 'Motorcycle towing in Tampa',
    intro:
      'A bike that will not start is a different problem from a car that will not start, because you cannot leave it and walk away. Ours travels strapped down and moved on dollies, and we will tell you exactly how yours will be secured before the truck leaves. Call and tell us what the bike is, and we will talk it through before the truck leaves.',
    cardLine: 'Bikes strapped down and moved on dollies, arriving as they left.',
    vehiclesTitle: 'Bikes we move',
    vehicles: [
      'Cruisers — Harley-Davidson Softail and Sportster, Indian Scout, Yamaha Bolt.',
      'Sportbikes — Yamaha R1 and R6, GSX-R, ZX-10R, CBR, Ducati Panigale.',
      'Touring bikes and baggers — Road Glide, Street Glide, Gold Wing, FJR.',
      'Adventure and dual-sport — BMW GS, KTM Adventure, V-Strom, Africa Twin.',
      'Scooters and small-displacement bikes.',
      'A bike you have just bought or sold and need moved across town.',
    ],
    situationsTitle: 'When to call for a bike',
    situations: [
      'It will not crank and roadside fiddling has not fixed it.',
      'You went down. Even a slow tip-over can bend a lever or a peg enough to make riding unsafe.',
      'A flat tire — rarely worth fixing on the roadside on a bike.',
      'Chain or belt failure, which strands you exactly where it happens.',
      'Electrical failure mid-ride, with no lights and no starter.',
      'A bike bought or sold that needs to get between two addresses.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Call and tell us the make and model, whether it rolls, and whether the front wheel and forks are straight.',
      'Get yourself and the bike off the road and stay with it if you safely can.',
      'The driver secures the bike with straps against the frame and moves it on dollies.',
      'It comes off the same way it went on, at the shop, the dealer or your garage.',
    ],
    pricing: [
      'A bike is priced like any other local tow: from $95, covering the run out to you and a set towing distance, then a flat rate per extra mile.',
      'There is no surcharge for a motorcycle over a car.',
      'You get the figure on the phone before we set off.',
    ],
    faq: [
      {
        question: 'How exactly is the bike secured?',
        answer:
          'Straps against the frame, and the bike moved on dollies rather than dragged on its own wheels. We describe it plainly because riders care, and because you should know what is going to happen to your bike before it happens.',
      },
      {
        question: 'Do I have to be there when the bike is picked up?',
        answer:
          'For a breakdown you usually are already. For a bike being moved between two addresses, somebody needs to hand it over and somebody needs to receive it — it does not have to be you both times. Tell us the arrangement when you call.',
      },
      {
        question: 'The bike went down. Can it still be moved?',
        answer:
          'Almost always. Tell us what is bent — bars, forks, pegs — when you call, so the driver knows what he is working with before he arrives.',
      },
      {
        question: 'Can you move a trike or a bike with a sidecar?',
        answer:
          'Call and describe it. Three-wheeled machines vary enormously in width and weight, and we would rather work that out on the phone than at the roadside.',
      },
    ],
    related: ['light-duty-towing', 'accident-recovery', 'long-distance-towing'],
  },

  {
    slug: 'long-distance-towing',
    kicker: 'Towing',
    name: 'Long Distance Towing',
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
    related: ['light-duty-towing', 'motorcycle-towing', 'wont-start-towing'],
  },

  {
    slug: 'wont-start-towing',
    kicker: 'Towing',
    name: 'Car Won’t Start or Won’t Drive',
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
          'That is normal for us. A locked steering column, a seized brake or a missing key just means the wheels go up on dollies. Mention it on the phone so the driver arrives ready.',
      },
    ],
    related: ['jump-start', 'light-duty-towing', 'long-distance-towing'],
  },

  {
    slug: 'flat-tire-towing',
    kicker: 'Towing',
    name: 'Flat Tire Towing',
    metaTitle: 'Flat Tire? Towing to a Tire Shop in Tampa, FL | ONE TOWING',
    metaDescription:
      'Flat tire in Tampa with no spare or a damaged wheel? We do not change tires — we tow the car to a shop that can fix it properly. From $95. Call 656-777-2980.',
    h1: 'Flat tire — we tow, we do not change',
    intro:
      'Let us be straight with you before you call, because it saves everyone time: we do not change tires. Not as an upsell, not for a fee. What we do is take the car to a shop that will fix it properly. For a lot of flats in Tampa that is the only real option anyway — modern cars increasingly ship without a spare at all.',
    cardLine: 'No spare or a wrecked wheel? We take the car to a tire shop.',
    situationsTitle: 'When a flat becomes a tow',
    situations: [
      'There is no spare in the car, which is now normal on new vehicles.',
      'The spare is there but flat, or the jack and wrench are missing.',
      'The wheel itself is bent or cracked from a kerb or a pothole, so a new tire alone will not help.',
      'More than one tire is down after hitting debris.',
      'A blowout at speed that also tore up the wheel arch or a brake line.',
      'The car sits on a highway shoulder where changing a wheel by hand is genuinely dangerous.',
      'A locking wheel nut whose key has gone missing.',
    ],
    stepsTitle: 'How it goes',
    steps: [
      'Pull as far off the road as you can, hazards on, and stay in the car with your seatbelt on if you are on a highway.',
      'Call and tell us which wheel is down and whether you have a usable spare.',
      'If you do have a spare and a safe place to work, we will say honestly that a tire shop or a mobile tire service is cheaper than us.',
      'If it needs a tow, you get the price on the phone and the car goes to a tire shop, your mechanic or home.',
    ],
    pricing: [
      'Priced as a local tow: from $95 for the run out plus a set towing distance, then a flat rate per extra mile.',
      'There is no charge for advice. If the phone call ends with us telling you to call someone else, that costs you nothing.',
      'Where the car goes is your decision. If you do not know a tire shop nearby, we can name one.',
    ],
    faq: [
      {
        question: 'Why not just change the tire?',
        answer:
          'Because we do not offer it, and we would rather say that plainly than half-do it. A tire fitted badly at the roadside on a dark shoulder is a genuine hazard. We take the car to people whose whole job is tires.',
      },
      {
        question: 'My car has no spare at all. Is that unusual?',
        answer:
          'Not any more. A large share of new cars ship with an inflator kit instead of a spare wheel, and those kits do nothing for a sidewall tear or a bent rim. That is why flat tires turn into tow calls far more often than they used to.',
      },
      {
        question: 'I hit a pothole and the wheel is bent. Now what?',
        answer:
          'A bent or cracked wheel will not seal against a new tire, so the wheel has to be repaired or replaced. The car needs a shop, and it should not be driven there on the damaged wheel.',
      },
      {
        question: 'Can you take it to a specific tire shop?',
        answer:
          'Yes. Name the shop and that is where it goes. If they are shut, we can drop it for opening or take it home instead.',
      },
    ],
    related: ['light-duty-towing', 'accident-recovery', 'wont-start-towing'],
  },

  {
    slug: 'sober-driver',
    kicker: 'Tampa nights',
    name: 'Sober Driver — Car Home Service',
    metaTitle: 'Had a Drink? We Take You and Your Car Home | Tampa, FL | ONE TOWING',
    metaDescription:
      'Out in Ybor City or downtown Tampa and should not drive? We tow your car home and you ride in the cab. Cheaper than a DUI, and the car is in your driveway in the morning. Call 656-777-2980.',
    h1: 'Had a drink? Your car comes home with you',
    intro:
      'You did the right thing and did not drive. Now there is a second problem: the car is sitting on a street in Ybor City, you need it at seven in the morning, and getting back to it means another ride across town before you have even had coffee. So we take both of you home. The car rides on the truck, you ride in the cab, and it is in your driveway when you wake up.',
    cardLine: 'We bring you and your car home. You ride in the cab.',
    situationsTitle: 'When people use this',
    situations: [
      'A night out on 7th Avenue in Ybor City that went on longer than planned.',
      'You live out toward Brandon, Riverview or Carrollwood, and a rideshare there and back the next morning costs more than you would think.',
      'You need the car early tomorrow and cannot spend the morning collecting it.',
      'The street you parked on has a cleaning or tow-away window overnight.',
      'A work event, a wedding or a game where driving home was never going to be an option.',
      'A friend cannot drive and you would rather their car did not spend the night downtown.',
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
      'Set that against what the alternative actually costs — a ride home, a ride back tomorrow, a night of downtown parking, and the risk of a ticket or the car being towed by someone who will charge you storage.',
      'And against a DUI in Florida it is not a comparison at all. That is thousands of dollars, a licence, and an insurance premium that follows you for years.',
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
          'We work around the clock, every night of the year, and two in the morning is an ordinary time for us. Nobody is going to comment on your evening.',
      },
      {
        question: 'What if I am not the one drinking — can I book it for a friend?',
        answer:
          'Yes. You just need to be able to tell us where the car is and where it is going, and the owner needs to be there to hand it over.',
      },
    ],
    related: ['light-duty-towing', 'accident-recovery', 'jump-start'],
  },
  {
    slug: 'emergency-towing',
    kicker: 'Towing',
    name: 'Emergency Towing',
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
    related: ['light-duty-towing', 'accident-recovery', 'wont-start-towing'],
  },

  {
    slug: 'roadside-assistance',
    kicker: 'Roadside',
    name: 'Roadside Assistance',
    metaTitle: 'Roadside Assistance in Tampa, FL | Jump Start, Lockout, Fuel | ONE TOWING',
    metaDescription:
      'Roadside assistance in Tampa around the clock — jump starts, lockouts and fuel delivery. Often cheaper than a tow. Call 656-777-2980 for the price.',
    h1: 'Roadside help — not everything needs a tow',
    intro:
      'A good share of the calls we get do not need a tow truck at all, and we would rather tell you that on the phone than load your car and charge you for it. Three problems account for almost all of it: the battery is dead, the keys are shut inside, or the tank ran dry. All three get fixed where the car stands.',
    cardLine: 'Battery, keys or fuel — fixed where the car stands.',
    situationsTitle: 'What gets fixed on the spot',
    situations: [
      'A dead battery — boosted, and then watched to see whether it actually holds.',
      'Keys locked inside the car or the trunk, opened without damage on most vehicles.',
      'An empty tank — enough fuel brought to you to reach the nearest station.',
      'And what does not: we do not change tires, and we do not do mechanical repairs at the roadside. Those go to a shop, and we can take the car there.',
    ],
    stepsTitle: 'How we work out which one you need',
    steps: [
      'You describe what happened. For a car that will not start, the sound it makes when you turn the key tells us most of it.',
      'We say plainly whether this is a roadside job or a tow. Roadside is cheaper, and steering you to the expensive one would be a bad way to keep a customer.',
      'You get the price for whichever it is, before anyone sets off.',
      'The driver comes out and does the work at the car.',
      'If the roadside fix does not hold — a battery that will not keep charge, for instance — the truck is already there, and we tell you the tow price before loading.',
    ],
    pricing: [
      'Roadside work is quoted on the call — call for price. We deliberately do not print a number, because a lockout on a ten-year-old sedan and a lockout on a new SUV are not the same job.',
      'The price you hear on the phone is the price you pay. It does not change when the driver sees the car.',
      'Roadside is nearly always cheaper than a tow, which is exactly why we would rather sell you the cheaper one and have you call us again.',
    ],
    faq: [
      {
        question: 'What exactly do you fix on the roadside?',
        answer:
          'Jump starts, lockouts and fuel delivery. That is the list, and we keep it short on purpose — those three are the ones that can be done properly at the side of a road.',
      },
      {
        question: 'Do you change tires?',
        answer:
          'No. If a tire is gone, we tow the car to a shop that can replace it properly. Fitting a tire on a dark shoulder is not something we are willing to do half-well.',
      },
      {
        question: 'What if the roadside fix does not work?',
        answer:
          'Then the truck is already with you and we load the car. You hear the tow price at that point, before anything moves, not on the invoice afterwards.',
      },
      {
        question: 'Why will you not put prices on the website?',
        answer:
          'Because a single printed number would be wrong more often than right, and a wrong number quoted online turns into an argument at the roadside. One phone call and you have the real figure.',
      },
    ],
    related: ['jump-start', 'lockout-service', 'fuel-delivery'],
  },

  {
    slug: 'tow-to-repair-shop',
    kicker: 'Towing',
    name: 'Towing to a Shop or Dealership',
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
    related: ['light-duty-towing', 'wont-start-towing', 'accident-recovery'],
  },
];

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
