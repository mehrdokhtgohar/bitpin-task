import React, { useState, useEffect } from "react";
import Decimal from "decimal.js";
import {
  calculateSumsAndWeightedAverage,
  calculateWeightedPriceAndTotal,
} from "@utils/calculations";

interface CalculatorData {
  price: string;
  remain: string;
  value: string;
  amount: string;
}

interface PriceCalculatorProps {
  calculatorData: CalculatorData[];
}

const PriceCalculator = ({ calculatorData }: PriceCalculatorProps) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [totalRemain, setTotalRemain] = useState<Decimal>(new Decimal(0));
  const [weightedPrice, setWeightedPrice] = useState<Decimal>(new Decimal(0));
  const [amountToPay, setAmountToPay] = useState<Decimal>(new Decimal(0));

  useEffect(() => {
    const { totalRemain } = calculateSumsAndWeightedAverage(calculatorData);
    setTotalRemain(new Decimal(totalRemain));
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
