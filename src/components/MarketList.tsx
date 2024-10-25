import { useMarkets } from "@api/hooks/markets";
import { TabTypes } from "@api/types/markets.types";
import { useTheme } from "@theme/ThemeContext";
import Decimal from "decimal.js";
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Tabs from "./Tabs";
import ThemeToggle from "./ThemeToggle";

import "../styles/marketList/market-list.scss";

const ITEMS_PER_PAGE = 10;

const MarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(TabTypes.USDT);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, isError } = useMarkets(true);

  const filteredMarkets = data?.filter(
    (market) => market.currency2.code === activeTab
  );

  const totalPages =
    filteredMarkets && Math.ceil(filteredMarkets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedMarkets = filteredMarkets?.slice(
    0,
    startIndex + ITEMS_PER_PAGE * currentPage
  );

  const lastItemRef = useCallback(
    (node: HTMLLIElement) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages!) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [currentPage, totalPages]
  );

  const handleTabChange = (tab: TabTypes) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleMarketClick = (marketId: number) => {
    navigate(`/market/${marketId}`);
  };

  const displayPrice = (price: string, currency: TabTypes) => {
    try {
      if (price) {
        const decimalPrice = new Decimal(price);
        const formattedPrice = decimalPrice
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const currencySymbol = currency === TabTypes.USDT ? "تتر" : "تومان";
        return `${formattedPrice} ${currencySymbol}`;
      }
    } catch (error) {
      console.error("Error parsing price:", error);
      return "Error";
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeTab === TabTypes.IRT) handleTabChange(TabTypes.USDT);
    },
    onSwipedRight: () => {
      if (activeTab === TabTypes.USDT) handleTabChange(TabTypes.IRT);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading currencies</div>;

  const themeStyles = {
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div {...handlers} style={themeStyles} className="market-list">
      <div className="fixed-header">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <ul className="market-list-items">
        {paginatedMarkets?.map((market, index) => {
          const isLastItem = index === paginatedMarkets.length - 1;
          return (
            <li
              key={index}
              onClick={() => handleMarketClick(market.id)}
              ref={isLastItem ? lastItemRef : null}
            >
              <img
                src={market.currency1.image}
                alt={`${market.currency2.code} icon`}
              />
              <div className="name-price-container">
                <div className="name">
                  <strong>{`${market.currency1.code}/${market.currency2.code}`}</strong>
                  <p className="name-fa">{market.currency1.title_fa}</p>
                </div>

                <p className="price">
                  {displayPrice(market.price_info?.price, activeTab)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MarketList;
