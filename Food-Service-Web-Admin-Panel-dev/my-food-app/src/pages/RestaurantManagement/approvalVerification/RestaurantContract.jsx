import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useGetRestaurantByRestaurantIdQuery } from "../../../apis/restaurant";
import { CustomSpinner, CommonModal } from "../../../components";
import { useUpdateTicketMutation } from "../../../apis/ticket";
import { textareaSchema } from "../../../schema/index";
import { Icons } from "../../../assets";

const RestaurantContract = () => {
  const { restaurantId, id, verificationStatus, stepCount,rejectionMessage,rejectionStep } = useParams();
  const [isChecked, setIsChecked] = useState(verificationStatus === "REJECTED");
  const navigate = useNavigate();
  const { data: restaurantData, isLoading } =
    useGetRestaurantByRestaurantIdQuery({
      restaurantId,
      stepCount: 4,
    });

  const [modalShow, setModalShow] = useState(false);
  const [approveModalShow, setApproveModalShow] = useState(false);
  const [updateTicketStatus, { isLoading: isUpdateLoading }] =
    useUpdateTicketMutation();

  const [rejectMessage, setRejectMessage] = useState("");

  const handleReject = async (message) => {
    try {
      const payload = {
        id,
        ticketType: "RESTAURANT",
        status: "REJECTED",
       message: message,
        rejectionStep: stepCount
      };
      await updateTicketStatus(payload);
      setRejectMessage(message);
      setModalShow(false);
      navigate("/restaurant-management/approvals");
      setIsChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      const payload = {
        id,
        ticketType: "RESTAURANT",
        status: "APPROVED",
        message: "",
      };
      setApproveModalShow(false);
      await updateTicketStatus(payload);
      alert("Approved Successfully!");
      navigate("/restaurant-management/approvals");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto h-full">
      {(isLoading || isUpdateLoading) && <CustomSpinner />}

      <h4 className="text-xl font-medium mb-4">Restaurant Partner Contract</h4>

      {/* Contract Card */}
      <div className="bg-white shadow-sm rounded mb-6 p-6 border border-[rgba(0,0,0,0.05)]">
        <h5 className="text-xl font-semibold text-primary mb-3">
          Logistics Services
        </h5>
        <p className="text-[rgba(0,0,0,0.6)] text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>

        <ul className="list-none">
          <li className="mb-4">
            <div className="font-medium text-base mt-3">
              Commission Charges Food Logistics
            </div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">22%</div>
          </li>
          <li className="mb-4">
            <div className="font-medium text-base mt-3">Payment Mechanism Fee</div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">
              1.84% + taxes of order value
            </div>
          </li>
          <li>
            <div className="font-medium text-base mt-3">Cancellation Fee</div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">
              If applicable, as set out in the terms
            </div>
          </li>
        </ul>
      </div>

      {/* Additional Terms Card */}
      <div className="bg-white shadow-sm rounded p-6 border border-[rgba(0,0,0,0.05)]">
        <h5 className="text-xl font-semibold text-primary mb-3">Additional Terms</h5>

        <ul className="list-none">
          <li className="mb-4">
            <div className="font-medium text-base">Logistics services and charges</div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </li>
          <li className="mb-4">
            <div className="font-medium text-base">Taxs</div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </li>
          <li>
            <div className="font-medium text-base">Restaurant Partner Compensation</div>
            <div className="text-[rgba(0,0,0,0.6)] text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </li>
        </ul>
      </div>

      <div className="flex justify-between align-center">
        {verificationStatus === "APPROVED" ? (
          <div className="flex flex-col gap-2 pt-3">
            <div className="flex flex-row items-center gap-2">
              <input
                id="consent-check"
                type="checkbox"
                className="m-0 cursor-pointer"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="consent-check" className="text-sm">
                Checked and Reviewed the above information.
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pt-3">
            <div className="flex flex-row items-center gap-2">
              <input id="consent-check" type="checkbox" className="m-0" checked={true} />
              <label htmlFor="consent-check" className="text-sm">
                Checked and Reviewed the above information.
              </label>
            </div>
          {rejectionMessage && (
              <div className="mt-1 text-sm">
                <span className="font-medium">Rejection Reason :</span> <span className="text-red-600">{rejectionMessage}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`m-2 ${verificationStatus === "REJECTED" ? "hidden" : "block"
            }`}
        >
          <div className="mt-4 flex justify-end gap-1">
            <button
              className={`px-4 py-1.5 w-20 border rounded-full transition ${verificationStatus === "APPROVED" && !isChecked
                  ? "text-red-500 border-red-500 cursor-not-allowed"
                  : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                }`}
              onClick={() => setModalShow(true)}
              disabled={verificationStatus === "APPROVED" && !isChecked}
            >
              Reject
            </button>

            <button
              className={`px-4 py-1.5 w-21 border rounded-full transition ${verificationStatus === "APPROVED" && !isChecked
                  ? "border-green-500 text-green-500 cursor-not-allowed"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                }`}
              disabled={verificationStatus === "APPROVED" && !isChecked}
              onClick={() => setApproveModalShow(true)}
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <CommonModal
        show={approveModalShow}
        onHide={() => setApproveModalShow(false)}
        icon={
          <Icons.Approve />
        }
        heading="Confirm Approval"
        subheading="Are you sure you want to approve this request?"
        primaryButtonText="Approve"
        primaryButtonColor="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white"
        onPrimaryAction={handleApprove}
      />

      {/* Reject Modal with Formik */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
                    <div className="text-red-600 mt-1 text-sm">{errors.message}</div>
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

export default RestaurantContract;
