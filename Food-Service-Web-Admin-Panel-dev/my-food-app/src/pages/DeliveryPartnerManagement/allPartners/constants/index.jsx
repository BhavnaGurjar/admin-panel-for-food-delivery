import { IoMdCloseCircleOutline } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";

export const allPartnerCounts = [
  {
    heading: "Total Orders",
    count: "6000",
    icon: (
      <div className="rounded-pill p-2" style={{ backgroundColor: "#DFF5E4" }}>
        <TiClipboard size={22} color={"#4739D8"} />
      </div>
    ),
  },
  {
    heading: "Order Completed",
    count: "5000",
    icon: (
      <div className="rounded-pill p-2 bg-success-subtle">
        <FaRegCircleCheck size={22} color={"#228B22"} />
      </div>
    ),
  },
  {
    heading: "Order Cancelled",
    count: "100",
    icon: (
      <div className="rounded-pill p-2" style={{ backgroundColor: "#FFF4E4" }}>
        <IoMdCloseCircleOutline size={22} color="#C41E3A" />
      </div>
    ),
  },
  {
    heading: "No. of Complain",
    count: "5,800",
    icon: (
      <div className="rounded-pill p-2" style={{ backgroundColor: "#FFF4E4" }}>
        <RiErrorWarningLine size={22} color="#F69B0E" />
      </div>
    ),
  },
];

export const vehicleFilterOptions = [
  { id: 1, label: "All Vehicles" },
  { id: 2, label: "Two-Wheelers" },
  { id: 4, label: "Electric Vehicles" },
  { id: 5, label: "Bicycles" },
];

export const statusFilterOptions = [
  { id: 1, label: "All" },
  { id: 2, label: "Pending Approval" },
  { id: 3, label: "Active" },
  { id: 4, label: "Inactive" },
  { id: 5, label: "Blocked" },
  { id: 6, label: "Under Review" },
];

export const locationFilterOptions = [{ id: 1, label: "All Locations" }];

export const dateFilterOptions = [
  { id: 1, label: "Today" },
  { id: 2, label: "Last 7 Days" },
  { id: 3, label: "This Month" },
  { id: 4, label: "Last Month" },
  { id: 5, label: "Custom Range" },
];
