import { FaRegCheckCircle, FaRegClock, FaEdit,FaListAlt, FaThList, FaUtensils, FaPlusCircle } from "react-icons/fa";

import { MdOutlineCancel } from "react-icons/md";

export const headerCardsData = [
  {
    count: "5,000",
    heading: "Active Restaurants",
    icon: (
      <div className="bg-success-subtle text-success rounded-circle p-2">
        <FaRegCheckCircle size={30} />
      </div>
    ),
  },
  {
    count: "1,200",
    heading: "Inactive Restaurants",
    icon: (
      <div className="bg-danger-subtle text-danger rounded-circle p-2">
        <MdOutlineCancel size={30} />
      </div>
    ),
  },
  {
    count: "750",
    heading: "Pending Approvals",
    icon: (
      <div className="bg-warning-subtle text-warning rounded-circle p-2">
        <FaRegClock size={30} />
      </div>
    ),
  },
  {
    count: "300",
    heading: "Changes Requested",
    icon: (
      <div className="bg-info-subtle text-info rounded-circle p-2">
        <FaEdit size={30} />
      </div>
    ),
  },
];
export const restaurantData = [
  {
    id: "R1234567",
    status: "Approved",
    image:
      "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1709810183.png", // Replace with actual image URL
    name: "Biryani Hub",
    isVeg: true,
    categories: 3,
    subCategories: 5,
    items: 8,
    lastUpdate: "Photo uploaded for Rajma",
    lastUpdatedAt: "3:20 PM",
    pendingApprovals: 3,
    changesRequested: 5,
  },
  {
    id: "R1234568",
    status: "Pending",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ef/8a/d2/indulge-in-the-art-of.jpg?w=600&h=-1&s=1",
    name: "Pizza Palace",
    isVeg: false,
    categories: 4,
    subCategories: 7,
    items: 10,
    lastUpdate: "Photo uploaded for Margherita",
    lastUpdatedAt: "4:15 PM",
    pendingApprovals: 1,
    changesRequested: 2,
  },
  {
    id: "R1234568",
    status: "Pending",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ef/8a/d2/indulge-in-the-art-of.jpg?w=600&h=-1&s=1",
    name: "Pizza Palace",
    isVeg: false,
    categories: 4,
    subCategories: 7,
    items: 10,
    lastUpdate: "Photo uploaded for Margherita",
    lastUpdatedAt: "4:15 PM",
    pendingApprovals: 1,
    changesRequested: 2,
  },
  {
    id: "R1234567",
    status: "Approved",
    image:
      "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1709810183.png", // Replace with actual image URL
    name: "Biryani Hub",
    isVeg: true,
    categories: 3,
    subCategories: 5,
    items: 8,
    lastUpdate: "Photo uploaded for Rajma",
    lastUpdatedAt: "3:20 PM",
    pendingApprovals: 3,
    changesRequested: 5,
  },
  {
    id: "R1234568",
    status: "Pending",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ef/8a/d2/indulge-in-the-art-of.jpg?w=600&h=-1&s=1",
    name: "Pizza Palace",
    isVeg: false,
    categories: 4,
    subCategories: 7,
    items: 10,
    lastUpdate: "Photo uploaded for Margherita",
    lastUpdatedAt: "4:15 PM",
    pendingApprovals: 1,
    changesRequested: 2,
  },
  {
    id: "R1234567",
    status: "Approved",
    image:
      "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1709810183.png", // Replace with actual image URL
    name: "Biryani Hub",
    isVeg: true,
    categories: 3,
    subCategories: 5,
    items: 8,
    lastUpdate: "Photo uploaded for Rajma",
    lastUpdatedAt: "3:20 PM",
    pendingApprovals: 3,
    changesRequested: 5,
  },
];
export const filterOptions = [
  { id: 1, label: "All" },
  { id: 2, label: "Changes Requested" },
  { id: 3, label: "Pending" },
  { id: 4, label: "Active" },
  { id: 5, label: "Inactive" },
];

export const restaurantViewCard = [
  {
    count: "5,000",
    heading: "Total Category",
    icon: (
      <div className="bg-success-subtle text-success rounded-circle p-3">
        <FaListAlt size={26} /> {/* Category Icon */}
      </div>
    ),
  },
  {
    count: "1,200",
    heading: "Total Sub-Category",
    icon: (
      <div className="bg-danger-subtle text-danger rounded-circle p-3">
        <FaThList size={26} /> {/* Sub-Category Icon */}
      </div>
    ),
  },
  {
    count: "750",
    heading: "Total Items",
    icon: (
      <div className="bg-warning-subtle text-warning rounded-circle p-3">
        <FaUtensils size={26} /> {/* Items Icon */}
      </div>
    ),
  },
  {
    count: "300",
    heading: "Total Add-ons",
    icon: (
      <div className="bg-info-subtle text-info rounded-circle p-3">
        <FaPlusCircle size={26} /> {/* Add-ons Icon */}
      </div>
    ),
  },
];
