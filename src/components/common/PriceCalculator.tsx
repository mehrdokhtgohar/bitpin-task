import React, { useState, useEffect } from "react";
import Decimal from "decimal.js";
import {
  calculateSumsAndWeightedAverage,
  calculateWeightedPriceAndTotal,
} from "@utils/calculations";
import "@styles/marketDetail/price-calculator.scss";
import { THEMES, useTheme } from "@theme/ThemeContext";
import { displayNumber } from "@utils/displayPrice";
import { darkTheme, lightTheme } from "@theme/theme";

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
  const [percentage, setPercentage] = useState<number>();
  const [totalRemain, setTotalRemain] = useState<Decimal>(new Decimal(0));
  const [weightedPrice, setWeightedPrice] = useState<Decimal>(new Decimal(0));
  const [amountToPay, setAmountToPay] = useState<Decimal>(new Decimal(0));
  const { theme } = useTheme();

  useEffect(() => {
    const { totalRemain } = calculateSumsAndWeightedAverage(calculatorData);
    setTotalRemain(new Decimal(totalRemain));
  }, [calculatorData]);

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let percentageValue = parseFloat(e.target.value);

    if (e.target.value.startsWith("0") && e.target.value.length > 1) {
      percentageValue = parseFloat(e.target.value.replace(/^0+/, ""));
    }

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
    <div
      className="price-calculator"
      style={theme === THEMES.DARK ? darkTheme : lightTheme}
    >
      <label htmlFor="percentage">درصد را وارد کنید (%): </label>
      <input
        style={theme === THEMES.DARK ? darkTheme : lightTheme}
        type="number"
        id="percentage"
        value={percentage}
        onChange={handlePercentageChange}
      />

      <div
        className="result"
        style={theme === THEMES.DARK ? darkTheme : lightTheme}
      >
        <h3>برای {percentage && percentage > 0 ? percentage : ""}%:</h3>
        <div className="result-item">
          <span className="result-title">باقیمانده:</span>
          <span className="result-value">
            {percentage && percentage > 0
              ? displayNumber(totalRemain.times(percentage / 100).toString())
              : 0}
          </span>
        </div>
        <div className="result-item">
          <span className="result-title">قیمت وزنی:</span>
          <span className="result-value">
            {displayNumber(weightedPrice.toString())}
          </span>
        </div>
        <div className="result-item">
          <span className="result-title">مبلغ پرداختی:</span>
          <span className="result-value">
            {displayNumber(amountToPay.toString())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
