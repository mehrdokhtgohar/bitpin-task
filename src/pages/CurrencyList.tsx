import { useCurrencies } from "@api/hooks/currencies";
import Decimal from "decimal.js";
import React, { useState } from "react";

const ITEMS_PER_PAGE = 10;

const CurrencyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("USDT"); // Default tab is USDT

  const { data, isLoading, isError } = useCurrencies();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading currencies</div>;

  // Filter data based on activeTab (USDT or IRT)
  const filteredCurrencies = data?.filter(
    (currency) => currency.currency2.code === activeTab
  );

  const totalPages = Math.ceil(filteredCurrencies?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCurrencies = filteredCurrencies?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
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
  return (
    <div>
      <h1>Currency List</h1>

      {/* Tab Navigation */}
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

      {/* Currency List */}
      <ul>
        {paginatedCurrencies?.map((currency, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={currency.currency1.image}
              alt={`${currency.currency2.code} icon`}
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <div>
              <strong>{`${currency.currency1.code}/${currency.currency2.code}`}</strong>
              <p>{currency.currency1.title_fa}</p>{" "}
              <p>{displayPrice(currency.price_info?.price)} </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
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

export default CurrencyList;
