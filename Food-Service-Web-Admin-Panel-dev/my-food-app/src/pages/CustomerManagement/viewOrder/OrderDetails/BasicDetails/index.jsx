import { useState } from "react";
import BasicInfo from "./BasicInfo";
import DeliveryPenalties from "./DeliveryPenalties";

const BasicDetails = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[rgba(0,1,69,1)] text-2xl font-semibold font-satoshi">
          {activeTab === "basicInfo"
            ? "Basic Information"
            : "Refunds & Coupons"}
        </h3>

        <div className="flex">
          <div className="bg-[rgba(246,246,246,1)] p-1.5 rounded-full flex">
            <button
              onClick={() => setActiveTab("basicInfo")}
              className={`rounded-full py-1.5 px-3 border-0 focus:outline-none transition-colors duration-200 ${
                activeTab === "basicInfo"
                  ? "bg-primary text-white"
                  : "bg-transparent text-[rgba(95,94,94,1)] hover:text-black"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("refunds&Coupans")}
              className={`rounded-full py-1.5 px-3 border-0 focus:outline-none transition-colors duration-200 ${
                activeTab === "refunds&Coupans"
                  ? "bg-primary text-white"
                  : "bg-transparent text-[rgba(95,94,94,1)] hover:text-black"
              }`}
            >
              Refunds & Coupons
            </button>
          </div>
        </div>
      </div>

      {activeTab === "basicInfo" ? <BasicInfo /> : <DeliveryPenalties />}
    </>
  );
};

export default BasicDetails;
