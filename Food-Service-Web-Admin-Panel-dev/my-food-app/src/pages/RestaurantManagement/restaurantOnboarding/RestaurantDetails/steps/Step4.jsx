import React from "react";
import { useFormik } from "formik";

import { TextInput } from "../../../../../components";

const Step4 = () => {
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      ifscCode: "",
      accountType: "",
      accountHolderName: "",
    },
  });

  return (
    <div>
      <h3 className="fs-4 primary-font fw-semibold">Bank Details Setup</h3>
      <div className="mt-4">
        <div className="">
          <div className="flex items-center justify-start gap-3">
            <TextInput
              disabled={true}
              id="accountNumber"
              formik={formik}
              label="Bank Account Number"
              placeholder={"Bank Account Number"}
            />
            <TextInput
              disabled={true}
              id="ifscCode"
              formik={formik}
              label="IFSC Code"
              placeholder={"IFSC Code"}
            />
          </div>
          <div className="flex items-center justify-start gap-3 mt-4">
            <TextInput
              disabled={true}
              id="accountType"
              formik={formik}
              label="Account Type"
              placeholder={"Account Type"}
            />
            <TextInput
              disabled={true}
              id="accountHolderName"
              formik={formik}
              label="Account Holder Name"
              placeholder={"Account Holder Name"}
            />
          </div>
        </div>
        <div className="flex flex-row align-items-start gap-3 pt-5">
          <input
            id="check"
            type="checkbox"
            className="mt-1 cursor-pointer"
            style={{ width: "20px", height: "20px" }}
          />
          <label htmlFor="check" className="m-0 w-50 fs-7">
            Checked that the above tax, charge and commission that will be
            applied at the time of payout.
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step4;
