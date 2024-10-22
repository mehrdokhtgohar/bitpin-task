import { useMarketDetail } from "@api/hooks/marketDetail";
import { TabTypes } from "@api/types/marketDetail.types";
import PriceCalculator from "@components/PriceCalculator";
import { calculateSumsAndWeightedAverage } from "@utils/calculations";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const MarketDetail = () => {
  const { marketId } = useParams<{ marketId: string }>() || {};
  const [activeTab, setActiveTab] = useState(TabTypes.SELL);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useMarketDetail(
    true,
    marketId || "",
    activeTab
  );

  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData =
    activeTab === TabTypes.BUY || activeTab === TabTypes.SELL
      ? data?.orders?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      : data?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { totalRemain, totalValue, weightedAveragePrice } =
    calculateSumsAndWeightedAverage(paginatedData || []);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleTabChange = (tab: TabTypes) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (totalPages && (page < 1 || page > totalPages)) return;
    setCurrentPage(page);
  };

  // Extract necessary data for the PriceCalculator
  const calculatorData = paginatedData?.map((item) => ({
    price: item.price,
    remain: item.remain,
    value: item.value,
  }));

  return (
    <div>
      <h1>Market Detail for {marketId}</h1>

      <div>
        <button
          onClick={() => handleTabChange(TabTypes.TRADE)}
          disabled={activeTab === TabTypes.TRADE}
        >
          Matches
        </button>
        <button
          onClick={() => handleTabChange(TabTypes.SELL)}
          disabled={activeTab === TabTypes.SELL}
        >
          Sell
        </button>
        <button
          onClick={() => handleTabChange(TabTypes.BUY)}
          disabled={activeTab === TabTypes.BUY}
        >
          Buy
        </button>
      </div>

      <div>
        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data</h2>

        {isLoading && <p>Loading...</p>}

        {isError && <p>Error: {error.message}</p>}

        {!isLoading && data && paginatedData.length > 0 ? (
          <>
            <ul>
              {paginatedData.map((item, index: number) => (
                <li key={index}>
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
            {activeTab != TabTypes.TRADE && (
              <>
                <div>
                  <h3>Summary</h3>
                  <p>Total Remain: {totalRemain}</p>
                  <p>Total Value: {totalValue}</p>
                  <p>Weighted Average Price: {weightedAveragePrice}</p>
                </div>
                <PriceCalculator calculatorData={calculatorData || []} />
              </>
            )}
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{` Page ${currentPage} of ${totalPages} `}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          !isLoading && <p>No data available for the selected tab.</p>
        )}
      </div>
    </div>
  );
};

export default MarketDetail;
