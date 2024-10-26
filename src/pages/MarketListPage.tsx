import React, { lazy } from "react";

const MarketList = lazy(() => import("@components/marketList/index"));
import Header from "@components/common/Header";

const MarketListPage = () => {
  return (
    <div className="market-list-page">
      <Header />
      <MarketList />
    </div>
  );
};

export default MarketListPage;
