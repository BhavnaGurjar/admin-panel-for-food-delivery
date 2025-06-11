import React from "react";
import { Route, Routes } from "react-router-dom";
import { customerRouteConstants } from "./routesConstants";
import { LiveActivityMonitoring, ViewOrder } from "../pages/CustomerManagement";

const CustomerManagement = () => {
  return (
    <Routes>
      <Route
        path={customerRouteConstants.liveActivity}
        element={<LiveActivityMonitoring />}
      />
      <Route path={customerRouteConstants.viewOrder} element={<ViewOrder />} />
    </Routes>
  );
};

export default CustomerManagement;
