import { Routes, Route } from "react-router-dom";
import { restaurantRouteConstants } from "./routesConstants";
import {
  ApprovalVerification,
  MenuManagement,
  RestaurantInfo,
  RestaurantContract,
  RestaurantDetails,
  RestaurantDocuments,
  RestaurantMenu,
  RestaurantOnboarding,
  RestaurantView,
  ViewItem,
  LiveActivityMonitoring,
  ViewOrder,
} from "../pages/RestaurantManagement/index";
import { RestaurantLayout } from "../layout";

const RestaurantRoute = () => {
  return (
    <Routes>
      <Route
        path={restaurantRouteConstants.approvalVerification}
        element={<ApprovalVerification />}
      />
      <Route element={<RestaurantLayout />}>
        <Route
          path={restaurantRouteConstants.restaurantInfo}
          element={<RestaurantInfo />}
        />
        <Route
          path={restaurantRouteConstants.restaurantDocs}
          element={<RestaurantDocuments />}
        />
        <Route
          path={restaurantRouteConstants.restaurantContract}
          element={<RestaurantContract />}
        />
        <Route
          path={restaurantRouteConstants.restaurantMenu}
          element={<RestaurantMenu />}
        />
      </Route>
      <Route
        path={restaurantRouteConstants.restaurantOnboarding}
        element={<RestaurantOnboarding />}
      />
      <Route
        path={restaurantRouteConstants.restaurantOnboardingDetails}
        element={<RestaurantDetails />}
      />

      {/* Menu Management */}
      <Route
        path={restaurantRouteConstants.restaurantMenuDashboard}
        element={<MenuManagement />}
      />
      <Route
        path={restaurantRouteConstants.restaurantView}
        element={<RestaurantView />}
      />
      <Route path={restaurantRouteConstants.viewItem} element={<ViewItem />} />
      <Route
        path={restaurantRouteConstants.liveActivity}
        element={<LiveActivityMonitoring />}
      />
      <Route
        path={restaurantRouteConstants.viewOrder}
        element={<ViewOrder />}
      />
    </Routes>
  );
};

export default RestaurantRoute;
