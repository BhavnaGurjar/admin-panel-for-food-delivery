import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { useFormik } from "formik";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TextInput, DeliveryTimingModal } from "../../../../../components";
import { images } from "../../../../../assets";

const Step2 = () => {
  const [showTimings, setShowTimings] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInformation");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h5 className="">Restaurant Profile Setup</h5>
      </div>
      {/* Tabs Container */}
      <div className="tabs-container mt-4 p-4 rounded">
        <div className="flex flex-row items-center justify-start gap-5 tabs-row">
          <h6
            onClick={() => {
              setActiveTab("basicInformation");
            }}
            className={`${
              activeTab === "basicInformation" ? "active-bottom" : "opacity-50"
            } text-blue cursor-pointer pb-3 m-0 px-4`}
          >
            Basic Information
          </h6>
          <h6
            onClick={() => {
              setActiveTab("locationSetup");
            }}
            className={`${
              activeTab === "locationSetup" ? "active-bottom" : "opacity-50"
            } text-blue cursor-pointer pb-3 m-0 px-4`}
          >
            Location Setup
          </h6>
          <h6
            onClick={() => {
              setActiveTab("documentDetails");
            }}
            className={`${
              activeTab === "documentDetails" ? "active-bottom" : "opacity-50"
            } text-blue cursor-pointer pb-3 m-0 px-4`}
          >
            Document Details
          </h6>
        </div>
        <div>
          {activeTab === "basicInformation" && (
            <>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-3">
                  <TextInput
                    disabled={true}
                    id="restaurantName"
                    formik={formik}
                    label="Restaurant Name"
                    placeholder={"Enter Restaurant Name"}
                  />
                  <TextInput
                    disabled={true}
                    id="cuisineType"
                    formik={formik}
                    label="Cuisine Type"
                    placeholder={"Enter Cuisine Type"}
                  />
                </div>
                <div className="flex items-center justify-start gap-3 mt-4">
                  <TextInput
                    disabled={true}
                    id="email"
                    formik={formik}
                    label="Email Address"
                    placeholder={"Enter Email Address"}
                  />
                  <TextInput
                    disabled={true}
                    id="mobileNumber"
                    formik={formik}
                    label="Phone Number"
                    placeholder={"Enter Phone Number"}
                  />
                </div>
                <div className="flex items-center justify-start gap-3 mt-4">
                  <TextInput
                    disabled={true}
                    id="ownerName"
                    formik={formik}
                    label="Owner Name"
                    placeholder={"Enter Owner Name"}
                  />
                  <div className="flex flex-column col-5">
                    <label
                      className={`fs-6 fw-semibold ${"flex items-center gap-1 flex-row"}`}
                    >
                      {"Operation Hours"}
                      <MdOutlineRemoveRedEye
                        size={20}
                        onClick={() => {
                          setShowTimings(true);
                        }}
                        className="cursor-pointer"
                      />
                    </label>
                    <div className="">
                      <input
                        disabled={true}
                        className="custom-text-input rounded border p-3 opacity-75 w-75"
                        type={"text"}
                        placeholder={"Operating Hours"}
                        value={formik?.values.operationHours}
                        onChange={(event) => {
                          formik.setFieldValue(
                            "operationHours",
                            event?.target?.value
                          );
                        }}
                      />
                      <select
                        name="slots"
                        id="slot"
                        className="p-3 rounded border w-25 outline-none"
                      >
                        <option value="slot1">Slot 1</option>
                        <option value="slot2">Slot 2</option>
                        <option value="slot3">Slot 3</option>
                      </select>
                    </div>
                  </div>
                  <Dropdown className="mt-4 pt-2">
                    <Dropdown.Toggle
                      className="rounded-pill py-2"
                      variant="success"
                      id="dropdown-basic"
                    >
                      {selectedDay}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-2">
                      {days.map(
                        (item) =>
                          item !== selectedDay && (
                            <Dropdown.Item
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedDay(item);
                              }}
                              className="cursor-pointer"
                            >
                              {item}
                            </Dropdown.Item>
                          )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="mt-4">
                  <p className="p-0 m-0 fs-6 fw-semibold">Profile Picture</p>
                  <img src={images.profileImage} />
                </div>
              </div>
              <div className="flex gap-3 pt-5">
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
            </>
          )}
          {activeTab === "locationSetup" && (
            <>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-3">
                  <TextInput
                    disabled={true}
                    id="address"
                    formik={formik}
                    label="Address"
                    placeholder={"Enter Address"}
                  />
                  <TextInput
                    disabled={true}
                    id="pincode"
                    formik={formik}
                    label="Pincode"
                    placeholder={"Enter Pincode"}
                  />
                </div>
                <div className="flex items-center justify-start gap-3 mt-4">
                  <TextInput
                    disabled={true}
                    id="latitude"
                    formik={formik}
                    label="Enter Latitude"
                    placeholder={"Enter Latitude"}
                  />
                  <TextInput
                    disabled={true}
                    id="longitude"
                    formik={formik}
                    label="Enter Longitude"
                    placeholder={"Enter Phone Number"}
                  />
                </div>
                <div className="flex items-center justify-start gap-3 mt-4">
                  <TextInput
                    disabled={true}
                    id="city"
                    formik={formik}
                    label="City"
                    placeholder={"Enter City Name"}
                  />
                  <TextInput
                    disabled={true}
                    id="state"
                    formik={formik}
                    label="State"
                    placeholder={"Enter State Name"}
                  />
                </div>
              </div>
            </>
          )}
          {activeTab === "documentDetails" && (
            <>
              <div className="mt-4">
                <div className="flex items-center justify-start gap-3">
                  <TextInput
                    disabled={true}
                    id="fssaiNumber"
                    formik={formik}
                    label="FSSAI Number"
                    placeholder={"Enter FSSAI Number"}
                  />
                  <TextInput
                    disabled={true}
                    id="gstNumber"
                    formik={formik}
                    label="GST Number"
                    placeholder={"Enter GST Number"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <DeliveryTimingModal
        show={true}
        onClose={() => {
          setShowTimings(false);
        }}
      />
    </div>
  );
};

export default Step2;
