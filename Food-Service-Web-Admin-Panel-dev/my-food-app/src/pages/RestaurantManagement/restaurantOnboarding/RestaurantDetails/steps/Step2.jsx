import { useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Icons } from "../../../../../assets";
import { TextInput, DeliveryTimingModal } from "../../../../../components";
import { useGetProfileDetailsQuery } from "../../../../../apis/restaurant";

const Step2 = () => {
  const location = useLocation();
  const { RestaurantId } = location.state || {};
  const { data, isLoading } = useGetProfileDetailsQuery({
    id: RestaurantId
  });
  const [showTimings, setShowTimings] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInformation");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const operationalHours = data?.data?.restaurant?.operationalHours;
  const days = operationalHours ? Object.keys(operationalHours) : [];
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const formik = useFormik({
    initialValues: {
      restaurantName: "",
      cuisineType: "",
      email: "",
      mobileNumber: "",
      ownerName: "",
      operationHours: "",
      profileImage: "",
    },
  });

  function convertTo24Hour(timeStr) {
    if (!timeStr) return "00:00:00";
    const [time, modifier] = timeStr.trim().split(/\s+/);
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div>
      <div className="flex justify-between  items-center">
        <h5 className="font-satoshi text-2xl font-bold">Restaurant Profile Setup</h5>
      </div>
      {/* Tabs Container */}
      <div className="tabs-container bg-white shadow-md mt-4 rounded p-4 min-w-screen-lg min-h-[24.500rem]">
        <div className="flex flex-row items-center text-[0.813rem] justify-start gap-5 mb-8 tabs-row">
          <h6
            onClick={() => {
              setActiveTab("basicInformation");
            }}
            className={`${activeTab === "basicInformation" ? "border-b border-secondary" : "opacity-50"
              } text-secondary font-medium cursor-pointer pb-2 m-0 px-4`}
          >
            Basic Information
          </h6>
          <h6
            onClick={() => {
              setActiveTab("locationSetup");
            }}
            className={`${activeTab === "locationSetup" ? "border-b border-secondary" : "opacity-50"
              } text-secondary font-medium cursor-pointer pb-2 m-0 px-4`}
          >
            Location Setup
          </h6>
          <h6
            onClick={() => {
              setActiveTab("documentDetails");
            }}
            className={`${activeTab === "documentDetails" ? "border-b border-secondary" : "opacity-50"
              } text-secondary font-medium cursor-pointer pb-2 m-0 px-4`}
          >
            Document Details
          </h6>
        </div>
        <div>
          {activeTab === "basicInformation" && (
            <>
              <div className="mt-5">
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="restaurantName"
                    formik={formik}
                    label="Restaurant Name"
                    placeholder={data?.data.restaurant.resName || "N/A"}
                  />
                  <TextInput
                    disabled={true}
                    id="cuisineType"
                    formik={formik}
                    label="Cuisine Type"
                    placeholder={data?.data.restaurant.cuisines.map(item => {
                      return item.replace(/[{}"]/g, '').trim();
                    }).join(', ') || "N/A"}
                  />
                </div>
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="email"
                    formik={formik}
                    label="Email Address"
                    placeholder={data?.data.restaurant.ownerEmail || "N/A"}
                  />
                  <TextInput
                    disabled={true}
                    id="mobileNumber"
                    formik={formik}
                    label="Phone Number"
                    placeholder={data?.data.restaurant.mobileNumber || "N/A"}
                  />
                </div>
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="ownerName"
                    formik={formik}
                    label="Owner Name"
                    placeholder={data?.data.restaurant.ownerName || "N/A"}
                  />
                  <div className="flex gap-1.5 items-center">
                    <div className="flex flex-col w-72 mb-3.5">
                      <label className="text-[0.813rem] font-medium flex items-center gap-1">
                        Operation Hours
                        <div onClick={() => {
                          console.log(showTimings);
                          setShowTimings(true);
                          console.log(showTimings);
                        }}
                          className="cursor-pointer">
                          <Icons.Eye

                          />
                        </div>
                      </label>

                      <div className="flex flex-col gap-3">
                        <div className="relative w-full">
                          <input
                            disabled={true}
                            className="custom-text-input rounded border text-sm border-gray-300 mt-1 p-2 pr-[30%] opacity-75 w-full"
                            type="text"
                            placeholder={
                              data?.data.restaurant?.operationalHours?.[selectedDay]?.open
                                ? (
                                  (new Date(`1970-01-01T${convertTo24Hour(data?.data.restaurant?.operationalHours?.[selectedDay].slots?.[selectedSlotIndex]?.endTime)}`) -
                                    new Date(`1970-01-01T${convertTo24Hour(data?.data.restaurant?.operationalHours?.[selectedDay].slots?.[selectedSlotIndex]?.startTime)}`))
                                  / (1000 * 60 * 60)
                                ).toFixed(2)
                                : "Restaurant off"
                            }

                            value={formik?.values.operationHours}
                            onChange={(event) => {
                              formik.setFieldValue("operationHours", event?.target?.value);
                            }}
                          />
                          <select
                            name="slots"
                            id="slot"
                            className="absolute right-0 top-0 h-[2.4rem] text-sm w-1/3 border-l rounded-r border px-2 py-1.5 mt-1 bg-white outline-none"
                            onChange={(e) => setSelectedSlotIndex(e.target.selectedIndex)}
                          >
                            {data?.data.restaurant?.operationalHours?.[selectedDay]?.open ? (
                              data?.data.restaurant?.operationalHours?.[selectedDay]?.slots?.map((slot, index) => (
                                <option key={index} value={`slot${index + 1}`}>
                                  {`Slot ${index + 1}`}
                                </option>
                              ))
                            ) : (
                              <option value="slot1">No Slot</option>
                            )}
                          </select>

                          {/* {console.log(selectedSlotIndex)} */}
                        </div>
                      </div>
                    </div>

                    <div className="relative w-24 mt-5 min-h-[3rem]">
                      <button
                        onClick={() => setOpen(!open)}
                        className="w-full bg-success text-white text-sm rounded-full py-2 px-4 flex justify-center items-center"
                        type="button"
                      >
                        {selectedDay}
                      </button>

                      <ul
                        className={`absolute z-10  left-0 w-28 bg-white border rounded shadow p-2 transition-transform origin-top ${open ? "block" : "hidden"
                          }`}
                        style={{ top: "100%" }}
                      >
                        {days
                          .filter((item) => item !== selectedDay)
                          .map((item) => (
                            <li
                              key={item}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm rounded"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedDay(item);
                                setOpen(false);
                              }}
                            >
                              {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                </div>
                <div className="mt-4">
                  <p className="p-0 m-0 font-medium">Profile Picture</p>
                  <img className="h-[150px] w-[150px]" src={data?.data.restaurant.resProfilePictures}
                  />
                </div>
              </div>

            </>
          )}
          {activeTab === "locationSetup" && (
            <>
              <div className="mt-5">
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="address"
                    formik={formik}
                    label={"Address"}
                    placeholder={
  data?.data.restaurant.floor || data?.data.restaurant.area
    ? `${data?.data.restaurant.floor ?? ""} ${data?.data.restaurant.area ?? ""}`.trim()
    : "N/A"
}
                  />
                  <TextInput
                    disabled={true}
                    id="pincode"
                    formik={formik}
                    label="Landmark"
                    placeholder={data?.data.restaurant.landmark || "N/A"}
                  />
                </div>
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="latitude"
                    formik={formik}
                    label="Enter Latitude"
                    placeholder={data?.data.restaurant.latitude || "N/A"}
                  />
                  <TextInput
                    disabled={true}
                    id="longitude"
                    formik={formik}
                    label="Enter Longitude"
                    placeholder={data?.data.restaurant.longitude || "N/A"}
                  />
                </div>
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="city"
                    formik={formik}
                    label="City"
                    placeholder={data?.data.restaurant.city || "N/A"}
                  />
                  <TextInput
                    disabled={true}
                    id="state"
                    formik={formik}
                    label="State"
                    placeholder={data?.data.restaurant.state || "N/A"}
                  />
                </div>
              </div>
            </>
          )}
          {activeTab === "documentDetails" && (
            <>
              <div className="mt-5">
                <div className="flex md:items-start lg:items-center justify-start md:flex-col lg:flex-row lg:gap-4 md:gap-2 lg:mt-3 md:mt-2">
                  <TextInput
                    disabled={true}
                    id="fssaiNumber"
                    formik={formik}
                    label="FSSAI Number"
                    placeholder={data?.data.restaurantDocument.fssaiNumber || "N/A"}
                  />
                  <TextInput
                    disabled={true}
                    id="gstNumber"
                    formik={formik}
                    label="GST Number"
                    placeholder={data?.data.restaurantDocument.gstNumber || "N/A"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <DeliveryTimingModal
        show={showTimings}
        onClose={() => {
          setShowTimings(false);
        }}
        optHours={operationalHours}
      />
    </div>
  );
};

export default Step2;
