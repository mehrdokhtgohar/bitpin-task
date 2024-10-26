import { useMarketDetail } from "@api/hooks/marketDetail";
import { MarketItemTypes, TabTypes } from "@api/types/marketDetail.types";
import PriceCalculator from "@components/common/PriceCalculator";
import { calculateSumsAndWeightedAverage } from "@utils/calculations";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import MarketTabs from "./MarketTabs";

import "@styles/marketDetail/market-details.scss";
import { displayNumber } from "@utils/displayPrice";
import { THEMES, useTheme } from "@theme/ThemeContext";
import { darkTheme, lightTheme } from "@theme/theme";
import { useTranslation } from "react-i18next";

const ITEMS_LIMIT = 10;

const MarketDetail = () => {
  const { marketId } = useParams<{ marketId: string }>() || {};
  const [activeTab, setActiveTab] = useState(TabTypes.SELL);
  const { t } = useTranslation();

  const { data, isLoading, isError } = useMarketDetail(
    true,
    marketId || "",
    activeTab
  );
  const { theme } = useTheme();

  const themeStyles = {
    backgroundColor: theme === "dark" ? "#222222" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#1a1a1a" : "#4EF09D",
  };
  const displayedData =
    activeTab === TabTypes.BUY || activeTab === TabTypes.SELL
      ? data?.orders?.slice(0, ITEMS_LIMIT)
      : data?.slice(0, ITEMS_LIMIT);

  const { totalRemain, totalValue, weightedAveragePrice } =
    calculateSumsAndWeightedAverage(displayedData || []);

  const handleTabChange = (tab: TabTypes) => {
    setActiveTab(tab);
  };

  const handleSwipe = (direction: string) => {
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
  };

  const calculatorData = displayedData?.map((item: MarketItemTypes) => ({
    price: item.price,
    remain: item.remain,
    value: item.value,
  }));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("Left"),
    onSwipedRight: () => handleSwipe("Right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...swipeHandlers}
      className="market-detail"
      style={theme === THEMES.DARK ? darkTheme : lightTheme}
    >
      <h1>{marketId}</h1>

      <MarketTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="data-section">
        {isLoading && <p>{t("MARKET_DETAIL.LOADING")}</p>}

        {isError && <p>{t("MARKET_DETAIL.LOADING")}</p>}

        {!isLoading && data && displayedData?.length > 0 ? (
          <>
            <ul>
              {displayedData.map((item: MarketItemTypes, index: number) => (
                <li key={index} style={themeStyles}>
                  <p>
                    <span>{t("MARKET_DETAIL.AMOUNT")}:</span>
                    {displayNumber(item.amount)}
                  </p>
                  <p>
                    <span>{t("MARKET_DETAIL.REMAINING")}:</span>
                    {displayNumber(item.remain)}
                  </p>
                  <p>
                    <span>{t("MARKET_DETAIL.PRICE")}:</span>
                    {displayNumber(item.price)}
                  </p>
                  <p>
                    <span>{t("MARKET_DETAIL.VALUE")}:</span>
                    {displayNumber(item.value)}
                  </p>
                </li>
              ))}
            </ul>

            {activeTab !== TabTypes.TRADE && (
              <>
                <div className="summary" style={themeStyles}>
                  <p>
                    <span> {t("MARKET_DETAIL.TOTAL_REMAINING")}:</span>
                    {displayNumber(totalRemain)}
                  </p>
                  <p>
                    <span> {t("MARKET_DETAIL.TOTAL_VALUE")}:</span>
                    {displayNumber(totalValue)}
                  </p>
                  <p>
                    <span>{t("MARKET_DETAIL.WEIGHTED_AVERAGE_PRICE")}:</span>
                    {displayNumber(weightedAveragePrice)}
                  </p>
                </div>
                <div className="summary" style={themeStyles}>
                  <PriceCalculator calculatorData={calculatorData || []} />
                </div>
              </>
            )}
          </>
        ) : (
          !isLoading && <p>{t("MARKET_DETAIL.NOT_FOUND")}</p>
        )}
      </div>
    </div>
  );
};

export default MarketDetail;
