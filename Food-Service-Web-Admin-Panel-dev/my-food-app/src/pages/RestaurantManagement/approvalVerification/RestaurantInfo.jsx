import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import { Icons } from "../../../assets";
import { textareaSchema } from "../../../schema";
import { useStepStore } from "../../../store/StepStore";
import { useUpdateTicketMutation } from "../../../apis/ticket";
import { CustomSpinner, CommonModal } from "../../../components";
import { useGetRestaurantByRestaurantIdQuery } from "../../../apis/restaurant";


const RestaurantInfo = () => {
  const navigate = useNavigate();
  const {
    restaurantDisplayId,
    id,
    restaurantId,
    verificationStatus,
    rejectionMessage,
    rejectionStep,
    stepCount
  } = useParams();

  const stepCountFromStore = useStepStore((state) => state.stepCount);
  const setStepCount = useStepStore((state) => state.setStep);
  const [store, setStore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [updateTicketStatus] = useUpdateTicketMutation();
  const { data: restaurantData, isLoading } =
    useGetRestaurantByRestaurantIdQuery({
      restaurantId,
      stepCount: 1,
    });
  const restaurantInfo = restaurantData?.data;

  const restaurantDetails = [
    { label: "Restaurant Id", value: restaurantDisplayId, isHighlight: true },
    { label: "Restaurant Name", value: restaurantInfo?.resName ?? "N/A" },
    { label: "Owner Name", value: restaurantInfo?.ownerName ?? "N/A" },
    { label: "Email Address", value: restaurantInfo?.ownerEmail ?? "N/A" },
    { label: "Phone Number", value: restaurantInfo?.mobileNumber ?? "N/A" },
    { label: "Area", value: restaurantInfo?.area ?? "N/A" },
    { label: "City", value: restaurantInfo?.city ?? "N/A" },
    { label: "Landmark", value: restaurantInfo?.landmark ?? "N/A" },
  ];
  useEffect(() => {
    const cookieValue = Cookies.get("step");
    console.log("✅cookie value:", cookieValue);
    if (cookieValue) {
      try {
        const parsed = JSON.parse(cookieValue);
        const stepCount = parsed?.state?.stepCount;
        setStore(stepCount);
        console.log("✅ Step Count from cookie:", stepCount);
      } catch (error) {
        console.error("❌ Error parsing cookie value:", error);
      }
    } else {
      console.log("❌ No 'step' cookie found");
    }
  }, []);

  useEffect(() => {
    if (verificationStatus === "PENDING" &&
      store > 0 &&
      store <= 5) {
      setIsChecked(true);
      setReadOnly(true);
      console.log(stepCountFromStore);
    } else {
      setIsChecked(false);
    }
  }, [stepCountFromStore, verificationStatus, stepCount, store]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    console.log('checked 1 ', stepCount);
    if (checked && verificationStatus === "PENDING") {
      setStepCount(stepCount);
    }
  };

  const handleReject = async (message) => {
    try {
      const payload = {
        id,
        ticketType: "RESTAURANT",
        status: "REJECTED",
        message: message,
        rejectionStep: stepCount,
      };
      await updateTicketStatus(payload);
      setRejectModalShow(false);
      navigate("/restaurant-management/approvals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-full">
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <h4 className="font-medium text-xl mb-4">Restaurant Information</h4>
          <div className="border p-6 rounded-md bg-white max-w-2xl border-[rgba(0,0,0,0.05)]">
            <dl className="grid grid-cols-1 gap-4">
              {restaurantDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-left">
                  <div className="text-[rgba(0,0,0,0.6)] w-1/3 text-[1rem]">{detail.label}</div>
                  <div className="font-medium w-2/12">-</div>
                  <div
                    className={`w-1/2 text-[1rem] ${detail.isHighlight ? "text-green-600" : ""
                      }`}
                  >
                    {detail.value}
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col align-center justify-between">
            {verificationStatus === "PENDING" ? (
              <div className="flex flex-row items-center gap-2 pt-3">
                <input
                  id="consent-check"
                  type="checkbox"
                  className={`m-0 ${readOnly ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"}`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="consent-check" className="text-sm">
                  Checked and Reviewed the above information.
                </label>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2 pt-3">
                <input
                  id="consent-check"
                  type="checkbox"
                  className="m-0"
                  checked={true}
                  readOnly
                />
                <label htmlFor="consent-check" className="text-sm">
                  Checked and Reviewed the above information.
                </label>
              </div>
            )}

            {(rejectionStep === stepCount) && rejectionMessage && (
              <div className="mt-1 text-sm">
                <span className="font-medium">Rejection Reason :</span>{" "}
                <span className="text-red-600">{rejectionMessage}</span>
              </div>
            )}
            {/* ${verificationStatus === "REJECTED"||'APPROVED' ? "hidden" : "block"} BEFORE CODE */}
            <div className={`m-2 ${verificationStatus === "REJECTED" || verificationStatus === "APPROVED" ? "hidden" : "block"}`}>
              <div className="mt-2 flex justify-end gap-1">
                <button
                  className={`px-4 py-1.5 w-20 border rounded-full transition ${verificationStatus === "PENDING" && !isChecked
                    ? "text-red-500 border-red-500 cursor-not-allowed"
                    : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                  onClick={() => setRejectModalShow(true)}
                  disabled={verificationStatus === "PENDING" && !isChecked}
                >
                  Reject
                </button>

                <button
                  className={`px-4 py-1.5 w-20 border rounded-full transition ${verificationStatus === "PENDING" && !isChecked
                    ? "border-green-500 text-green-500 cursor-not-allowed"
                    : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    }`}
                  disabled={verificationStatus === "PENDING" && !isChecked}
                  onClick={() => {
                    navigate(
                      `/restaurant-management/approvals/restaurant-docs/${id}/${restaurantDisplayId}/${restaurantId}/${verificationStatus}/${rejectionStep}/2`
                    );
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal for Rejection */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={({ message }) => handleReject(message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            icon={<Icons.Cross2 strokeColor="rgba(255,77,79,1)" strokeWidth="0.125rem" />}
            heading="Confirm Rejection"
            subheading="Please provide a reason for rejection."
            body={
              <Form>
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Rejection Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                    placeholder="Enter rejection reason"
                    rows={2}
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 mt-1 text-sm">
                      {errors.message}
                    </div>
                  )}
                </div>
              </Form>
            }
            primaryButtonText="Reject"
            primaryButtonColor="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
};

export default RestaurantInfo;
