import { PRICING } from './constants';

/**
 * Расчёт ПРИМЕРНОЙ цены. Одна и та же функция работает и в браузере (калькулятор),
 * и на сервере (текст сообщения в Telegram) — чтобы цифры никогда не разошлись.
 *
 * Формула владельца:
 *   $95 = выезд до 10 миль + погрузка + буксировка до 10 миль
 *   каждая миля сверх включённых — $5
 *   буксировка от 50 миль — $3 за милю по всему маршруту
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

export function estimate({ approachMiles, towMiles }: EstimateInput): EstimateResult {
  const approach = Math.max(0, approachMiles);
  const tow = Math.max(0, towMiles);

  const extraApproachMiles = Math.max(0, approach - PRICING.includedApproachMiles);
  const approachCharge = extraApproachMiles * PRICING.extraMileRate;

  const isLongDistance = tow >= PRICING.longDistanceThresholdMiles;
  const towMileRate = isLongDistance ? PRICING.longDistanceMileRate : PRICING.extraMileRate;
  const towCharge = isLongDistance
    ? tow * PRICING.longDistanceMileRate
    : Math.max(0, tow - PRICING.includedTowMiles) * PRICING.extraMileRate;

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
