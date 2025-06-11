import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Search, CustomFilterDropdown, ItemCard } from "../../../../components";
import { filterOptions } from "../constants";

const ActiveMenu = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleAccordion = (accordion) => {
    setActiveAccordion(activeAccordion === accordion ? null : accordion);
    setActiveSubAccordion(null);
  };

  const toggleSubAccordion = (subAccordion) => {
    setActiveSubAccordion(
      activeSubAccordion === subAccordion ? null : subAccordion
    );
  };
  const handleFilterChange = (updatedFilters) => {
    console.log("Selected Filters:", updatedFilters);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 py-3">
        {/* Left Sidebar - Accordion */}
        <div className="p-3 border rounded bg-gray-100 flex flex-col justify-between h-full">
          {/* Accordion Section */}
          <div>
            {/* Accordion Item */}
            <div className="border-b">
              <div
                className="flex justify-between items-center py-3 px-3 cursor-pointer"
                onClick={() => toggleAccordion("beverages")}
              >
                <span>Beverages (3)</span>
                {activeAccordion === "beverages" ? (
                  <FiChevronDown size={18} />
                ) : (
                  <FiChevronRight size={18} />
                )}
              </div>
              {activeAccordion === "beverages" && (
                <div>
                  {/* Sub Accordion */}
                  <div
                    className="flex justify-between items-center py-3 pl-6 pr-3 border-t cursor-pointer font-medium"
                    onClick={() => toggleSubAccordion("hotBeverages")}
                  >
                    <span>Hot Beverages (3)</span>
                    {activeSubAccordion === "hotBeverages" ? (
                      <FiChevronDown size={18} />
                    ) : (
                      <FiChevronRight size={18} />
                    )}
                  </div>
                  {activeSubAccordion === "hotBeverages" && (
                    <ul className="pl-10 py-3 flex flex-col gap-2 text-sm">
                      <li>Coffee</li>
                      <li>Tea</li>
                      <li>Hot Chocolate</li>
                    </ul>
                  )}
                </div>
              )}
            </div>

           
          </div>

          {/* Add Button */}
          <div className="mt-3 text-center">
            <button className="w-full border border-orange-500 text-orange-500 rounded py-2 hover:bg-orange-50">
              Add On Groups (5)
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="py-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Menu</h3>
            <div className="flex gap-3">
              <Search setSearchTerm={setSearchTerm} />
              <CustomFilterDropdown
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <ItemCard
              handleOnClick={()=>
                navigate("/restaurant-management/menu/view-item")
              }
              status="Approved"
            />
            <ItemCard
              handleOnClick={()=>
                navigate("/restaurant-management/menu/view-item")
              }
              status="Approved"
            />
            <ItemCard
              handleOnClick={()=>
                navigate("/restaurant-management/menu/view-item")
              }
              status="Approved"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveMenu;
