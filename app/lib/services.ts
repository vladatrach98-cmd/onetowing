/** Услуги ONE TOWING для главной и разметки. Тексты пойдут в messages/*.json на шаге мультиязычности. */

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

/**
 * ⚠️ Здесь только то, что продвигаем. Мотоциклов, lockout, эвакуации без согласия
 * владельца здесь нет и быть не должно — главная страница используется в рекламе.
 * Lockout живёт отдельной страницей только для органики (см. services-content.ts).
 */
export const SERVICES: Service[] = [
  {
    id: 'local-tow',
    title: 'Local Towing',
    description: 'Cars, SUVs, vans and pickups moved anywhere around Tampa Bay.',
    kind: 'tow',
    page: 'towing',
  },
  {
    id: 'accident-tow',
    title: 'Accident Towing',
    description: 'After a collision: careful load-up and a tow to the body shop, dealer or home you choose.',
    kind: 'tow',
    page: 'accident-towing',
  },
  {
    id: 'roadside-tow',
    title: 'Roadside & Highway Towing',
    description: 'Broken down on I-275, I-4, I-75, the Selmon or a bridge — day or night.',
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
    id: 'shop-delivery',
    title: 'Tow to a Shop or Dealership',
    description: 'To your mechanic or a dealer service bay, after-hours drop-offs included.',
    kind: 'tow',
    page: 'tow-to-repair-shop',
  },
  {
    id: 'long-distance',
    title: 'Long Distance Towing',
    description: 'Runs across Florida at a reduced per-mile rate.',
    kind: 'tow',
    page: 'long-distance-towing',
  },
  {
    id: 'car-home-service',
    title: 'Car Home Service',
    description: 'Cannot drive it home tonight? We bring you and your car — you ride in the cab.',
    kind: 'tow',
    page: 'car-home-service',
  },
  {
    id: 'jump-start',
    title: 'Jump Start',
    description: 'Mobile service: dead battery boosted where the car stands, and checked that it holds.',
    kind: 'roadside',
    page: 'jump-start',
  },
  {
    id: 'fuel-delivery',
    title: 'Fuel Delivery',
    description: 'Gas or diesel brought to you — enough to reach the nearest station.',
    kind: 'roadside',
    page: 'fuel-delivery',
  },
  {
    id: 'flat-tire',
    title: 'Flat Tire',
    description: 'We put your spare on. No spare or a damaged wheel — we tow it to a tire shop.',
    kind: 'roadside',
    page: 'flat-tire-towing',
  },
  {
    id: 'roadside',
    title: 'Roadside Help',
    description: 'Stalled on a shoulder or in a lot — fixed on the spot, or towed if it cannot be.',
    kind: 'roadside',
    page: 'roadside-assistance',
  },
];
