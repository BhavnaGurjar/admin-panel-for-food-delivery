import DeliveryPartnerRoute from "./DeliveryPartnerRoute";
import OrderManagementRoute from "./OrderManagementRoute";
import { Dashboard, Home, PageNotFound } from "../pages";
import { AuthRoute } from "./AuthRoute";
import { appRouteConstants } from "./routesConstants";
import CustomerManagement from "./CustomerRoute";
import { Routes, Route } from "react-router-dom";
import RestaurantRoute from "./RestaurantRoute";
import { DashboardLayout } from "../layout";
import ContentRoute from "./ContentRoute";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<DashboardLayout />}>
        <Route path={appRouteConstants.dashboard} element={<Dashboard />} />
        <Route
          path={appRouteConstants.restaurantManagement}
          element={<RestaurantRoute />}
        />
        <Route
          path={appRouteConstants.orderManagement}
          element={<OrderManagementRoute />}
        />
        <Route
          path={appRouteConstants.deliveryPartnerManagement}
          element={<DeliveryPartnerRoute />}
        />
        <Route
          path={appRouteConstants.contentTermsManagement}
          element={<ContentRoute />}
        />
        <Route
          path={appRouteConstants.customerManagement}
          element={<CustomerManagement />}
        />
      </Route>
      <Route path={appRouteConstants.pageNotFound} element={<PageNotFound />} />
      <Route path={appRouteConstants.authentication} element={<AuthRoute />} />
    </Routes>
  );
};

export default AppRoute;
