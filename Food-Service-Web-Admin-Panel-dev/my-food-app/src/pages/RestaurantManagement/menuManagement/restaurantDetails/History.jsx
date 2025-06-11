import React, { useState } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { filterOptions } from "../constants";
import { Search, CustomFilterDropdown } from "../../../../components";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("restaurant-history");

  const handleFilterChange = (updatedFilters) => {
    console.log("Selected Filters:", updatedFilters);
  };

  const restaurantHistory = [
    {
      id: 1,
      title: "Noodles",
      category: "Food",
      subCategory: "Pasta",
      requestId: "RQ12345",
      itemId: "012345",
      dateTime: "2025-01-10 10:00 AM",
      changeType: "Photo Change",
    },
    {
      id: 2,
      title: "Spaghetti",
      category: "Food",
      subCategory: "Pasta",
      requestId: "RQ67890",
      itemId: "067890",
      dateTime: "2025-01-11 2:30 PM",
      changeType: "Description Update",
    },
    {
      id: 3,
      title: "Noodles",
      category: "Food",
      subCategory: "Pasta",
      requestId: "RQ12345",
      itemId: "012345",
      dateTime: "2025-01-10 10:00 AM",
      changeType: "Photo Change",
    },
    {
      id: 4,
      title: "Spaghetti",
      category: "Food",
      subCategory: "Pasta",
      requestId: "RQ67890",
      itemId: "067890",
      dateTime: "2025-01-11 2:30 PM",
      changeType: "Description Update",
    },
  ];

  const adminHistory = [
    {
      id: 1,
      title: "Noodles",
      status: "Approved",
      statusColor: "success",
      requestId: "RQ12345",
      adminId: "012345",
      requestDateTime: "2025-01-10 10:00 AM",
      responseDateTime: "2025-01-10 10:00 AM",
      fieldName: "Photo",
    },
    {
      id: 2,
      title: "Noodles",
      status: "Approved",
      statusColor: "success",
      requestId: "RQ12345",
      adminId: "012345",
      requestDateTime: "2025-01-10 10:00 AM",
      responseDateTime: "2025-01-10 10:00 AM",
      fieldName: "Photo",
    },
    {
      id: 3,
      title: "Noodles",
      status: "Approved",
      statusColor: "success",
      requestId: "RQ12345",
      adminId: "012345",
      requestDateTime: "2025-01-10 10:00 AM",
      responseDateTime: "2025-01-10 10:00 AM",
      fieldName: "Photo",
    },
  ];

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const FilterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6">History Management</h3>

      {/* Navigation and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-white rounded-lg shadow-sm">
          <button
            className={`px-6 py-2 rounded-l-lg font-medium transition-all ${
              activeNavTab === "restaurant-history"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveNavTab("restaurant-history")}
          >
            Restaurant History
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-medium transition-all ${
              activeNavTab === "admin-history"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveNavTab("admin-history")}
          >
            Admin History
          </button>
        </div>
        
        <div className="flex gap-3">
         <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FilterIcon />
            Filter
          </button>
        </div>
      </div>

      {/* Content */}
      {activeNavTab === "restaurant-history" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurantHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 mb-2">{item.title}</h5>
                  <p className="text-sm text-gray-500 mb-1">Category &gt; Sub-Category</p>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {item.category} &gt; {item.subCategory}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-400">Req Id:</span>{" "}
                    <span className="font-medium">{item.requestId}</span>
                    <span className="text-gray-400 ml-3">Item Id:</span>{" "}
                    <span className="font-medium">{item.itemId}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-400">Date & Time:</span>{" "}
                    <span className="font-medium">{item.dateTime}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-gray-400">Change Type:</span>{" "}
                    <span className="font-medium">{item.changeType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Deleted Item Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:col-span-2">
            <h5 className="font-semibold text-gray-800 mb-2">Noodles Deleted</h5>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 mb-2">{item.title}</h5>
                  <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {item.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-400">Req Id:</span>{" "}
                    <span className="font-medium">{item.requestId}</span>
                    <span className="text-gray-400 ml-3">Admin Id:</span>{" "}
                    <span className="font-medium">{item.adminId}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-400">Req. Date & Time:</span>{" "}
                    <span className="font-medium">{item.requestDateTime}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-400">Res. Date & Time:</span>{" "}
                    <span className="font-medium">{item.responseDateTime}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-gray-400">Field Name:</span>{" "}
                    <span className="font-medium">{item.fieldName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Deleted Item Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:col-span-2">
            <h5 className="font-semibold text-gray-800 mb-2">Noodles Deleted</h5>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;