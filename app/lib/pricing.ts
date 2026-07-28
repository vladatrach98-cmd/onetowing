import { PRICING } from './constants';

/**
 * Расчёт ПРИМЕРНОЙ цены. Одна и та же функция работает и в браузере (калькулятор),
 * и на сервере (текст сообщения в Telegram) — чтобы цифры никогда не разошлись.
 *
 * Формула владельца:
 *   $95 = выезд до 10 миль + погрузка + буксировка до 10 миль
 *   каждая миля сверх включённых — $5
 *   дальняя буксировка — $3 за милю по всему маршруту
 *
 * Из двух тарифов берём тот, что ДЕШЕВЛЕ для клиента. Иначе цена скакала бы:
 * по старому правилу «$3 только от 50 миль» поездка на 49 миль стоила $290,
 * а на 50 миль — $245, то есть длиннее = дешевле. Тарифы сравниваются в нуле
 * при 25 милях, поэтому фактически дальний тариф включается с 25-й мили.
 */

export type EstimateInput = {
  /** Мили от базы до клиента (подъезд). */
  approachMiles: number;
  /** Мили от клиента до места назначения. 0 — если машину никуда не везём. */
  towMiles: number;
};

export type EstimateResult = {
  base: number;
  extraApproachMiles: number;
  approachCharge: number;
  towCharge: number;
  /** Ставка, по которой посчитана буксировка ($5 обычная / $3 дальняя). */
  towMileRate: number;
  isLongDistance: boolean;
  /** Средняя точка расчёта. Клиенту показываем не её, а вилку low–high. */
  mid: number;
  low: number;
  high: number;
};

const roundTo5 = (value: number) => Math.round(value / 5) * 5;

/**
 * С какой мили дальний тариф становится выгоднее обычного.
 * (t − включённые) × $5 = t × $3  →  t = включённые × 5 / (5 − 3) = 25 миль.
 */
export const LONG_DISTANCE_FROM_MILES = Math.ceil(
  (PRICING.includedTowMiles * PRICING.extraMileRate) / (PRICING.extraMileRate - PRICING.longDistanceMileRate),
);

export function estimate({ approachMiles, towMiles }: EstimateInput): EstimateResult {
  const approach = Math.max(0, approachMiles);
  const tow = Math.max(0, towMiles);

  const extraApproachMiles = Math.max(0, approach - PRICING.includedApproachMiles);
  const approachCharge = extraApproachMiles * PRICING.extraMileRate;

  const standardTowCharge = Math.max(0, tow - PRICING.includedTowMiles) * PRICING.extraMileRate;
  const longDistanceTowCharge = tow * PRICING.longDistanceMileRate;

  // Клиент всегда платит по тому тарифу, который для него дешевле.
  const isLongDistance = longDistanceTowCharge < standardTowCharge;
  const towCharge = isLongDistance ? longDistanceTowCharge : standardTowCharge;
  const towMileRate = isLongDistance ? PRICING.longDistanceMileRate : PRICING.extraMileRate;

  const mid = PRICING.baseFee + approachCharge + towCharge;

  return {
    base: PRICING.baseFee,
    extraApproachMiles,
    approachCharge,
    towCharge,
    towMileRate,
    isLongDistance,
    mid,
    // Вилка, а не фиксированная цена: реальная работа бывает и легче, и тяжелее,
    // а торг оставляем владельцу. Ниже базы $95 не опускаемся никогда.
    low: Math.max(PRICING.baseFee, roundTo5(mid * 0.9)),
    high: roundTo5(mid * 1.15),
  };
}

export const usd = (value: number) => `$${Math.round(value).toLocaleString('en-US')}`;
