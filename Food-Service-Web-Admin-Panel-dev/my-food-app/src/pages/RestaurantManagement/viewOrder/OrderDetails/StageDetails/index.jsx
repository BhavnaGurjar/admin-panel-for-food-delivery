import { useState } from "react";
import { FaUtensils, FaRegCheckCircle } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import Incoming from "./Incoming";
import Final from "./Final";
import Preparing from "./Preparing";
import Ready from "./Ready";
import PickedUp from "./PickedUp";

const StageDetails = () => {
  const [activeButton, setActiveButton] = useState("Incoming");

  const handleButtonClick = (stage) => {
    setActiveButton(stage);
  };

  const renderIcon = () => {
    switch (activeButton) {
      case "Incoming":
        return (
          <div className="mb-2 flex items-center justify-center bg-warning-subtle rounded-circle p-2">
            <AiOutlineBell size={24} className="text-warning" />
          </div>
        );
      case "Preparing":
        return (
          <div className="mb-2 flex items-center justify-center bg-danger-subtle rounded-circle p-2">
            <FaUtensils size={24} className="text-custom-red" />
          </div>
        );
      case "Ready":
        return (
          <div className="mb-2 flex items-center justify-center bg-success-subtle rounded-circle p-2 opacity-75">
            <FaRegCheckCircle size={24} className="text-success" />
          </div>
        );
      case "Pickedup":
        return (
          <div className="mb-2 flex items-center justify-center bg-primary-subtle rounded-circle p-2 opacity-75">
            <LuTruck size={24} className="text-primary" />
          </div>
        );
      case "Final":
        return (
          <div className="mb-2 flex items-center justify-center bg-primary-subtle rounded-circle p-2">
            <FaRegCheckCircle size={24} className="text-primary" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between py-3 ">
        <div className="flex items-center justify-center gap-2">
          {renderIcon()}
          <h4>{activeButton}</h4>
        </div>
        <div className="flex items-center justify-center gap-2">
          {["Incoming", "Preparing", "Ready", "Pickedup", "Final"].map(
            (stage) => (
              <button
                key={stage}
                onClick={() => handleButtonClick(stage)}
                className={`rounded-pill py-2 px-2  ${
                  activeButton === stage
                    ? "bg-custom-primary text-white border-0"
                    : "border-custom-primary text-custom-primary bg-transparent"
                }`}
              >
                {stage}
              </button>
            )
          )}
        </div>
      </div>
      <div className="border px-2 rounded-4">
        <div className="mt-3">
          {activeButton === "Incoming" && <Incoming />}
          {activeButton === "Preparing" && <Preparing />}
          {activeButton === "Ready" && <Ready />}
          {activeButton === "Pickedup" && <PickedUp />}
          {activeButton === "Final" && <Final />}
        </div>
      </div>
    </>
  );
};

export default StageDetails;
