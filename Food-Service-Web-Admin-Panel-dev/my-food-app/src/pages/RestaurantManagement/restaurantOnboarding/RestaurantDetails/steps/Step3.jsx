import { useFormik } from "formik";
import { Icons } from "../../../../../assets";
import { step3 as step3Validation } from "../../../../../schema";
import { useGetTaxAndCommisionDetailsQuery } from "../../../../../apis/restaurant";

const Step3 = () => {
  const { data } = useGetTaxAndCommisionDetailsQuery();
  // console.log(data?.data);

  const formik = useFormik({
    initialValues: {
      platformCommission: "1922",
      gstOnCommission: "1822",
      convenienceFee: "0222",
      tds: "0522",
    },
    validationSchema: step3Validation,
    onSubmit: (values) => {
      // console.log("Form Values:", values);
    },
  });

  return (
    <div className="bg-white max-w-4xl w-full mx-auto p-8">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-2xl font-satoshi font-bold mb-8">
          Tax and Commission Setup
        </h3>

        <div className="space-y-4">
          {data?.data.map(({ name, listOfValues }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 mt-0"
            >
              <div className="flex items-center gap-1 w-3/4 max-w-[18.75rem]">
                <span className="text-sm font-medium whitespace-nowrap">{`${index + 1}. ${name}`}</span>
                <div className="relative group w-4 h-4 cursor-pointer flex items-center justify-center">
                 <Icons.WarnInfo strokeColor="#4B5558"/>
                  <div className="absolute left-5 top-full z-10 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 mt-1 w-48 shadow-md">
                    {name}
                  </div>
                </div>
              </div>

              <div className="w-24">
                <div className="flex items-center justify-center gap-1 border border-gray-300 bg-gray-100 rounded py-1 px-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {listOfValues[0]}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">%</span>
                </div>
                {formik.touched[name] && formik.errors[name] && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors[name]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Step3;
