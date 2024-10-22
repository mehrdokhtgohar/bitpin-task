import { useMarkets } from "@api/hooks/markets";
import { useTheme } from "@theme/ThemeContext";
import Decimal from "decimal.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const MarketList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("USDT");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const themeStyles = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };
  const { data, isLoading, isError } = useMarkets(true);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading currencies</div>;
  const filteredMarkets = data?.filter(
    (market) => market.currency2.code === activeTab
  );

  const totalPages =
    filteredMarkets && Math.ceil(filteredMarkets?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMarkets = filteredMarkets?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (totalPages && (page < 1 || page > totalPages)) return;
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
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
  const handleMarketClick = (marketId: number) => {
    navigate(`/market/${marketId}`);
  };

  return (
    <div style={themeStyles}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1>Currency List</h1>
      <div>
        <button
          onClick={() => handleTabChange("USDT")}
          disabled={activeTab === "USDT"}
        >
          USDT
        </button>
        <button
          onClick={() => handleTabChange("IRT")}
          disabled={activeTab === "IRT"}
        >
          IRT
        </button>
      </div>
      <ul>
        {paginatedMarkets?.map((market, index) => (
          <li
            key={index}
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleMarketClick(market.id)}
          >
            <img
              src={market.currency1.image}
              alt={`${market.currency2.code} icon`}
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <div>
              <strong>{`${market.currency1.code}/${market.currency2.code}`}</strong>
              <p>{market.currency1.title_fa}</p>{" "}
              <p>{displayPrice(market.price_info?.price)} </p>
            </div>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default MarketList;
