import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import DeliveryPenalties from "./DeliveryPenalties";

const BasicDetails = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  return (
    <>
      <div className="flex items-center justify-between tabs-row">
        <h3 className="text-blue font-bold text-2xl">
          {activeTab === "basicInfo"
            ? "Basic Information"
            : "Delivery Free & Penalties"}
        </h3>

        <div className="flex">
          <div className="bg-gray p-2 rounded-full bg-wild-sand flex flex-row gap-2 mb-3">
            <button
              onClick={() => setActiveTab("basicInfo")}
              className={`rounded-full px-2 py-2 border-0 text-secondary ${
                activeTab === "basicInfo"
                  ? "bg-primary text-white"
                  : "bg-transparent tab-hover"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("deliveryFree&Penalties")}
              className={`rounded-full px-2 py-2 border-0 text-secondary ${
                activeTab === "deliveryFree&Penalties"
                  ? "bg-primary text-white"
                  : "bg-transparent tab-hover"
              }`}
            >
              Delivery Free & Penalties
            </button>
          </div>
        </div>
      </div>

      {activeTab === "basicInfo" ? <BasicInfo /> : <DeliveryPenalties />}
    </>
  );
};

export default BasicDetails;
