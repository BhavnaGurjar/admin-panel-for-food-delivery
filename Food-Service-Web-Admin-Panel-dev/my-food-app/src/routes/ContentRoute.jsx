import { Routes, Route } from "react-router-dom";
import { contentRouteConstants } from "./routesConstants";
import { RestaurantPartnerContentLayout } from "../layout";
import {
  Cuisines,
  ItemTags,
  PartnerContract,
  PredefinedCategory,
  RefundPenalty,
  Sla,
  TaxAndCharges,
} from "../pages/ContentTermsManagement/restaurantPartner";

const ContentRoute = () => {
  return (
    <Routes>
      <Route path={contentRouteConstants.customer} />
      <Route
        path={contentRouteConstants.restaurantPartner}
        element={<RestaurantPartnerContentLayout />}
      >
        <Route
          path={contentRouteConstants.restaurantPartnerSLA}
          element={<Sla />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerRefundPenalty}
          element={<RefundPenalty />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerContract}
          element={<PartnerContract />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerCuisines}
          element={<Cuisines />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerItemTags}
          element={<ItemTags />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerPredefinedCategory}
          element={<PredefinedCategory />}
        />
        <Route
          path={contentRouteConstants.restaurantPartnerTaxCommissionsCharges}
          element={<TaxAndCharges />}
        />
      </Route>
    </Routes>
  );
};

export default ContentRoute;
