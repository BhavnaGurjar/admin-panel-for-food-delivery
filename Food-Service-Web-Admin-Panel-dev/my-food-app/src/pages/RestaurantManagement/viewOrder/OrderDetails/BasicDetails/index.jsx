import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import DeliveryPenalties from "./DeliveryPenalties";

const BasicDetails = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  return (
    <>
      <div className="flex items-center justify-between tabs-row">
        <h3 className="text-blue">
          {activeTab === "basicInfo"
            ? "Basic Information"
            : "Refunds & Penalties"}
        </h3>

        <div className="flex">
          <div className="bg-custom-gray p-2 rounded-pill flex flex-row gap-2 mb-3">
            <button
              onClick={() => setActiveTab("basicInfo")}
              className={`rounded-pill py-2 px-3 border-0 text-secondary ${
                activeTab === "basicInfo"
                  ? "bg-custom-primary text-white"
                  : "bg-transparent tab-hover"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("refunds&Penalties")}
              className={`rounded-pill py-2 px-3 border-0 text-secondary ${
                activeTab === "refunds&Penalties"
                  ? "bg-custom-primary text-white"
                  : "bg-transparent tab-hover"
              }`}
            >
              Refunds & Penalties
            </button>
          </div>
        </div>
      </div>

      {activeTab === "basicInfo" ? <BasicInfo /> : <DeliveryPenalties />}
    </>
  );
};

export default BasicDetails;
