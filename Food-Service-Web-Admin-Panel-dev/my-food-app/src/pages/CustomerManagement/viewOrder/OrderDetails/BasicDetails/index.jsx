import { useState } from "react";
import BasicInfo from "./BasicInfo";
import DeliveryPenalties from "./DeliveryPenalties";
import { Icons } from "../../../../../assets";

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
<div className="flex gap-1 border-b border-gray-300 text-sm font-medium">
  <button
    onClick={() => setActiveTab("basicInfo")}
    className={`flex items-center gap-1 px-2.5 py-1.5 border-b-2 transition-colors duration-200 ${
      activeTab === "basicInfo"
        ? "text-primary border-primary"
        : "text-[rgba(95,94,94,1)] border-transparent hover:text-black"
    }`}
  >
    <Icons.WarnInfo
      strokeColor={
        activeTab === "basicInfo" ? "rgba(6,110,255,1)" : "rgba(95,94,94,1)"
      }
    />
    Basic Info
  </button>

  <button
    onClick={() => setActiveTab("refunds&Coupans")}
    className={`flex items-center gap-1 px-2.5 py-1.5 border-b-2 transition-colors duration-200 ${
      activeTab === "refunds&Coupans"
        ? "text-primary border-primary"
        : "text-[rgba(95,94,94,1)] border-transparent hover:text-black"
    }`}
  >
    <Icons.Hook
      strokeColor={
        activeTab === "refunds&Coupans" ? "rgba(6,110,255,1)" : "rgba(95,94,94,1)"
      }
    />
    Refunds & Coupons
  </button>
</div>


      </div>

      {activeTab === "basicInfo" ? <BasicInfo /> : <DeliveryPenalties />}
    </>
  );
};

export default BasicDetails;
