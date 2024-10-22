import React, { useState, useEffect, useCallback } from "react";
import Decimal from "decimal.js";
import { calculateWeightedPriceAndTotal } from "@utils/calculations";

interface PriceCalculatorProps {
  calculatorData: { price: number; remain: number; value: number }[];
}

const PriceCalculator = ({ calculatorData }: PriceCalculatorProps) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [totalRemain, setTotalRemain] = useState<Decimal>(new Decimal(0));
  const [weightedPrice, setWeightedPrice] = useState<Decimal>(new Decimal(0));
  const [amountToPay, setAmountToPay] = useState<Decimal>(new Decimal(0));

  const calculateTotals = useCallback(() => {
    let totalWeightedPrice = new Decimal(0);
    let totalRemain = new Decimal(0);
    let totalValue = new Decimal(0);

    calculatorData.forEach((item) => {
      const price = new Decimal(item.price);
      const remain = new Decimal(item.remain);
      const value = new Decimal(item.value);

      totalWeightedPrice = totalWeightedPrice.plus(price.times(remain));
      totalRemain = totalRemain.plus(remain);
      totalValue = totalValue.plus(value);
    });

    setTotalRemain(totalRemain);

    const weightedPrice = totalWeightedPrice.div(totalRemain);
    setWeightedPrice(weightedPrice);
  }, [calculatorData]);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentageValue = parseFloat(e.target.value);
    setPercentage(percentageValue);

    if (percentageValue > 0 && percentageValue <= 100) {
      const percentageOfRemain = totalRemain.times(percentageValue / 100);
      const { weightedPrice, totalPayment } = calculateWeightedPriceAndTotal(
        calculatorData,
        percentageOfRemain
      );

      setWeightedPrice(weightedPrice);
      setAmountToPay(totalPayment);
    }
  };

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, calculatorData]);

  return (
    <div>
      <label htmlFor="percentage">Enter Percentage (%): </label>
      <input
        type="number"
        id="percentage"
        value={percentage}
        onChange={handlePercentageChange}
      />

      <div>
        <h3>For {percentage}%:</h3>
        <p>Remain: {totalRemain.times(percentage / 100).toString()}</p>
        <p>Weighted Price: {weightedPrice.toString()}</p>
        <p>Amount to Pay: {amountToPay.toString()}</p>
      </div>
    </div>
  );
};

export default PriceCalculator;
