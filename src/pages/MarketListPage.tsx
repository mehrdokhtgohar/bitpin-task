import React, { lazy } from "react";

const MarketList = lazy(() => import("@components/MarketList"));
import Header from "@components/Header";

const MarketListPage = () => {
  return (
    <div className="market-list-page">
      <Header />
      <MarketList />
    </div>
  );
};

export default MarketListPage;
