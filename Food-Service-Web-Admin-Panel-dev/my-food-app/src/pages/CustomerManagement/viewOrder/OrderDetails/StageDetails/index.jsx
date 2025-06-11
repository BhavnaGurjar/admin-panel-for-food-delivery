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
      "flex items-center justify-center rounded-full p-2";
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
  <div className="flex items-center justify-center gap-2 mt-1">
    {renderIcon()}
    <h4 className="lg:text-lg text-sm font-medium">{activeButton}</h4>
  </div>

  <div className="flex items-center justify-center border-[rgba(95,94,94,0.5)] text-sm font-medium">
  {[
    { label: "Incoming", icon: Icons.Bell },
    { label: "Preparing", icon: Icons.Utensils },
    { label: "Ready", icon: Icons.Checked },
    { label: "Picked Up", icon: Icons.Truck },
    { label: "Reached Drop", icon: Icons.Location },
    { label: "Final", icon: Icons.Checked },
  ].map(({ label, icon: Icon }) => {
    const isActive = activeButton === label;
    const strokeColor = isActive
      ? "rgba(6,110,255,1)"
      : "rgba(95,94,94,1)";

    return (
      <button
        key={label}
        onClick={() => handleButtonClick(label)}
        className={`lg:px-3 py-2 md:px-2 border-b md:text-xs lg:text-sm flex items-center md:gap-0.5 lg:gap-1 transition-colors duration-200 ${
          isActive
            ? "text-primary border-b-2 border-[rgba(6,110,255,1)]"
            : "text-[rgba(95,94,94,1)] border-gray-300"
        }`}
      >
        <Icon strokeColor={strokeColor} />
        {label}
      </button>
    );
  })}
</div>

</div>

      <div className="border border-black-10 px-1 rounded-2xl mt-3">
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
