import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MarketDetail from "@pages/MarketDetail";

const MarketList = lazy(() => import("@pages/MarketList"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MarketList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/market/:marketId" element={<MarketDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
