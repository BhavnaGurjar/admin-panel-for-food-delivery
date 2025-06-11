import { useState } from "react";
import PickupLocation from "./PickupLocation";
import DropLocation from "./DropLocation";
import Incoming from "./Incoming";
import OnWay from "./OnWay";
import Final from "./Final";
import { Icons } from "../../../../../assets";

const StageDetails = () => {
  const [activeButton, setActiveButton] = useState("Incoming");

  const handleButtonClick = (stage) => {
    setActiveButton(stage);
  };

  const renderIcon = () => {
    switch (activeButton) {
      case "Incoming":
        return (
          <div className="flex items-center justify-center bg-warning-subtle rounded-full p-2">
            <Icons.Bell size={24} />
          </div>
        );
      case "On the way":
        return (
          <div className="flex items-center justify-center bg-primary-subtle rounded-full p-2">
            <Icons.RouteOutline size={24} />
          </div>
        );
      case "Pickup Location":
        return (
          <div className="flex items-center justify-center bg-blue-subtle rounded-full p-2 opacity-75">
            <Icons.Truck size={24} />
          </div>
        );
      case "Drop Location":
        return (
          <div className="flex items-center justify-center bg-success-subtle rounded-full p-2 opacity-75">
            <Icons.Location size={24} />
          </div>
        );
      case "Final":
        return (
          <div className="flex items-center justify-center bg-danger-subtle rounded-full p-2">
            <Icons.CircleCancelOutline size={20} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-3 px-2 mt-4 py-1 md:gap-0">
        <div className="flex items-center text-kilamanjaro text-xl  gap-2">
          {renderIcon()}
          <h4>{activeButton}</h4>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-end gap-2 w-full md:w-auto">
          {[
            "Incoming",
            "On the way",
            "Pickup Location",
            "Drop Location",
            "Final",
          ].map((stage, index) => (
            <button
              key={stage}
              onClick={() => handleButtonClick(stage)}
              className={`rounded-full py-2 px-3 text-sm ${
                activeButton === stage
                  ? "bg-primary text-white"
                  : "border-primary border text-primary bg-transparent"
              } ${
                // Move Drop Location & Final to new line on small screens
                stage === "Drop Location" || stage === "Final" ? "md:ml-2" : ""
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 rounded-xl bg-white mt-4">
        {/* <div className="mt-3 border rounded-xl border-black-20 p-4"> */}
        {activeButton === "Incoming" && <Incoming />}
        {activeButton === "On the way" && <OnWay />}
        {activeButton === "Pickup Location" && <PickupLocation />}
        {activeButton === "Drop Location" && <DropLocation />}
        {activeButton === "Final" && <Final />}
      </div>
      {/* </div> */}
    </>
  );
};

export default StageDetails;
