import apiClient from "@api/api";
import { MarketItemTypes, TabTypes } from "@api/types/marketDetail.types";
import { URLS } from "@api/urls";
import { useQuery } from "@tanstack/react-query";

export const useMarketDetail = (
  enabled = true,
  marketId: string,
  type: string
) => {
  return useQuery({
    queryKey: [
      type === TabTypes.BUY || type === TabTypes.SELL
        ? `${URLS.MARKET_DETAIL}_${type}`
        : URLS.MARKET_TRADE,
      marketId,
    ],
    queryFn: async () => {
      let url: string;

      if (type === TabTypes.TRADE) {
        url = `${URLS.MARKET_TRADE}${marketId}/`;
      } else if (type === TabTypes.SELL) {
        url = `${URLS.MARKET_DETAIL}${marketId}/?type=sell`;
      } else if (type === TabTypes.BUY) {
        url = `${URLS.MARKET_DETAIL}${marketId}/?type=buy`;
      } else {
        throw new Error("Invalid type provided");
      }

      if (!url) {
        throw new Error("URL is undefined");
      }

      const response = await apiClient.get<MarketItemTypes[]>(url);
      return response.data;
    },
    // refetchInterval: 3000,
    enabled,
    refetchOnWindowFocus: false,
  });
};
