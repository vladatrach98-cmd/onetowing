/** 12 услуг ONE TOWING. Тексты пойдут в messages/*.json на шаге мультиязычности. */

export type ServiceKind = 'tow' | 'roadside';

export type Service = {
  id: string;
  title: string;
  description: string;
  /** 'tow' считается по формуле $95 + мили, 'roadside' — цена по телефону. */
  kind: ServiceKind;
};

export const SERVICES: Service[] = [
  {
    id: 'local-tow',
    title: 'Local Towing',
    description: 'Cars, SUVs and vans moved anywhere around Tampa Bay.',
    kind: 'tow',
  },
  {
    id: 'emergency-tow',
    title: 'Emergency Towing',
    description: 'Breakdowns and accidents on the highway or in a parking lot, day or night.',
    kind: 'tow',
  },
  {
    id: 'roadside',
    title: 'Roadside Assistance',
    description: 'Small problems fixed on the spot so you can keep driving.',
    kind: 'roadside',
  },
  {
    id: 'jump-start',
    title: 'Jump Start',
    description: 'Dead battery? We boost it and check that the car keeps running.',
    kind: 'roadside',
  },
  {
    id: 'lockout',
    title: 'Car Lockout',
    description: 'Keys locked inside — we open most vehicles without damage.',
    kind: 'roadside',
  },
  {
    id: 'tire-change',
    title: 'Tire Change',
    description: 'Your spare mounted on the spot, or a tow to the nearest tire shop.',
    kind: 'roadside',
  },
  {
    id: 'fuel-delivery',
    title: 'Fuel Delivery',
    description: 'Gas or diesel brought to you — enough to reach the nearest station.',
    kind: 'roadside',
  },
  {
    id: 'wheel-lock',
    title: 'Wheels Won’t Roll',
    description: 'Seized brakes, missing keys or locked wheels — we load it on dollies.',
    kind: 'tow',
  },
  {
    id: 'dealer-delivery',
    title: 'Delivery to a Dealership',
    description: 'Straight to the dealer service bay, handed over properly.',
    kind: 'tow',
  },
  {
    id: 'shop-delivery',
    title: 'Delivery to a Repair Shop',
    description: 'To your mechanic, or to a shop we can recommend nearby.',
    kind: 'tow',
  },
  {
    id: 'vehicle-transport',
    title: 'Vehicle Transport',
    description: 'Just bought a car or moving one across town? We haul it.',
    kind: 'tow',
  },
  {
    id: 'long-distance',
    title: 'Long Distance Towing',
    description: 'Runs over 50 miles at a reduced per-mile rate across Florida.',
    kind: 'tow',
  },
];
