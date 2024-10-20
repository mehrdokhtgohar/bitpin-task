export default interface MarketTypes {
  id: number;
  currency1: CurrencyType;
  currency2: CurrencyType;
  tradable: boolean;
  otcTradable: boolean;
  coingSoon: boolean;
  forTest: boolean;
  otcSellPercent: string;
  otcBuyPercent: string;
  otcMaxBuyAmount: string;
  otcMaxSellAmount: string;
  orderBookInfo: OrderBookTypes;
  priceInfo: OrderBookTypes;
  internalPriceInfo: OrderBookTypes;
  price: string;
  title: string;
  code: string;
  title_fa: string;
  tradingViewSource: string;
  tradingViewSymbol: string;
  otcMarket: boolean;
  marketCap: string;
  volume24h: string;
  text: string;
  circulatingSupply: string;
  allTimeHigh: string;
  popularityWeight: number;
  freshnessWeight: number;
  priceIncrement: string;
}
interface CurrencyType {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  tradable: boolean;
  forTest: boolean;
  image: string;
  decimal: number;
  decimaAmount: number;
  decimalIrt: number;
  color: string;
  highRisk: boolean;
  showHighRisk: boolean;
  withdrawCommission: string;
  tagas?: TagTypes[];
  etf: boolean;
  forBinvest: boolean;
  forLoan: boolean;
  torStake: boolean;
  recommendForDepostWeight: number;
}
interface TagTypes {
  id: number;
  name: string;
  nameEn: string;
  hasChart: boolean;
}
interface OrderBookTypes {
  createdAt: string | null;
  price: string;
  change: number;
  min: string;
  max: string;
  time: string;
  mean: string;
  value: string;
  amount: string;
}
export interface PaginatedCurrencies {
  results: MarketTypes[];
  nextPage?: number;
}
