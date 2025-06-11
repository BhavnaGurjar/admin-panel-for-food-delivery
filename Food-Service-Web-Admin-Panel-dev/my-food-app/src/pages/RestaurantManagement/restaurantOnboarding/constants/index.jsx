import { FaUtensils } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

export const restaurantOnboardingCounts = [
  {
    heading: "Total Restaurants in Onboarding",
    count: "5,500",
    icon: (
      <div
        className="rounded-pill p-2"
        style={{ backgroundColor: "#4739D80D" }}
      >
        <FaUtensils style={{ color: "#4739D8", fontSize: 26 }} />
      </div>
    ),
  },
  {
    heading: "Incomplete Profile Counts",
    count: "31%",
    icon: (
      <div
        className="rounded-pill p-2"
        style={{ backgroundColor: "#4739D80D" }}
      >
        <FaUserAltSlash style={{ color: "#D83939", fontSize: 26 }} />
      </div>
    ),
  },
  {
    heading: "Pending Admin Reviews Counts",
    count: "1,900",
    icon: (
      <div
        className="rounded-pill p-2"
        style={{ backgroundColor: "#4739D80D" }}
      >
        <FaClipboardCheck style={{ color: "#FFA500", fontSize: 26 }} />
      </div>
    ),
  },
  {
    heading: "Approved/Live Restaurants",
    count: "5,800",
    icon: (
      <div
        className="rounded-pill p-2"
        style={{ backgroundColor: "#4739D80D" }}
      >
        <FaCheckCircle style={{ color: "#28A745", fontSize: 26 }} />
      </div>
    ),
  },
];

export const restaurantOnboardingTableData = [
  {
    resId: "01",
    restaurantName: "Gourmet Paradise",
    ownerName: "John Doe",
    profileStatus: "50% (3 STEP)",
    verificationStatus: "Approved",
    onboardingStatus: "Not Started",
    lastUpdated: "22/07/2024",
    action: "Edit",
  },
  {
    resId: "02",
    restaurantName: "Gourmet Paradise",
    ownerName: "John Doe",
    profileStatus: "50% (3 STEP)",
    verificationStatus: "Approved",
    onboardingStatus: "Live",
    lastUpdated: "22/07/2024",
    action: "Edit",
  },
  {
    resId: "03",
    restaurantName: "Gourmet Paradise",
    ownerName: "John Doe",
    profileStatus: "20% (3 STEP)",
    verificationStatus: "Approved",
    onboardingStatus: "In Progress",
    lastUpdated: "22/07/2024",
    action: "Edit",
  },
  {
    resId: "05",
    restaurantName: "Gourmet Paradise",
    ownerName: "John Doe",
    profileStatus: "20% (3 STEP)",
    verificationStatus: "Approved",
    onboardingStatus: "In Progress",
    lastUpdated: "22/07/2024",
    action: "Edit",
  },
];

export const tooltips = [
  {
    label: "Platform Commission",
    description:
      "The percentage of each order that the platform charges the restaurant as commission.",
    name: "platformCommission",
  },
  {
    label: "GST on Commission",
    description: "GST applicable on the platform commission.",
    name: "gstOnCommission",
  },
  {
    label: "TDS",
    description: "Tax Deducted at Source (TDS).",
    name: "tds",
  },
  {
    label: "Convenience Fee",
    description: "Convenience fee charged to customers.",
    name: "convenienceFee",
  },
];

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

export const lastUpdatedOptions = [{ id: 1, label: "Option 1" }];

export const statusOptions = [{ id: 1, label: "Option 1" }];
