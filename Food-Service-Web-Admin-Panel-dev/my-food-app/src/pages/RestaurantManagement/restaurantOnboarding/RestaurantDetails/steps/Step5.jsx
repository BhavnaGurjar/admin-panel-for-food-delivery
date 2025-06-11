import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Icons } from "../../../../../assets";
import { step5Options } from "../../constants";
import { CommonModal } from "../../../../../components";

const Step5 = ({ activated, setActivated }) => {
  const location = useLocation();
  const { stepCount } = location.state || {};
  const [activateModalShow, setActivateModalShow] = useState(false);
  const [checkboxes, setCheckboxes] = useState(
    new Array(step5Options.length).fill(false)
  );
  const handleCheckboxChange = (index) => {
    const updated = [...checkboxes];
    updated[index] = !updated[index];
    setCheckboxes(updated);
  };

  const handleActivate = async () => {
    try {
      setActivated(true);
      setActivateModalShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const allChecked = checkboxes.every(Boolean);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Delivery Setup</h3>

      <div className="mt-7 pl-2 flex flex-col gap-5">
        {step5Options.map((option, index) => (
          <div className="flex items-center gap-2" key={index}>
            <input
              id={`check-${index}`}
              disabled={stepCount>=5 || activated}
              type="checkbox"
              checked={checkboxes[index] || stepCount>=5 || activated}
              onChange={() => handleCheckboxChange(index)}
              className="w-4 h-4 mt-1 cursor-pointer text-blue-600"
            />
            <label
              htmlFor={`check-${index}`}
              className="text-gray-800 flex items-center font-medium text-sm"
            >
              {option.title}
            </label>
            <div className="relative group cursor-pointer">
              <Icons.WarnInfo
                strokeColor="#4B5548"
              />
              <div className="absolute z-10 hidden group-hover:block w-64 bg-gray-700 text-white text-xs rounded p-2 top-6 left-0 shadow-md">
                {option.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={stepCount>=5 || activated || !allChecked}
        onClick={() => setActivateModalShow(true)}
        className={`text-white text-sm font-medium px-5 py-2 mt-8 rounded transition
    ${stepCount>=5 || activated
            ? "bg-primary opacity-70 cursor-not-allowed"
            : allChecked
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }
  `}
      >
        {stepCount>=5 || activated ? "Activated" : "Save & Activate"}
      </button>


      <CommonModal
        show={activateModalShow}
        onHide={() => setActivateModalShow(false)}
        icon={<Icons.Approve />}
        heading="Activate Delivery Setup?"
        subheading="Are you sure you want to activate the delivery setup? This action will enable delivery options for your account."
        primaryButtonText="Activate"
        primaryButtonColor="text-white bg-success"
        onPrimaryAction={handleActivate}
      />
    </div>
  );
};

export default Step5;