import { useGetDeliveryPartnerByDeliveryPartnerIdQuery } from "../../../apis/deliveryPartner";
import { CommonModal, Breadcrumbs } from "../../../components";
import { useUpdateTicketMutation } from "../../../apis/ticket";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { Icons } from "../../../assets";
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";

const PartnerDetails = () => {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const [approveModalShow, setApproveModalShow] = useState(false);

  const [updateTicket] = useUpdateTicketMutation();

  const location = useLocation();

  const tabs = [
    "basicInformation",
    "workSetting",
    "profileDetails",
    "confirmation",
  ];

  const { partnerId, Name, id, status, reason } = location.state || {};

  const { data, isLoading } = useGetDeliveryPartnerByDeliveryPartnerIdQuery({
    id: partnerId,
    stepCount: 4,
  });

  console.log("data", data);

  const [activeTab, setActiveTab] = useState("basicInformation");

  const [checkedTabs, setCheckedTabs] = useState({
    basicInformation: false,
    workSetting: false,
    profileDetails: false,
    confirmation: false,
  });

  const isChecked = checkedTabs[activeTab];

  const [maxStepReached, setMaxStepReached] = useState(1);

  const breadcrumbItems = [
    {
      name: "Delivery Partner Management",
      link: "/delivery-partner-management/application",
    },
    { name: "Partner Details" },
  ];

  const handleStatusUpdate = async (status, msg) => {
    try {
      const payload = {
        id: id,
        ticketType: "DELIVERY_PARTNER",
        status: status,
        message: msg || null,
      };

      const response = await updateTicket(payload);
      if (response?.data) {
        if (response?.data.status == "APPROVED") {
          toast.success("Partner approved successfully");
        } else {
          toast.error("Application rejected");
        }
        setApproveModalShow(false);
        navigate("/delivery-partner-management/application");
      }
    } catch (error) {
      toast.error("Update failed:", error);
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      setMaxStepReached((prev) => Math.max(prev, currentIndex + 2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h4 className="text-2xl sm:text-3xl font-bold">{Name}</h4>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Status Message */}
        {status === "REJECTED" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-center">Reason: {reason}</p>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Tab Navigation */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col border-b border-black-20 sm:flex-row gap-2 sm:gap-5 overflow-x-auto">
              <button
                onClick={() => setActiveTab("basicInformation")}
                disabled={status === "PENDING" && maxStepReached < 1}
                className={`${
                  activeTab === "basicInformation"
                    ? "border-b-2 border-blue text-blue font-bold"
                    : "text-blue-50"
                } cursor-pointer pb-3 px-4 bg-white whitespace-nowrap text-sm sm:text-base`}
              >
                Basic Information
              </button>
              <button
                onClick={() => setActiveTab("workSetting")}
                disabled={status === "PENDING" && maxStepReached < 2}
                className={`${
                  activeTab === "workSetting"
                    ? "border-b-2 border-blue text-blue font-bold"
                    : "text-blue-50"
                } cursor-pointer pb-3 px-4 bg-white whitespace-nowrap text-sm sm:text-base`}
              >
                Work Setting
              </button>
              <button
                onClick={() => setActiveTab("profileDetails")}
                disabled={status === "PENDING" && maxStepReached < 3}
                className={`${
                  activeTab === "profileDetails"
                    ? "border-b-2 border-blue text-blue font-bold"
                    : "text-blue-50"
                } cursor-pointer pb-3 px-4 bg-white whitespace-nowrap text-sm sm:text-base`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("confirmation")}
                disabled={status === "PENDING" && maxStepReached < 4}
                className={`${
                  activeTab === "confirmation"
                    ? "border-b-2 border-blue text-blue font-bold"
                    : "text-blue-50"
                } cursor-pointer pb-3 px-4 bg-white whitespace-nowrap text-sm sm:text-base`}
              >
                Confirmation
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === "basicInformation" && (
              <>
                <h6 className="m-0 text-xl py-5 font-bold text-kilamanjaro">
                  Basic Information
                </h6>
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Information Section
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Language Chosen
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">English</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Mobile No.
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">8899775566</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Address
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        Narmada Colony, Khategaon
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Agreement and Submission
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Registration Fee
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">200</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Transaction Id
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">#Del4567</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Date & Time
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">22/07/2024 3:30 AM</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Payment Method
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">UPI</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {status === "PENDING" ? (
                    <div className="flex flex-row items-center gap-2 pt-3">
                      <input
                        id="consent-check"
                        type="checkbox"
                        className="m-0"
                        checked={checkedTabs[activeTab]}
                        onChange={(e) =>
                          setCheckedTabs((prev) => ({
                            ...prev,
                            [activeTab]: e.target.checked,
                          }))
                        }
                        disabled={maxStepReached > 1}
                      />
                      <label htmlFor="consent-check">
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
                      />
                      <label htmlFor="consent-check">
                        Checked and Reviewed the above information.
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "workSetting" && (
              <>
                <h6 className="m-0 text-xl py-5 font-bold text-kilamanjaro">
                  Work Setting
                </h6>
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Vehicle Details
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Vehicle Type
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">Petrol</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Number plate
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">8899775566</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        License
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">567890</p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Area & Timing
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Selected work area
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        Narmada Colony, Khategaon
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Preferred work time
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">All day full time</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {status === "PENDING" ? (
                    <div className="flex flex-row items-center gap-2 pt-3">
                      <input
                        id="consent-check"
                        type="checkbox"
                        className="m-0"
                        checked={checkedTabs[activeTab]}
                        onChange={(e) =>
                          setCheckedTabs((prev) => ({
                            ...prev,
                            [activeTab]: e.target.checked,
                          }))
                        }
                        disabled={maxStepReached > 2}
                      />
                      <label htmlFor="consent-check">
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
                      />
                      <label htmlFor="consent-check">
                        Checked and Reviewed the above information.
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "profileDetails" && (
              <>
                <h6 className="m-0 text-xl py-5 font-bold text-kilamanjaro">
                  Profile Details
                </h6>
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Personal Details
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        First Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.firstName || "Ritesh"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Last Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.lastName || "Chouhan"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Gender
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.gender || "Male"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Bank Details
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Account Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.accountNumber || "45678912345"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        IFSC Code
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.ifscCode || "IFSC789067"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Branch Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.bankName || "Khategaon"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg m-0 font-medium pb-3 text-kilamanjaro">
                    Documentation
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        PAN Image
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <img
                        src={data?.data?.panCardImageUrl || "/placeholder.svg"}
                        alt="PAN card"
                        className="w-24 h-auto"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Aadhar Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">366953295678</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        PAN Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">123456789</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {status === "PENDING" ? (
                    <div className="flex flex-row items-center gap-2 pt-3">
                      <input
                        id="consent-check"
                        type="checkbox"
                        className="m-0"
                        checked={checkedTabs[activeTab]}
                        onChange={(e) =>
                          setCheckedTabs((prev) => ({
                            ...prev,
                            [activeTab]: e.target.checked,
                          }))
                        }
                        disabled={maxStepReached > 3}
                      />
                      <label htmlFor="consent-check">
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
                      />
                      <label htmlFor="consent-check">
                        Checked and Reviewed the above information.
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "confirmation" && (
              <>
                <h6 className="m-0 text-xl py-5 font-bold text-kilamanjaro">
                  All Details
                </h6>

                <h6 className="my-6 text-lg font-bold text-primary">
                  Basic Information
                </h6>
                {/* Basic Details */}
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg text-kilamanjaro m-0 pb-3">
                    Information Section
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Language Chosen
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">English</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Mobile No.
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">8899775566</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Address
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        Narmada Colony, Khategaon
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg text-kilamanjaro m-0 pb-3">
                    Agreement and Submission
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Registration Fee
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">200</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Transaction Id
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">#Del4567</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Date & Time
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">22/07/2024 3:30 AM</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Payment Method
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">UPI</p>
                    </div>
                  </div>
                </div>

                <h6 className="my-6 text-lg font-bold text-primary">
                  Work Setting
                </h6>
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg text-kilamanjaro m-0 pb-3">
                    Work Setting
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Vehicle Type
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">Petrol</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Number plate
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">8899775566</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        License
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">567890</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Selected work area
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        Narmada Colony, Khategaon
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Preferred work time
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">All day full time</p>
                    </div>
                  </div>
                </div>

                <h6 className="my-6 text-lg font-bold text-primary">
                  Profile Details
                </h6>
                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg text-kilamanjaro m-0 pb-3">
                    Profile Details
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        First Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.firstName || "Ritesh"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Last Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.lastName || "Chouhan"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Gender
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.gender || "Male"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Account Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.accountNumber || "45678912345"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        IFSC Code
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.ifscCode || "IFSC789067"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Branch Name
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">
                        {data?.data?.bankName || "Khategaon"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-black-20 rounded-xl p-3 mt-5">
                  <h6 className="text-lg text-kilamanjaro m-0 pb-3">
                    Documentation
                  </h6>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        PAN Image
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <img
                        src={data?.data?.panCardImageUrl || "/placeholder.svg"}
                        alt="PAN card"
                        className="w-24 h-auto"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        Aadhar Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">366953295678</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                      <p className="p-0 sm:w-1/6 font-medium sm:font-normal">
                        PAN Number
                      </p>
                      <p className="p-0 hidden sm:block sm:w-1/12 text-center">
                        -
                      </p>
                      <p className="p-0 font-semibold">123456789</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {status === "PENDING" ? (
                    <div className="flex flex-row items-center gap-2 pt-3">
                      <input
                        id="consent-check"
                        type="checkbox"
                        className="m-0"
                        checked={checkedTabs[activeTab]}
                        onChange={(e) =>
                          setCheckedTabs((prev) => ({
                            ...prev,
                            [activeTab]: e.target.checked,
                          }))
                        }
                      />
                      <label htmlFor="consent-check">
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
                      />
                      <label htmlFor="consent-check">
                        Checked and Reviewed the above information.
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3">
              {status === "PENDING" && (
                <button
                  className={`bg-red-500 text-white rounded-full border-0 px-6 py-2 order-2 sm:order-1 ${
                    !isChecked || status !== "PENDING"
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                  disabled={!isChecked}
                  onClick={() => setModalShow(true)}
                >
                  Reject
                </button>
              )}
              {activeTab === "confirmation"
                ? status === "PENDING" && (
                    <button
                      className={`bg-green-500 rounded-full border-0 text-white px-6 py-2 order-1 sm:order-2 ${
                        !isChecked
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100"
                      }`}
                      onClick={() => setApproveModalShow(true)}
                      disabled={!isChecked}
                    >
                      Approve & Proceed
                    </button>
                  )
                : status === "PENDING" && (
                    <button
                      className={`bg-blue rounded-full border-0 text-white px-6 py-2 order-1 sm:order-2 ${
                        !isChecked ? "opacity-50" : "opacity-100"
                      }`}
                      disabled={!isChecked}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CommonModal
        show={approveModalShow}
        onHide={() => setApproveModalShow(false)}
        icon={
          <BsFillCalendar2CheckFill size={30} style={{ color: "#03bc44" }} />
        }
        heading="Confirm Approval"
        subheading="Are you sure you want to approve this request?"
        primaryButtonText="Approve"
        primaryButtonColor="success"
        onPrimaryAction={() => handleStatusUpdate("APPROVED")}
      />

      <Formik
        initialValues={{ rejectMessage: "" }}
        validationSchema={Yup.object({
          rejectMessage: Yup.string().required(
            "Rejection message is required."
          ),
        })}
        onSubmit={(values) =>
          handleStatusUpdate("REJECTED", values.rejectMessage)
        }
      >
        {({ handleSubmit }) => (
          <CommonModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            icon={<Icons.Cross />}
            heading="Confirm Rejection"
            subheading="Please provide a reason for rejection."
            body={
              <Form>
                <div className="mt-2">
                  <label className="text-base font-semibold mb-2">
                    Rejection Message
                  </label>
                  <Field
                    as="textarea"
                    name="rejectMessage"
                    className="rounded border p-3 w-full"
                    placeholder="Enter rejection reason"
                  />
                  <ErrorMessage
                    name="rejectMessage"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </Form>
            }
            primaryButtonText="Reject"
            primaryButtonColor="danger"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
};

export default PartnerDetails;
