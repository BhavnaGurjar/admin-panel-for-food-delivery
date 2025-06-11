import React from "react";
import { useFormik } from "formik";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { step3 as step3Validation } from "../../../../../schema";
import { tooltips } from "../../constants";
import "./style.css";

// Validation schema
const validationSchema = step3Validation;

const Step3 = () => {
  const formik = useFormik({
    initialValues: {
      platformCommission: "",
      gstOnCommission: "",
      tds: "",
      convenienceFee: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="fs-4">Tax and Commission Setup</h3>
      <div className="mt-5">
        {tooltips.map(({ label, description, name }, index) => (
          <div className="mt-3 flex flex-row items-center" key={index}>
            <div className="flex flex-row col-4 position-relative">
              <p className="fw-semibold fs-7 m-0">{`${index + 1}. ${label}`}</p>
              <div className="info-icon-wrapper mb-2 ms-1">
                <AiOutlineInfoCircle
                  color={"#00000066"}
                  size={20}
                  className="cursor-pointer mb-1"
                />
                <div className="custom-tooltip">{description}</div>
              </div>
            </div>
            <div className="col-8">
              <input
                name={name}
                className="tax-input rounded fs-5 text-center fw-semibold"
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="text-danger fs-7">{formik.errors[name]}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row align-items-start gap-3 pt-5">
        <input
          id="check"
          type="checkbox"
          className="mt-1 cursor-pointer"
          style={{ width: "20px", height: "20px" }}
        />
        <label htmlFor="check" className="m-0 w-50 fs-7">
          Checked that the above tax, charge and commission that will be applied
          at the time of payout.
        </label>
      </div>
    </form>
  );
};

export default Step3;
