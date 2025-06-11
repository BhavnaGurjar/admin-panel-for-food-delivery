import { Container, Row, Col } from "react-bootstrap";
import {
  HeaderCard,
  RestaurantCard,
  Search,
  CustomFilterDropdown,
  PaginationRow,
} from "../../../components";
import { headerCardsData, restaurantData, filterOptions } from "./constants";
import { useState } from "react";

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (updatedFilters) => {
    console.log("Selected Filters:", updatedFilters);
  };
  return (
    <div className="p-3">
      <h1 className="fw-bold primary-font mb-3 fs-4">Menu Management</h1>

     <div className="flex flex-wrap -mx-2">
  {headerCardsData.map((card, index) => (
    <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
      <HeaderCard
        count={card.count}
        heading={card.heading}
        icon={card.icon}
      />
    </div>
  ))}
</div>

      <Container fluid className="bg-white p-3 my-3 rounded-3 border">
        <div className="flex py-2 justify-between">
          <h2 className="fw-semibold fs-5">All Restaurant</h2>
          <div className="flex gap-3">
            <Search setSearchTerm={setSearchTerm} />
            <CustomFilterDropdown
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
       <div className="flex flex-wrap -mx-2">
  {restaurantData.map((restaurant, index) => (
    <div
      key={index}
      className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 px-2 mb-4"
    >
      <RestaurantCard {...restaurant} />
    </div>
  ))}
</div>

        <PaginationRow totalResults={100} resultsPerPage={4} />
      </Container>
    </div>
  );
};

export default MenuManagement;
