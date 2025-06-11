export const appRouteConstants = {
  dashboard: "/dashboard",
  restaurantManagement: "/restaurant-management/*",
  deliveryPartnerManagement: "/delivery-partner-management/*",
  contentTermsManagement: "/content-terms-management/*",
  orderManagement: "/order-management/*",
  customerManagement: "/customer-management/*",
  pageNotFound: "*",
  authentication: "/auth/*",
};

export const restaurantRouteConstants = {
  approvalVerification: "/approvals",
  restaurantInfo: "/approvals/restaurant-info/:id/:restaurantId/:verificationStatus/:rejectionMessage/:rejectionCount/:stepCount",
  restaurantDocs: "/approvals/restaurant-docs/:id/:restaurantId/:verificationStatus/:rejectionMessage/:rejectionCount/:stepCount",
  restaurantContract: "/approvals/restaurant-contract/:id/:restaurantId/:verificationStatus/:rejectionMessage/:rejectionCount/:stepCount",
  restaurantMenu: "/approvals/restaurant-menu/:id/:restaurantId/:verificationStatus/:rejectionMessage/:rejectionCount/:stepCount",

  restaurantOnboarding: "/onboarding",
  restaurantOnboardingDetails: "/onboarding/restaurant-details",

  // Menu Management
  restaurantMenuDashboard: "/menu",
  restaurantView: "/menu/restaurant-view",
  viewItem: "/menu/view-item",
  viewOrder: "/view-order",
  liveActivity: "/live-activity",
};

export const orderManagementRouteConstants = {
  dashboard: "/dashboard",
  activeOrders: "/active-orders",
  orderHistory: "/order-history",
  refundsDisputes: "/refunds-disputes",
  notification: "/notifications",
  analytics: "/analytics",
};

export const deliveryPartnerRouteConstants = {
  dashboard: "dashboard",
  application: "application",
  partnerDetails: "application/partner-details",
  redirectPartnerDetails: "partner-details",
  allPartners: "all-partners",
  partnerDetailsAll: "all-partners/partner-details-all",
  redirectPartnerDetailsAll: "partner-details-all",
  viewOrder: "view-order",
  liveActivity: "live-activity",
};

export const customerRouteConstants = {
  liveActivity: "live-activity",
  viewOrder: "/view-order",
};

export const contentRouteConstants = {
  addcontentTerms: "/",
  customer: "/customer",
  restaurantPartner: "/restaurant-partner",
  restaurantPartnerSLA: "/restaurant-partner/sla",
  restaurantPartnerRefundPenalty: "/restaurant-partner/refund-penalty",
  restaurantPartnerContract: "/restaurant-partner/partner-contract",
  restaurantPartnerCuisines: "/restaurant-partner/cuisines",
  restaurantPartnerItemTags: "/restaurant-partner/item-tags",
  restaurantPartnerPredefinedCategory:
    "/restaurant-partner/predefined-category",
  restaurantPartnerTaxCommissionsCharges:
    "/restaurant-partner/tax-commissions-charges",
};

export const authRouteConstants = {
  logIn: "/log-in",
  forgetPassword: "/forget-password",
};
