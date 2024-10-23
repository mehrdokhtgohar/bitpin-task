import { useMarkets } from "@api/hooks/markets";
import { TabTypes } from "@api/types/markets.types";
import { useTheme } from "@theme/ThemeContext";
import Decimal from "decimal.js";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const ITEMS_PER_PAGE = 10;

const MarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(TabTypes.USDT);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, isError } = useMarkets(true);

  const filteredMarkets = useMemo(() => {
    return data?.filter((market) => market.currency2.code === activeTab);
  }, [data, activeTab]);

  const totalPages =
    filteredMarkets && Math.ceil(filteredMarkets.length / ITEMS_PER_PAGE);

  const paginatedMarkets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMarkets?.slice(0, startIndex + ITEMS_PER_PAGE * currentPage);
  }, [filteredMarkets, currentPage]);

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

  const displayPrice = (price: string) => {
    try {
      if (price) {
        const decimalPrice = new Decimal(price);
        return decimalPrice.toFixed(2);
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
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div {...handlers} style={themeStyles}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1>Currency List</h1>

      <div>
        <button
          onClick={() => handleTabChange(TabTypes.USDT)}
          disabled={activeTab === TabTypes.USDT}
        >
          USDT
        </button>
        <button
          onClick={() => handleTabChange(TabTypes.IRT)}
          disabled={activeTab === TabTypes.IRT}
        >
          IRT
        </button>
      </div>

      <ul>
        {paginatedMarkets?.map((market, index) => {
          const isLastItem = index === paginatedMarkets.length - 1;
          return (
            <li
              key={index}
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleMarketClick(market.id)}
              ref={isLastItem ? lastItemRef : null}
            >
              <img
                src={market.currency1.image}
                alt={`${market.currency2.code} icon`}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <div>
                <strong>{`${market.currency1.code}/${market.currency2.code}`}</strong>
                <p>{market.currency1.title_fa}</p>
                <p>{displayPrice(market.price_info?.price)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MarketList;
