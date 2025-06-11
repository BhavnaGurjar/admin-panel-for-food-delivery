import { Icons } from "../../../../assets";

// export const tooltips = [
//   {
//     label: "Platform Commission",
//     description:
//       "The percentage of each order that the platform charges the restaurant as commission.",
//     name: "platformCommission",
//   },
//   {
//     label: "GST on Commission",
//     description: "GST applicable on the platform commission.",
//     name: "gstOnCommission",
//   },
//   {
//     label: "TDS",
//     description: "Tax Deducted at Source (TDS).",
//     name: "tds",
//   },
//   {
//     label: "Convenience Fee",
//     description: "Convenience fee charged to customers.",
//     name: "convenienceFee",
//   },
// ];

export const step5Options = [
  {
    title: "Enable Delivery for This Restaurant",
    description:
      "This activates the delivery option for the restaurant. Orders will be assigned to the nearest delivery partner automatically.",
  },
  {
    title: "Integrate with Delivery Partner App",
    description:
      " All delivery operations will be handled by the platform’s dedicated delivery partner app. No manual selection is required.",
  },
  {
    title: "Dynamic Delivery Time",
    description:
      " Estimated delivery times are calculated automatically based on the customer’s distance from the restaurant.",
  },
  {
    title: "Delivery Fee Auto-calculated by Partner App",
    description:
      "Delivery charges are determined dynamically by the partner app based on the distance and location. No manual fee setup is required.",
  },
];
export const onboardingStatusOptions = [
  { id: 1, label: "Live", value: "LIVE" },
  { id: 2, label: "In Progress", value: "IN_PROGRESS" },
  { id: 3, label: "Not Started", value: "NOT_STARTED" },
];

export const statusOptions = [{ id: 1, label: "Option 1" }];
