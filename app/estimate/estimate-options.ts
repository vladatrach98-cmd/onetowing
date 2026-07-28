/**
 * Варианты «что случилось» для калькулятора.
 *
 * ВАЖНО: цифр здесь нет. Буксировка считается по единой формуле владельца
 * (см. app/lib/pricing.ts), дорожная помощь — «цена по телефону», потому что
 * реальных цен на неё нам не давали, а выдумывать нельзя.
 */

export type EstimateOption = {
  id: string;
  label: string;
  description: string;
  kind: 'tow' | 'roadside';
  /** Спрашивать ли, куда везти машину. */
  needsDestination: boolean;
};

export const ESTIMATE_OPTIONS: EstimateOption[] = [
  {
    id: 'wont-drive',
    label: 'Car won’t drive — needs a tow',
    description: 'Engine, transmission or anything else that leaves the car parked.',
    kind: 'tow',
    needsDestination: true,
  },
  {
    id: 'accident',
    label: 'Accident or collision',
    description: 'We load the car and take it to a body shop, storage or home.',
    kind: 'tow',
    needsDestination: true,
  },
  {
    id: 'wheels-locked',
    label: 'Wheels won’t roll / no key',
    description: 'Seized brakes, locked wheels or a missing key — loaded on dollies.',
    kind: 'tow',
    needsDestination: true,
  },
  {
    id: 'transport',
    label: 'Move a car (transport)',
    description: 'A car you bought, a project car, or moving one across town.',
    kind: 'tow',
    needsDestination: true,
  },
  {
    id: 'battery',
    label: 'Dead battery',
    description: 'Jump start on the spot. If it won’t hold, we tow it.',
    kind: 'roadside',
    needsDestination: false,
  },
  {
    id: 'flat-tire',
    label: 'Flat tire',
    description: 'Spare mounted on the spot, or a tow to the nearest tire shop.',
    kind: 'roadside',
    needsDestination: false,
  },
  {
    id: 'lockout',
    label: 'Keys locked inside',
    description: 'We open most vehicles without damage.',
    kind: 'roadside',
    needsDestination: false,
  },
  {
    id: 'out-of-fuel',
    label: 'Out of gas',
    description: 'Enough fuel delivered to reach the nearest station.',
    kind: 'roadside',
    needsDestination: false,
  },
];
