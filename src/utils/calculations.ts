import { MarketItemTypes } from "@api/types/marketDetail.types";
import Decimal from "decimal.js";

export const calculateSumsAndWeightedAverage = (data: MarketItemTypes[]) => {
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

  for (let i = 0; i < data.length; i++) {
    const price = new Decimal(data[i].price);
    const remain = new Decimal(data[i].remain);

    if (remainingToConsider.greaterThan(0)) {
      const portionOfRemain = Decimal.min(remainingToConsider, remain);
      totalWeightedPrice = totalWeightedPrice.plus(
        price.times(portionOfRemain)
      );
      totalPayment = totalPayment.plus(price.times(portionOfRemain));
      remainingToConsider = remainingToConsider.minus(portionOfRemain);
    } else {
      break;
    }
  }

  const weightedPrice = totalWeightedPrice.div(percentageOfRemain);
  return { weightedPrice, totalPayment };
};
