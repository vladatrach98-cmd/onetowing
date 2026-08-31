/** 12 услуг ONE TOWING. Тексты пойдут в messages/*.json на шаге мультиязычности. */

export type ServiceKind = 'tow' | 'roadside';

export type Service = {
  id: string;
  title: string;
  description: string;
  /** 'tow' считается по формуле $95 + мили, 'roadside' — цена по телефону. */
  kind: ServiceKind;
  /**
   * Слаг подробной страницы в `app/data/services-content.ts`, если она написана.
   * Есть слаг — плитка на главной становится ссылкой. Нет — остаётся текстом,
   * и ссылки-обещания на 404 не появляется.
   */
  page?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'local-tow',
    title: 'Local Towing',
    description: 'Cars, SUVs and vans moved anywhere around Tampa Bay.',
    kind: 'tow',
    page: 'light-duty-towing',
  },
  {
    id: 'emergency-tow',
    title: 'Emergency Towing',
    description: 'Breakdowns and accidents on the highway or in a parking lot, day or night.',
    kind: 'tow',
    page: 'emergency-towing',
  },
  {
    id: 'breakdown',
    title: 'Car Won’t Start or Won’t Drive',
    description: 'Dead engine, transmission, overheating — we load it and take it where it can be fixed.',
    kind: 'tow',
    page: 'wont-start-towing',
  },
  {
    id: 'accident-recovery',
    title: 'Accident Recovery',
    description: 'After a collision: safe load-up and transport to a body shop, storage lot or home.',
    kind: 'tow',
    page: 'accident-recovery',
  },
  {
    id: 'motorcycle',
    title: 'Motorcycle Towing',
    description: 'Bikes strapped down and moved on dollies, so they arrive as they left.',
    kind: 'tow',
    page: 'motorcycle-towing',
  },
  {
    id: 'roadside',
    title: 'Roadside Assistance',
    description: 'Small problems fixed on the spot so you can keep driving.',
    kind: 'roadside',
    page: 'roadside-assistance',
  },
  {
    id: 'jump-start',
    title: 'Jump Start',
    description: 'Dead battery? We boost it and check that the car keeps running.',
    kind: 'roadside',
    page: 'jump-start',
  },
  {
    id: 'lockout',
    title: 'Car Lockout',
    description: 'Keys locked inside — we open most vehicles without damage.',
    kind: 'roadside',
    page: 'lockout-service',
  },
  {
    id: 'fuel-delivery',
    title: 'Fuel Delivery',
    description: 'Gas or diesel brought to you — enough to reach the nearest station.',
    kind: 'roadside',
    page: 'fuel-delivery',
  },
  {
    id: 'wheel-lock',
    title: 'Wheels Won’t Roll',
    description: 'Seized brakes, missing keys or locked wheels — we load it on dollies.',
    kind: 'tow',
    page: 'light-duty-towing',
  },
  {
    id: 'dealer-delivery',
    title: 'Delivery to a Dealership',
    description: 'Straight to the dealer service bay, handed over properly.',
    kind: 'tow',
    page: 'tow-to-repair-shop',
  },
  {
    id: 'shop-delivery',
    title: 'Delivery to a Repair Shop',
    description: 'To your mechanic, or to a shop we can recommend nearby.',
    kind: 'tow',
    page: 'tow-to-repair-shop',
  },
  {
    id: 'vehicle-transport',
    title: 'Vehicle Transport',
    description: 'Just bought a car or moving one across town? We haul it.',
    kind: 'tow',
    page: 'long-distance-towing',
  },
  {
    id: 'sober-driver',
    title: 'Sober Driver — Car Home Service',
    description: 'Had a drink? We bring you and your car home — you ride in the cab.',
    kind: 'tow',
    page: 'sober-driver',
  },
  {
    id: 'long-distance',
    title: 'Long Distance Towing',
    description: 'Runs over 50 miles at a reduced per-mile rate across Florida.',
    kind: 'tow',
    page: 'long-distance-towing',
  },
];
