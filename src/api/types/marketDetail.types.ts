export enum TabTypes {
  "BUY" = "buy",
  "SELL" = "sell",
  "TRADE" = "trade",
}
export interface MarketItemTypes {
  amount: string;
  price: string;
  value: string;
  remain: string;
  orders?: OrderTypes[];
}
export interface OrderTypes {
  match_amount: string;
  match_id: string;
  price: string;
  time: number;
  type: string;
  value: string;
  amount: string;
}
