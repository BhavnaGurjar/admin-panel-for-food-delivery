import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Icons } from "../../../../../assets";
import { TextInput } from "../../../../../components";
import { useGetBankDetailsQuery } from "../../../../../apis/restaurant";

const Step4 = () => {
  const location = useLocation();
  const { RestaurantId, Id } = location.state || {};
  const { data } = useGetBankDetailsQuery({ id: RestaurantId });

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      bankName: "N/A", 
      accountNumber: data?.data?.bankAccountNumber || "N/A",
      ifscCode: data?.data?.ifscCode || "N/A",
      accountType: data?.data?.bankAccountType || "N/A",
      accountHolderName: data?.data?.name || "N/A",
    },
  });

  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-satoshi font-bold">Bank Details Setup</h3>

      <div className="flex items-center mt-4 mb-6 gap-2">
        <span className="text-base text-blue font-semibold">Bank Details</span>
        <div className="flex flex-row items-center justify-center gap-1 text-xs bg-success-subtle border border-[rgba(3,188,68,0.2)] text-success px-2 py-1 rounded-lg font-semibold">
          <Icons.Checked2 />
          <span>Verified</span>
        </div>
      </div>

      <div className="lg:mt-5 md:mt-7 md:pl-5 lg:pl-0">
        <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
          <TextInput
            disabled={true}
            id="bankName"
            formik={formik}
            label="Bank Name"
            placeholder="Static Bank Name"
          />

          <TextInput
            disabled={true}
            id="accountNumber"
            formik={formik}
            label="Bank Account Number"
            placeholder="Enter Account Number"
          />
        </div>

        <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
          <TextInput
            disabled={true}
            id="ifscCode"
            formik={formik}
            label="IFSC Code"
            placeholder="Enter IFSC"
          />

          <TextInput
            disabled={true}
            id="accountType"
            formik={formik}
            label="Account Type"
            placeholder="Enter Type"
          />
        </div>

        <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
          <TextInput
            disabled={true}
            id="accountHolderName"
            formik={formik}
            label="Account Holder Name"
            placeholder="Enter Name"
          />
        </div>
      </div>
    </div>
  );
};


export default Step4;
