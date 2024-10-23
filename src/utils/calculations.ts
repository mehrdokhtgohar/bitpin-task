import { MarketItemTypes } from "@api/types/marketDetail.types";
import Decimal from "decimal.js";

const accumulateTotals = (data: MarketItemTypes[]) => {
  let totalRemain = new Decimal(0);
  let totalValue = new Decimal(0);
  let totalWeightedPrice = new Decimal(0);
  let totalWeight = new Decimal(0);

  data.forEach((item) => {
    const remain = new Decimal(item.remain || 0);
    const value = new Decimal(item.value || 0);
    const price = new Decimal(item.price || 0);

    totalRemain = totalRemain.plus(remain);
    totalValue = totalValue.plus(value);
    totalWeightedPrice = totalWeightedPrice.plus(price.times(remain));
    totalWeight = totalWeight.plus(remain);
  });

  return { totalRemain, totalValue, totalWeightedPrice, totalWeight };
};
export const calculateSumsAndWeightedAverage = (data: MarketItemTypes[]) => {
  if (!data || data.length === 0) {
    return {
      totalRemain: "0.00",
      totalValue: "0.00",
      weightedAveragePrice: "0.00",
    };
  }

  const { totalRemain, totalValue, totalWeightedPrice, totalWeight } =
    accumulateTotals(data);

  const weightedAveragePrice = totalWeight.isZero()
    ? new Decimal(0)
    : totalWeightedPrice.div(totalWeight);

  return {
    totalRemain: totalRemain.toFixed(2),
    totalValue: totalValue.toFixed(2),
    weightedAveragePrice: weightedAveragePrice.toFixed(2),
  };
};

export const calculateWeightedPriceAndTotal = (
  data: MarketItemTypes[],
  percentageOfRemain: Decimal
) => {
  let totalWeightedPrice = new Decimal(0);
  let totalPayment = new Decimal(0);
  let remainingToConsider = percentageOfRemain;

  for (const item of data) {
    const price = new Decimal(item.price);
    const remain = new Decimal(item.remain);

    if (remainingToConsider.lessThanOrEqualTo(0)) break;

    const portionOfRemain = Decimal.min(remainingToConsider, remain);
    totalWeightedPrice = totalWeightedPrice.plus(price.times(portionOfRemain));
    totalPayment = totalPayment.plus(price.times(portionOfRemain));
    remainingToConsider = remainingToConsider.minus(portionOfRemain);
  }

  const weightedPrice = totalWeightedPrice.div(percentageOfRemain);

  return {
    weightedPrice: weightedPrice.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
  };
};
