import React, { useState } from "react";
import { images } from "../../../../assets";
import { Search, CustomFilterDropdown, ItemCard } from "../../../../components";

// Change Details Modal Component
const ChangeDetailsModal = ({ showModal, setShowModal, selectedCard }) => {
  if (!showModal || !selectedCard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Changes ({selectedCard.changes?.length || 0})
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <div>Field</div>
            <div>Old</div>
            <div>New</div>
          </div>

          {selectedCard.changes?.map((change, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-sm">
              <div>{change.field}</div>
              <div className="flex items-center">
                {change.field === "Image" ? (
                  <img
                    src={images.itemDemo}
                    alt="Old"
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  change.oldValue
                )}
              </div>
              <div className="flex items-center">
                {change.field === "Image" ? (
                  <img
                    src={images.itemDemo}
                    alt="New"
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  change.newValue
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingApproval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("new");
  const [activePendingTab, setActivePendingTab] = useState("items");
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Mock data for existing items
  const existingItemsData = [
    {
      id: 1,
      name: "Noodles",
      itemId: "#0987654321",
      editDate: "22/07/2025",
      editTime: "3:00 AM",
      changes: [
        { field: "Name", oldValue: "Noodles", newValue: "Noodles Pasta" },
        {
          field: "Image",
          oldValue: "old_image.jpg",
          newValue: "new_image.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Pasta",
      itemId: "#1234567890",
      editDate: "21/07/2025",
      editTime: "4:00 PM",
      changes: [
        { field: "Name", oldValue: "Pasta", newValue: "Italian Pasta" },
      ],
    },
  ];

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

  const handleViewMore = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleFilterChange = (updatedFilters) => {
    console.log("Selected Filters:", updatedFilters);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-medium text-gray-800">Pending Approval</h1>
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              activeNavTab === "new"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveNavTab("new")}
          >
            New
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              activeNavTab === "existing"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveNavTab("existing")}
          >
            Existing
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Tab Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activePendingTab === tab.id
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActivePendingTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

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

        {/* Tab Content */}
        {activeNavTab === "new" && (
          <>
            {activePendingTab === "items" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((item) => (
                  <ItemCard
                                handleOnClick={()=>
                                  navigate("/restaurant-management/menu/view-item")
                                }
                                status="Approved"
                              />
                ))}
              </div>
            )}

            {activePendingTab === "category" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <label className="font-medium">North Indian</label>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activePendingTab === "sub-category" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <label className="font-medium">Punjabi Cuisine</label>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium">North Indian</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePendingTab === "add-on-group" && (
              <div className="space-y-4 mb-6">
                {[1, 2].map((group) => (
                  <div
                    key={group}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">
                        Pizza Add-on ({pizzaAddOns.length})
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Max: 4 | Min: 0
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {pizzaAddOns.map((addon, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm">{addon.name}</span>
                          <span className="text-sm font-medium">
                            ₹{addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeNavTab === "existing" && (
          <>
            {activePendingTab === "items" && (
              <div className="space-y-4 mb-6">
                {existingItemsData.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Item Id - {item.itemId}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            Revised
                          </span>
                        </div>

                        <div className="mb-3">
                          <h4 className="font-medium mb-2">
                            Changes ({item.changes.length})
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 mb-2">
                              <div>Field</div>
                              <div>Old</div>
                              <div>New</div>
                            </div>
                            {item.changes.slice(0, 1).map((change, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-3 gap-4 text-sm"
                              >
                                <div>{change.field}</div>
                                <div>{change.oldValue}</div>
                                <div>{change.newValue}</div>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleViewMore(item)}
                            className="text-blue-500 text-sm mt-2 hover:underline"
                          >
                            View More
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Edit Date - {item.editDate} | Edit Time -{" "}
                            {item.editTime}
                          </p>
                          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePendingTab === "category" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <label className="font-medium">Category1</label>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Existing
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activePendingTab === "sub-category" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <label className="font-medium">Punjabi Cuisine</label>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Existing
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium">Panjabi Curry</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePendingTab === "add-on-group" && (
              <div className="space-y-4 mb-6">
                {[1, 2].map((group) => (
                  <div
                    key={group}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">
                        Pizza Add-on ({pizzaAddOns.length})
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Max: 4 | Min: 0
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {pizzaAddOns.map((addon, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm">{addon.name}</span>
                          <span className="text-sm font-medium">
                            ₹{addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="fixed bottom-10 right-12 flex justify-end gap-3 pt-4   p-4   z-50">
          <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
            Reject
          </button>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
            Request Changes
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
            Approve
          </button>
        </div>
      </div>

      {/* Change Details Modal */}
      <ChangeDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCard={selectedCard}
      />
    </div>
  );
};

export default PendingApproval;
