import React from "react";
import { Route, Routes } from "react-router-dom";
import { deliveryPartnerRouteConstants } from "./routesConstants";
import {
  Application,
  Dashboard,
  PartnerDetails,
  PartnerDetailsAll,
  ViewOrder,
  LiveActivityMonitoring,
} from "../pages/DeliveryPartnerManagement";
import AllPartners from "../pages/DeliveryPartnerManagement/allPartners";

const DeliveryPartnerRoute = () => {
  return (
    <Routes>
      <Route
        path={deliveryPartnerRouteConstants.dashboard}
        element={<Dashboard />}
      />
      <Route
        path={deliveryPartnerRouteConstants.application}
        element={<Application />}
      />
      <Route
        path={deliveryPartnerRouteConstants.partnerDetails}
        element={<PartnerDetails />}
      />
      <Route
        path={deliveryPartnerRouteConstants.allPartners}
        element={<AllPartners />}
      />
      <Route
        path={deliveryPartnerRouteConstants.partnerDetailsAll}
        element={<PartnerDetailsAll />}
      />
      <Route
        path={deliveryPartnerRouteConstants.viewOrder}
        element={<ViewOrder />}
      />
      <Route
        path={deliveryPartnerRouteConstants.liveActivity}
        element={<LiveActivityMonitoring />}
      />
    </Routes>
  );
};

export default DeliveryPartnerRoute;
