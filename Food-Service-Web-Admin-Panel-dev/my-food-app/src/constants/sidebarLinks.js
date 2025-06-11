import { Icons } from "../assets";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Icons.Dashboard,
  },
   {
    name: "Orders",
    path: "/order-management/dashboard",
    icon: Icons.Orders,
    subLinks: [
      {
        name: "Dashboard",
        path: "/order-management/dashboard",
      },
      {
        name: "Active Orders",
        path: "/order-management/active-orders",
      },
      { name: "Order History", path: "/order-management/order-history" },
      {
        name: "Refunds & Disputes",
        path: "/order-management/refunds-disputes",
      },
      {
        name: "Notification & Alerts",
        path: "/order-management/notifications",
      },
      { name: "Analytics & Reports", path: "/order-management/analytics" },
    ],
  },
  {
    name: "Restaurants",
    path: "/restaurant-management/approvals",

    icon: Icons.Restaurant,
    subLinks: [
      {
        name: "Approvals ",
        path: "/restaurant-management/approvals",
      },
      {
        name: "Onboarding",
        path: "/restaurant-management/onboarding",
      },
      { name: "Menu", path: "/restaurant-management/menu" },
      {
        name: "All Restaurants",
        path: "/restaurant-management/all-restaurants",
      },
      {
        name: "Performance Insights",
        path: "/restaurant-management/performance",
      },
      { name: "Order History", path: "/restaurant-management/orders" },
      {
        name: "Complaints",
        path: "/restaurant-management/complaints",
      },
      {
        name: "Live Activity",
        path: "/restaurant-management/live-activity",
      },
      {
        name: "View Order",
        path: "/restaurant-management/view-order",
      },
      // { name: "Payouts & Commissions", path: "/restaurant-management/payouts" },
      { name: "Notifications", path: "/restaurant-management/notifications" },
    ],
  },
   {
    name: "Customers",
    path: "/customer-management/live-activity",
    icon: Icons.Users,
    subLinks: [
      {
        name: "Live activity monitoring",
        path: "/customer-management/live-activity",
      },
      {
        name: "View Order",
        path: "/customer-management/view-order",
      },
    ],
  },
   {
    name: "Delivery Partners",
    path: "/delivery-partner-management/dashboard",
    icon: Icons.DeliveryPartner,
    subLinks: [
      {
        name: "Dashboard",
        path: "/delivery-partner-management/dashboard",
      },
      {
        name: "Application",
        path: "/delivery-partner-management/application",
      },
      {
        name: "All Partners",
        path: "/delivery-partner-management/all-partners",
      },
      {
        name: "View Order",
        path: "/delivery-partner-management/view-order",
      },
      {
        name: "Live activity monitoring",
        path: "/delivery-partner-management/live-activity",
      },
    ],
  },
  {
    name: "Finance",
    path: "/finance-management",
    icon: Icons.Finance,
  },
  {
    name: "Discounts",
    path: "/promotions-discounts",
    icon: Icons.Discounts,
  },
  {
    name: "Analytics",
    path: "/analytics-reporting",
    icon: Icons.Analytics,
  },
  {
    name: "Content and Terms",
    path: "/content-terms-management/customer",
    icon: Icons.Terms,
    subLinks: [
      {
        name: "Customer",
        path: "/content-terms-management/customer",
      },
      {
        name: "Restaurant Partner",
        path: "/content-terms-management/restaurant-partner/sla",
      },
      {
        name: "Delivery Partner",
        path: "/content-terms-management/delivery-partner",
      },
      {
        name: "Platform",
        path: "/content-terms-management/platform",
      },
    ],
  },
  //   {
  //   name: "Support and Helpdesk",
  //   path: "/support-helpdesk",
  //   icon: Icons.HelpDesk,
  // },
  {
    name: "System Logs",
    path: "/system-logs-auditing",
    icon: Icons.SystemLogs,
  },
   {
    name: "Users",
    path: "/users",
    icon: Icons.Users,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Icons.Settings,
  },
];
