import { TabTypes } from "@api/types/markets.types";
import Decimal from "decimal.js";

export const displayNumber = (price: string, currency?: TabTypes) => {
  try {
    if (price) {
      const decimalPrice = new Decimal(price);
      const formattedPrice = decimalPrice
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const currencySymbol = currency === TabTypes.USDT ? "تتر" : "تومان";
      const resultNumber = `${formattedPrice} ${
        currency ? currencySymbol : ""
      }`;
      return resultNumber;
    }
  } catch (error) {
    console.error("Error parsing price:", error);
    return "Error";
  }
};
