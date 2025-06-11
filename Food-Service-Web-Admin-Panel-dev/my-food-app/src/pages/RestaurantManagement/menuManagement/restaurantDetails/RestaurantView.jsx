import { Container, Row, Col } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { Breadcrumbs, HeaderCard } from "../../../../components";
import { restaurantViewCard } from "../constants";
import ActiveMenu from "./ActiveMenu";
import PendingApproval from "./PendingApproval";
import ChangesRequested from "./ChangesRequested";
import History from "./History";
import "./style.css";

const RestaurantView = () => {
  const [activeTab, setActiveTab] = useState("activeMenu");

  const breadcrumbItems = [
    {
      name: "Menu Management",
      link: "/restaurant-management/menu",
    },
    { name: "Restaurant Details" },
  ];

  return (
    <div>
      <Container fluid className="p-3">
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          {/* Left Side - md:8 */}
          <div className="md:w-2/3 flex flex-wrap items-center gap-5">
            <h1 className="font-bold text-xl">Biyani Hub</h1>

            <div>
              <span className="text-gray-500">FSSAI No. </span>
              <span className="font-bold">1234567890</span>
            </div>

            <div className="flex items-center gap-2 font-medium">
              <FaLocationDot className="text-yellow-500" />
              Gandhi Nagar, Indore, M.P.
            </div>
          </div>

          {/* Right Side - md:4 */}
          <div className="md:w-1/3 flex justify-start md:justify-end">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurantViewCard.map((card, index) => (
            <div key={index}>
              <HeaderCard
                count={card.count}
                heading={card.heading}
                icon={card.icon}
              />
            </div>
          ))}
        </div>


        <div className="tabs-container mt-4 p-4 rounded bg-white">
          <div className="flex items-center justify-between  tabs-row">
            <div className="flex gap-5">
              <h6
                onClick={() => {
                  setActiveTab("activeMenu");
                }}
                className={`${
                  activeTab === "activeMenu" ? "active-bottom" : "opacity-50"
                } text-blue cursor-pointer pb-2 m-0 px-3`}
              >
                Active Menu
              </h6>
              <h6
                onClick={() => {
                  setActiveTab("pendingApproval");
                }}
                className={`${
                  activeTab === "pendingApproval"
                    ? "active-bottom"
                    : "opacity-50"
                } text-blue cursor-pointer  pb-2 m-0 px-3`}
              >
                Pending Approval
              </h6>
              <h6
                onClick={() => {
                  setActiveTab("changesRequested");
                }}
                className={`${
                  activeTab === "changesRequested"
                    ? "active-bottom"
                    : "opacity-50"
                } text-blue cursor-pointer  pb-2 m-0 px-3`}
              >
                Changes Requested
              </h6>
            </div>
            <h6
              onClick={() => {
                setActiveTab("history");
              }}
              className={`${
                activeTab === "history" ? "active-bottom" : "opacity-50"
              } text-blue cursor-pointer  pb-2 m-0 px-3 flex items-center gap-2`}
            >
              <FaHistory size={20} /> History
            </h6>
          </div>

          {activeTab === "activeMenu" && (
            <>
              <ActiveMenu />
            </>
          )}
          {activeTab === "pendingApproval" && (
            <>
              <PendingApproval />
            </>
          )}
          {activeTab === "changesRequested" && (
            <>
              <ChangesRequested />
            </>
          )}
          {activeTab === "history" && (
            <>
              <History />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RestaurantView;
