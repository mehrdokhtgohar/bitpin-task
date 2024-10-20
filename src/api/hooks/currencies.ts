import apiClient from "@api/api";
import MarketTypes from "@api/types/currencies.types";
import { URLS } from "@api/urls";
import { useQuery } from "@tanstack/react-query";

export const useCurrencies = () => {
  return useQuery<MarketTypes[]>({
    queryKey: [URLS.CURRENCIES_LIST],
    queryFn: async () => {
      const response = await apiClient.get<{ results: MarketTypes[] }>(
        URLS.CURRENCIES_LIST
      );
      return response.data.results;
    },
  });
};
