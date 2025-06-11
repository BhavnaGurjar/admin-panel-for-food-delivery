import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Icons } from "../../../assets";
import { textareaSchema } from "../../../schema";
import { useUpdateTicketMutation } from "../../../apis/ticket";
import { CustomSpinner, CommonModal, ImageModal } from "../../../components";
import { useGetRestaurantByRestaurantIdQuery } from "../../../apis/restaurant";

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { restaurantId, id, verificationStatus, stepCount,rejectionMessage,rejectionStep } = useParams();
  const [modalImage, setModalImage] = useState("");
  const [isChecked, setIsChecked] = useState(verificationStatus === "REJECTED");
  const { data: restaurantData, isLoading } =
    useGetRestaurantByRestaurantIdQuery({
      restaurantId,
      stepCount: 3,
    });

  const [modalShow, setModalShow] = useState(false);
  const [rejectmodalShow, setRejectModalShow] = useState(false);
  const [updateTicketStatus, { isLoading: isUpdateLoading }] =
    useUpdateTicketMutation();

  const [rejectMessage, setRejectMessage] = useState("");  // New state for rejection message

  const restaurantInfo = restaurantData?.data || {};
  const {
    menuImages = [],
    resProfilePictures,
    cuisines = [],
    operationalHours = {},
  } = restaurantInfo;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleImageClick = (image) => {
    setModalImage(image);
    setModalShow(true);
  };

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
      setRejectModalShow(false);
      navigate("/restaurant-management/approvals");
      setIsChecked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-full">
      <h4 className="font-medium mb-4 text-xl">Menu & Operational Details</h4>
      {(isLoading || isUpdateLoading) && <CustomSpinner />}

      {/* Menu Images */}
      <div className="mb-4 border border-black-10 rounded p-4 shadow-sm bg-white">
        <h5 className="font-medium text-lg text-primary mb-3">Menu Images</h5>
        <div className="flex gap-4 flex-wrap">
          {menuImages.length > 0 ? (
            menuImages.map((imgUrl, index) => (
              <div
                key={index}
                className="flex items-center w-36 h-36 rounded p-2 bg-[rgba(243,244,246,1)] border-black-10 border "
              >
                <img
                  src={imgUrl}
                  alt={`Menu Item ${index + 1}`}
                  className="rounded object-cover w-[7.5rem] h-[7.5rem] cursor-pointer"
                  onClick={() => handleImageClick(imgUrl)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>
      </div>

      {/* Profile Image */}
      <div className="mb-4 border border-black-10 rounded p-4 shadow-sm bg-white">
        <h5 className="font-medium text-lg text-primary mb-3">
          Restaurant Profile Image
        </h5>
        {resProfilePictures ? (
          <div className="flex items-center w-32 h-32 rounded p-2 bg-[rgba(243,244,246,1)] border-black-10 border">
            <img
              src={resProfilePictures}
              alt="Restaurant Profile"
              className="rounded object-cover w-[9.375rem] h-[6.45rem] cursor-pointer"
              onClick={() => handleImageClick(resProfilePictures)}
            />
          </div>
        ) : (
          <p className="text-black-20">N/A</p>
        )}
      </div>

      {/* Cuisines */}
      <div className="mb-4 border border-black-10 rounded p-4 shadow-sm bg-white">
        <h5 className="font-medium text-lg text-primary mb-3">Cuisines</h5>
        {cuisines.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {cuisines.map((cuisine, index) => (
              <span
                key={index}
                className="text-sm font-medium px-4 py-2 rounded-full bg-[rgba(243,244,246,1)] border-black-10 border"
              >
                {cuisine}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">N/A</p>
        )}
      </div>

      {/* Delivery Timing */}
      <div className="mb-4 border border-black-10 rounded p-4 shadow-sm bg-white overflow-x-auto">
        <h5 className="font-medium text-lg text-primary mb-3">
          Delivery Timing
        </h5>
        <table className="min-w-full rounded text-sm">
          <thead className="rounded">
            <tr className="bg-[rgba(250,249,249,1)] text-left border border-black-10">
              <th className="px-3 py-2 text-blue font-semibold">Day</th>
              <th className="px-3 py-2 text-blue font-semibold">Time Slot</th>
              <th className="px-3 py-2 text-blue font-semibold">Start Time</th>
              <th className="px-3 py-2 text-blue font-semibold">End Time</th>
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => {
              const dayInfo = operationalHours?.[day];
              const slots = dayInfo?.slots || [];

              if (!dayInfo || dayInfo.open === false || slots.length === 0) {
                return (
                  <tr key={day} className="border-b border-black-10">
                    <td className="px-3 py-2">{day}</td>
                    <td
                      colSpan="3"
                      className="px-3 py-2 text-red-500 text-center"
                    >
                      Restaurant Off
                    </td>
                  </tr>
                );
              }

              return slots.map((slot, index) => (
                <tr key={`${day}-${index}`} className="border-b border-black-10">
                  {index === 0 && (
                    <td rowSpan={slots.length} className="px-3 py-2 align-center">
                      {day}
                    </td>
                  )}
                  <td className="px-3 py-2">Slot {index + 1}</td>
                  <td className="px-3 py-2">{slot.startTime || "N/A"}</td>
                  <td className="px-3 py-2">{slot.endTime || "N/A"}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>

      {/* Checkbox and rejection message */}
      <div className="flex justify-between items-center">
        {verificationStatus === "APPROVED" ? (
          <div className="flex flex-col gap-1 pt-3">
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
         <div className="flex flex-col">
           <div className="flex flex-row items-center gap-2 pt-3">
                <input id="consent-check" type="checkbox" className="m-0" checked={true} readOnly />
                <label htmlFor="consent-check" className="text-sm">
                  Checked and Reviewed the above information.
                </label>
              </div>
         </div>
            )}

            {/* Show rejection message below the checkbox */}
            {rejectionMessage && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Rejection Reason :</span> <span className="text-red-600">{rejectionMessage}</span>
              </div>
            )}
        {/* Action Buttons */}
        <div
          className={`m-2 ${verificationStatus === "REJECTED" ? "hidden" : "block"
            }`}
        >
          <div className="flex justify-end gap-1">
            <button
              className={`px-4 py-1.5 w-20 border rounded-full transition ${verificationStatus === "APPROVED" && !isChecked
                  ? "text-red-500 border-red-500 cursor-not-allowed"
                  : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                }`}
              onClick={() => setRejectModalShow(true)}
              disabled={verificationStatus === "APPROVED" && !isChecked}
            >
              Reject
            </button>

            <button
              className={`px-4 py-1.5 w-20 border rounded-full transition ${verificationStatus === "APPROVED" && !isChecked
                  ? "border-green-500 text-green-500 cursor-not-allowed"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                }`}
              disabled={verificationStatus === "APPROVED" && !isChecked}
              onClick={() =>
                navigate(
                  `/restaurant-management/approvals/restaurant-contract/${id}/${restaurantId}/${verificationStatus}/${row.verificationStatus}/${row.message}/${row.rejectionStep}/4`
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={rejectmodalShow}
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

      {/* Modal for Image */}
      <ImageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imageUrl={modalImage}
        heading="Restaurant Image"
      />
    </div>
  );
};

export default RestaurantMenu;
