import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import { Icons } from "../../../assets";
import { textareaSchema } from "../../../schema";
import { useUpdateTicketMutation } from "../../../apis/ticket";
import { CustomSpinner, CommonModal, ImageModal } from "../../../components";
import { useGetRestaurantByRestaurantIdQuery } from "../../../apis/restaurant";
import { useStepStore } from "../../../store/StepStore"; 

const RestaurantDocuments = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const {
  id,
  restaurantDisplayId,
  restaurantId,
  verificationStatus,
  rejectionMessage,
  rejectionStep,
  stepCount
} = useParams();

  const [isChecked, setIsChecked] = useState(verificationStatus === "REJECTED");
  const [store,setStore] =useState(0);
  const navigate = useNavigate();
const stepCountFromStore = useStepStore((state) => state.stepCount);
  const setStepCount = useStepStore((state) => state.setStep);

  const { data: restaurantData, isLoading } =
    useGetRestaurantByRestaurantIdQuery({
      restaurantId,
      stepCount: 2,
    });

  const [updateTicketStatus, { isLoading: isUpdateLoading }] =
    useUpdateTicketMutation();

  const restaurantInfo = restaurantData?.data;

  const handleImageClick = (image) => {
    setModalImage(image);
    setModalShow(true);
  };
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
      store > 1 &&
      store <= 5 ) {
        setIsChecked(true);
        setReadOnly(true);
        console.log(stepCountFromStore);
      } else {
        setIsChecked(false);
      }
  }, [stepCountFromStore, verificationStatus, stepCount,store]);
    
  const handleCheckboxChange = (e) => {
      const checked = e.target.checked;
      setIsChecked(checked);
    console.log('checked 1 ',stepCount);
      if (checked && verificationStatus === "PENDING") {
        setStepCount(stepCount); 
      }
    };

  const handleReject = async (message) => {
    try {
      const payload = {
        id: id,
        ticketType: "RESTAURANT",
        status: "REJECTED",
        message: message,
        rejectionStep: stepCount
      };
      await updateTicketStatus(payload);
      setRejectModalShow(false);
      navigate("/restaurant-management/approvals");
    } catch (error) {
      console.log(error);
    }
  };

  const documentDetails = [
    {
      title: "PAN Details",
      fields: [
        { label: "PAN Number", value: restaurantInfo?.panNumber || "N/A" },
        { label: "Full Name (PAN)", value: restaurantInfo?.name || "N/A" },
        {
          label: "Registered Address",
          value: restaurantInfo?.panAddress || "N/A",
        },
        {
          label: "PAN Image",
          value: restaurantInfo?.panImageUrl,
          isImage: true,
        },
      ],
    },
    {
      title: "GST Details",
      fields: [
        {
          label: "Has GSTP",
          value: restaurantInfo?.gstRegistered ? "Yes" : "No",
        },
        { label: "GST Number", value: restaurantInfo?.gstNumber || "N/A" },
      ],
    },
    {
      title: "FSSAI Details",
      fields: [
        { label: "FSSAI Number", value: restaurantInfo?.fssaiNumber || "N/A" },
        {
          label: "Expiry Date",
          value: restaurantInfo?.fssaiExpiryDate || "N/A",
        },
        {
          label: "FSSAI Image",
          value: restaurantInfo?.fssaiImageUrl,
          isImage: true,
        },
      ],
    },
    {
      title: "Bank Details",
      fields: [
        {
          label: "Account Number",
          value: restaurantInfo?.bankAccountNumber || "N/A",
        },
        {
          label: "Account Type",
          value: restaurantInfo?.bankAccountType || "N/A",
        },
        { label: "IFSC Code", value: restaurantInfo?.ifscCode || "N/A" },
      ],
    },
  ];

  return (
    <div className="relative text-sm h-full">
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <h4 className="font-medium mb-4 text-xl">Restaurant Documents</h4>
          {documentDetails.map((doc, index) => (
            <div
              key={index}
              className="mb-3 border border-[rgba(0,0,0,0.05)] shadow-sm rounded-md p-4 bg-white"
            >
              <div className="flex gap-2 items-center mb-3">
                <span className="font-medium text-primary text-lg">
                  {doc.title}
                </span>
              </div>

              {doc.fields.map((field, idx) => (
                <div key={idx} className="mb-3 flex justify-between">
                  <div className="text-[rgba(0,0,0,0.6)] w-1/3 pb-2 text-[1rem]">
                    {field.label}
                  </div>
                  <div className="w-2/12 pb-2 font-medium">-</div>
                  <div className="text-[1rem] w-1/2 pb-2">
                    {field.isImage ? (
                      field.value ? (
                        <div className="rounded-md bg-[rgba(243,244,246,1)] border-black-10 border w-32 h-32 flex items-center justify-center">
                          <img
                            src={field.value}
                            alt={`${doc.title} Image`}
                            className="w-24 h-24 object-cover cursor-pointer"
                            onClick={() => handleImageClick(field.value)}
                          />
                        </div>
                      ) : (
                        "N/A"
                      )
                    ) : (
                      field.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Checkbox & rejection message section */}
          <div className="flex flex-col gap-1">
            <div className="flex align-center justify-between">
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

             
            </div>
             <div
               className={`m-2 ${verificationStatus === "REJECTED" || verificationStatus === "APPROVED" ? "hidden" : "block"}`}
              >
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
    `/restaurant-management/approvals/restaurant-menu/${id}/${restaurantDisplayId}/${restaurantId}/${verificationStatus}/${rejectionStep}/3`
  );
}}
                  >
                    Next
                  </button>
                </div>
              </div>

            {/* Show rejection message below the checkbox */}
           {(rejectionStep===stepCount) && rejectionMessage && (
              <div className="mt-1 text-sm">
                <span className="font-medium">Rejection Reason :</span> <span className="text-red-600">{rejectionMessage}</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Reject Modal */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            icon={<Icons.Cross2 strokeColor="rgba(255,77,79,1)" strokeWidth='0.125rem' />}
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

      {/* Image Modal */}
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imageUrl={modalImage}
        heading="Document Image"
      />
    </div>
  );
};

export default RestaurantDocuments;
