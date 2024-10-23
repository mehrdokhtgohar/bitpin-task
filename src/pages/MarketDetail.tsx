import { useMarketDetail } from "@api/hooks/marketDetail";
import { MarketItemTypes, TabTypes } from "@api/types/marketDetail.types";
import PriceCalculator from "@components/PriceCalculator";
import { calculateSumsAndWeightedAverage } from "@utils/calculations";
import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const ITEMS_LIMIT = 10;

const MarketDetail = () => {
  const { marketId } = useParams<{ marketId: string }>() || {};
  const [activeTab, setActiveTab] = useState(TabTypes.SELL);
  const { data, isLoading, isError, error } = useMarketDetail(
    true,
    marketId || "",
    activeTab
  );

  const displayedData = useMemo(() => {
    return activeTab === TabTypes.BUY || activeTab === TabTypes.SELL
      ? data?.orders?.slice(0, ITEMS_LIMIT)
      : data?.slice(0, ITEMS_LIMIT);
  }, [data, activeTab]);

  const { totalRemain, totalValue, weightedAveragePrice } = useMemo(() => {
    return calculateSumsAndWeightedAverage(displayedData || []);
  }, [displayedData]);

  const handleTabChange = useCallback((tab: TabTypes) => {
    setActiveTab(tab);
  }, []);

  const handleSwipe = useCallback(
    (direction: string) => {
      if (direction === "Left") {
        if (activeTab === TabTypes.TRADE) {
          handleTabChange(TabTypes.SELL);
        } else if (activeTab === TabTypes.SELL) {
          handleTabChange(TabTypes.BUY);
        }
      } else if (direction === "Right") {
        if (activeTab === TabTypes.BUY) {
          handleTabChange(TabTypes.SELL);
        } else if (activeTab === TabTypes.SELL) {
          handleTabChange(TabTypes.TRADE);
        }
      }
    },
    [activeTab, handleTabChange]
  );
  const calculatorData = useMemo(() => {
    return displayedData?.map((item: MarketItemTypes) => ({
      price: item.price,
      remain: item.remain,
      value: item.value,
    }));
  }, [displayedData]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("Left"),
    onSwipedRight: () => handleSwipe("Right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers}>
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

        {!isLoading && data && displayedData?.length > 0 ? (
          <>
            <ul>
              {displayedData.map((item: MarketItemTypes, index: number) => (
                <li key={index}>
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>

            {activeTab !== TabTypes.TRADE && (
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
          </>
        ) : (
          !isLoading && <p>No data available for the selected tab.</p>
        )}
      </div>
    </div>
  );
};

export default MarketDetail;
