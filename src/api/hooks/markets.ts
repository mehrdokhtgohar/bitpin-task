import apiClient from "@api/api";
import MarketTypes from "@api/types/markets.types";
import { URLS } from "@api/urls";
import { useQuery } from "@tanstack/react-query";

export const useMarkets = () => {
  return useQuery<MarketTypes[]>({
    queryKey: [URLS.MARKET_LIST],
    queryFn: async () => {
      const response = await apiClient.get<{ results: MarketTypes[] }>(
        URLS.MARKET_LIST
      );
      return response.data.results;
    },
  });
};
