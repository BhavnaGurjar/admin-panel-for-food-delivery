import { Icons } from "../../../../../assets";
import { useState } from "react";
import Incoming from "./Incoming";
import Final from "./Final";
import Preparing from "./Preparing";
import Ready from "./Ready";
import PickedUp from "./PickedUp";
import ReachedDrop from "./ReachedDrop";

const StageDetails = () => {
  const [activeButton, setActiveButton] = useState("Incoming");

  const handleButtonClick = (stage) => {
    setActiveButton(stage);
  };

  const renderIcon = () => {
    const baseClasses =
      "mb-2 flex items-center justify-center rounded-full p-2";
    switch (activeButton) {
      case "Incoming":
        return (
          <div className={`${baseClasses} bg-yellow-100`}>
            <Icons.Bell/>
          </div>
        );
      case "Preparing":
        return (
          <div className={`${baseClasses} bg-red-100`}>
            <Icons.Utensils/>
          </div>
        );
      case "Ready":
        return (
          <div className={`${baseClasses} bg-green-100`}>
            <Icons.Checked/>
          </div>
        );
      case "Picked Up":
        return (
          <div className={`${baseClasses} bg-sky-100`}>
            <Icons.Truck/>
          </div>
        );
      case "Reached Drop":
        return (
          <div className={`${baseClasses} bg-green-100`}>
            <Icons.Location size={24}/>
          </div>
        );
      case "Final":
        return (
          <div className={`${baseClasses} bg-green-100`}>
            <Icons.Checked size={24}/>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between py-3">
        <div className="flex items-center justify-center gap-2">
          {renderIcon()}
          <h4 className="text-lg font-medium mb-3">{activeButton}</h4>
        </div>
        <div className="flex items-center justify-center gap-1">
          {[
            "Incoming",
            "Preparing",
            "Ready",
            "Picked Up",
            "Reached Drop",
            "Final",
          ].map((stage) => (
            <button
              key={stage}
              onClick={() => handleButtonClick(stage)}
              className={`rounded-full md:text-xs lg:text-base md:font-medium xl:text-sm lg:font-normal py-2 px-3 xl:py-1.5 xl:px-2.5 border border-black-10 transition-colors duration-200  ${
                activeButton === stage
                  ? "bg-primary text-white border-transparent"
                  : "border-primary text-primary bg-transparent"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>
      <div className="border border-black-10 px-1 rounded-2xl">
        <div className="mt-3">
          {activeButton === "Incoming" && <Incoming />}
          {activeButton === "Preparing" && <Preparing />}
          {activeButton === "Ready" && <Ready />}
          {activeButton === "Picked Up" && <PickedUp />}
          {activeButton === "Reached Drop" && <ReachedDrop />}
          {activeButton === "Final" && <Final />}
        </div>
      </div>
    </>
  );
};

export default StageDetails;
