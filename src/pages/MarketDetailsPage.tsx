import React from "react";
import Header from "@components/common/Header";

import "@styles/marketDetail/market-details-page.scss";

import MarketDetail from "@components/marketDetails";
const MarketDetailsPage = () => {
  return (
    <div className="market-detail-page">
      <Header />
      <MarketDetail />
    </div>
  );
};

export default MarketDetailsPage;
