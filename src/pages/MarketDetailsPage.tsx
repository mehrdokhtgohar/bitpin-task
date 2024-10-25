import React from "react";
import Header from "@components/Header";

import "@styles/marketDetail/market-details-page.scss";

import MarketDetail from "@components/marketDetails/MarketDetail";
const MarketDetailsPage = () => {
  return (
    <div className="market-detail-page">
      <Header />
      <MarketDetail />
    </div>
  );
};

export default MarketDetailsPage;
