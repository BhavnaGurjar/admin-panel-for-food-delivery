import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { filterOptions } from "../constants";
import {
  Search,
  CustomFilterDropdown,
  AddOnSelector,
} from "../../../../components";
import { images } from "../../../../assets";
import Modal from "../../../../components/Modal";

const ChangesRequested = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("existing");
  const [activePendingTab, setActivePendingTab] = useState("items");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState("");

  const tabs = [
    { id: "category", label: "Category", count: 3 },
    { id: "sub-category", label: "Sub-Category", count: 2 },
    { id: "items", label: "Items", count: 7 },
    { id: "add-on-group", label: "Add-on Group", count: 2 },
  ];

  const pizzaAddOns = [
    { name: "Mayonnaise", price: 80 },
    { name: "Cheese", price: 80 },
    { name: "Shezwan", price: 80 },
  ];

  const handleFilterChange = (updatedFilters) => {
    console.log("Selected Filters:", updatedFilters);
  };

  const data = [
    {
      id: 1,
      title: "Noodles",
      itemId: "#ITEM0987654321",
      dateTime: "2025-01-12 10:35 AM",
      fieldName: "Photo",
      description: "Update the item photo with a high-quality image.",
      oldImage: images.itemDemo,
      newImage: images.itemDemo,
    },
    {
      id: 2,
      title: "Noodles",
      itemId: "#ITEM0987654321",
      dateTime: "2025-01-12 10:35 AM",
      fieldName: "Photo",
      description: "Update the item photo with a high-quality image.",
      oldImage: images.itemDemo,
      newImage: images.itemDemo,
    },
    {
      id: 3,
      title: "Noodles",
      itemId: "#ITEM0987654321",
      dateTime: "2025-01-12 10:35 AM",
      fieldName: "Photo",
      description: "Update the item photo with a high-quality image.",
      oldImage: images.itemDemo,
      newImage: images.itemDemo,
    },
    {
      id: 4,
      title: "Noodles",
      itemId: "#ITEM0987654321",
      dateTime: "2025-01-12 10:35 AM",
      fieldName: "Photo",
      description: "Update the item photo with a high-quality image.",
      oldImage: images.itemDemo,
      newImage: images.itemDemo,
    },
  ];

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleViewItem = (item) => {
    setCurrentModal(item);
    setShowModal(true);
  };

  const handleModalAction = (action) => {
    console.log(`${action} clicked for items:`, selectedItems);
    setShowModal(false);
    setSelectedItems([]);
  };

  const FilterIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M7 12h10M11 18h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Changes Requested
        </h3>
        <div className="flex bg-white rounded-lg shadow-sm">
          <button
            className={`px-6 py-2 rounded-l-lg font-medium transition-all ${
              activeNavTab === "new"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveNavTab("new")}
          >
            New
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-medium transition-all ${
              activeNavTab === "existing"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveNavTab("existing")}
          >
            Existing
          </button>
        </div>
      </div>

      {activeNavTab === "existing" && (
        <>
          {/* Tabs and Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex bg-white rounded-full p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activePendingTab === tab.id
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActivePendingTab(tab.id)}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="flex gap-3">
                {/* Search */}
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

                {/* Filter */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          {activePendingTab === "items" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1">
                            {item.title}
                          </h5>
                          <p className="text-sm text-gray-500">{item.itemId}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleItemSelect(item.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2 text-xs text-gray-600">
                        <div>
                          <span className="text-gray-400">
                            Date & Time of Request:
                          </span>
                          <br />
                          <span className="font-medium">{item.dateTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Field Name: </span>
                          <span className="font-medium">{item.fieldName}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>

                      <button
                        onClick={() => handleViewItem(item)}
                        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        View Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="fixed bottom-12 right-16 flex gap-3 z-50">
                <button
                  onClick={() => handleModalAction("reject")}
                  className="px-6 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleModalAction("request-changes")}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => handleModalAction("approve")}
                  className="px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
              </div>
            </>
          )}

          {/* Category Tab */}
          {activePendingTab === "category" && (
            <div className="flex gap-4 flex-wrap">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between gap-4 min-w-64"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label className="font-medium text-gray-800">
                      Category{i}
                    </label>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    Existing
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sub-Category Tab */}
          {activePendingTab === "sub-category" && (
            <div className="flex gap-4 flex-wrap">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-4 min-w-64"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label className="font-medium text-gray-800">
                        Punjabi Cuisine
                      </label>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      Existing
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Category</p>
                    <p className="font-medium text-gray-800">Punjabi Curry</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add-on Group Tab */}
          {activePendingTab === "add-on-group" && (
            <Row>
              <Col md={8}>
                <AddOnSelector
                  title="Pizza Add-on"
                  options={pizzaAddOns}
                  max={4}
                  min={0}
                />
                <AddOnSelector
                  title="Pizza Add-on"
                  options={pizzaAddOns}
                  max={4}
                  min={0}
                />
              </Col>
            </Row>
          )}
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Changes (2)"
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Field</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Name</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm">Image</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Old</p>
              <div className="text-center">
                <img
                  src={images.itemDemo}
                  alt="Old"
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <p className="text-sm">Noodles</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">New</p>
              <div className="text-center">
                <img
                  src={images.itemDemo}
                  alt="New"
                  className="w-full h-20 object-cover rounded-lg mb-2"
                />
                <p className="text-sm">Noodles Pasta</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalAction("reject")}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangesRequested;
