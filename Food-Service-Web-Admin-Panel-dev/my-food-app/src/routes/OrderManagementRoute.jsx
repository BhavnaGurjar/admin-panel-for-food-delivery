import { Routes, Route } from "react-router-dom";
import { orderManagementRouteConstants } from "./routesConstants";
import { ActiveOrders, Dashboard } from "../pages/OrderManagement";
const OrderManagementRoute = () => {
  return (
    <Routes>
      <Route
        path={orderManagementRouteConstants.dashboard}
        element={<Dashboard />}
      />
      <Route
        path={orderManagementRouteConstants.activeOrders}
        element={<ActiveOrders />}
      />
    </Routes>
  );
};

export default OrderManagementRoute;
