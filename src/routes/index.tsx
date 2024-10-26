import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import MarketDetailsPage from "@pages/MarketDetailsPage";
import "./AppRoutes.scss";

const MarketList = lazy(() => import("@pages/MarketListPage"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MarketList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/market/:marketId" element={<MarketDetailsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
