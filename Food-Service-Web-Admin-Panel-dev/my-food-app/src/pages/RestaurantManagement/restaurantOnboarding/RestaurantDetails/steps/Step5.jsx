import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./style.css";
import { ToggleSwitch } from "../../../../../components";
import { step5Options } from "../../constants";
const Step5 = () => {
  return (
    <div>
      <h3 className="fs-4">Delivery Setup</h3>
      <div className="p-3">
        {step5Options.map((option, index) => (
          <div className={`flex items-center gap-2 py-2`} key={index}>
            <input
              id={`check-${index}`}
              type="checkbox"
              className="form-check-input m-0"
              style={{ height: 16, width: 16, outline: "none" }}
            />
            <label
              htmlFor={`check-${index}`}
              className="form-check-label flex items-center fs-6"
            >
              {option.title}
            </label>
            <div className="info-icon-wrapper bg-white align-self-start">
              <AiOutlineInfoCircle
                color={"#00000066"}
                className=" cursor-pointer"
                size={20}
              />
              <div className="custom-tooltip">{option.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <span className="text-custom-primary fw-semibold me-3">
          Delivery Status
        </span>
        <ToggleSwitch />
      </div>
    </div>
  );
};

export default Step5;
