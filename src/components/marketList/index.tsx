import { useMarkets } from "@api/hooks/markets";
import { TabTypes } from "@api/types/markets.types";
import { THEMES, useTheme } from "@theme/ThemeContext";
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import "@styles/marketList/market-list.scss";
import { displayNumber } from "@utils/displayPrice";
import ThemeToggle from "@components/common/ThemeToggle";
import Tabs from "@components/marketList/Tabs";
import { darkTheme, lightTheme } from "@theme/theme";

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
  return (
    <div
      {...handlers}
      style={theme === THEMES.DARK ? darkTheme : lightTheme}
      className="market-list"
    >
      {isLoading && <p>در حال بارگزاری اطلاعات</p>}
      {isError && <p>خطایی رخ داده است.</p>}

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
                  {displayNumber(market.price_info?.price, activeTab)}
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
