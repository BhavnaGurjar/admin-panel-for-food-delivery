import { useState } from "react";
import { allPartnerCounts } from "./constants";
import { HeaderCard, Breadcrumbs } from "../../../components";
import { Icons, images } from "../../../assets";

const PartnerDetailsAll = () => {
  const [activeTab, setActiveTab] = useState("personalDetails");
  const [personalDetailsActiveTab, setPersonalDetailsActiveTab] =
    useState("personalDetails");

  const breadcrumbItems = [
    {
      name: "All Partners",
      link: "/delivery-partner-management/all-partners",
    },
    { name: "Partner Details" },
  ];

  const applicationCounts = [
    {
      heading: "Total Orders",
      count: 6000,
      icon: (
        <div className="rounded-full p-2 bg-[#6F42C11A]">
          <Icons.Clipboard />
        </div>
      ),
    },
    {
      heading: "Order Completed",
      count: 5000,
      icon: (
        <div className="rounded-full p-2 bg-[#DFF5E4]">
          <Icons.CircleCheckOutline />
        </div>
      ),
    },
    {
      heading: "Order Cancelled",
      count: 100,
      icon: (
        <div className="rounded-full p-2 bg-[#FDE2E2]">
          <Icons.CircleCancelOutline />
        </div>
      ),
    },
    {
      heading: "No. of Complain",
      count: 5800,
      icon: (
        <div className="rounded-full p-2 bg-[#FFF4E4]">
          <Icons.CircleAlertOutline />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <h4 className="text-xl md:text-2xl font-bold">Rajesh Verma</h4>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pb-4">
        {applicationCounts?.map((item, index) => (
          <div key={index}>
            <HeaderCard
              heading={item.heading}
              count={item.count}
              icon={item.icon}
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg mt-4 shadow-sm pt-2">
        <div className="p-4">
          {/* Main Tabs */}
          <div className="flex mb-6">
            <div className="bg-gray p-2 rounded-full flex gap-2">
              <button
                onClick={() => setActiveTab("personalDetails")}
                className={`rounded-full py-3 px-4 ${
                  activeTab === "personalDetails"
                    ? "bg-orange-500 text-white"
                    : "bg-transparent"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("activity&Feedback")}
                className={`rounded-full py-3 px-4 ${
                  activeTab === "activity&Feedback"
                    ? "bg-orange-500 text-white"
                    : "bg-transparent"
                }`}
              >
                Activity & Feedback
              </button>
            </div>
          </div>

          {/* Personal Details */}
          {activeTab === "personalDetails" && (
            <>
              {/* Sub Tabs */}
              <div className="flex border-b border-blue-20 my-8">
                <button
                  onClick={() => setPersonalDetailsActiveTab("personalDetails")}
                  className={`pb-3 px-4 ${
                    personalDetailsActiveTab === "personalDetails"
                      ? "border-b-2 border-blue text-blue font-bold"
                      : "text-blue-50"
                  }`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => setPersonalDetailsActiveTab("workSetting")}
                  className={`pb-3 px-4 ${
                    personalDetailsActiveTab === "workSetting"
                      ? "border-b-2 border-blue text-blue font-bold"
                      : "text-blue-50"
                  }`}
                >
                  Work Setting
                </button>
                <button
                  onClick={() =>
                    setPersonalDetailsActiveTab("bank&Documentation")
                  }
                  className={`pb-3 px-4 ${
                    personalDetailsActiveTab === "bank&Documentation"
                      ? "border-b-2 border-blue text-blue font-bold"
                      : "text-blue-50"
                  }`}
                >
                  Bank & Documentation
                </button>
              </div>

              <div className="py-4">
                {personalDetailsActiveTab === "personalDetails" && (
                  <>
                    <h6 className="text-xl font-bold mb-6 text-kilamanjaro fw-bold">
                      Personal Details
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Partner Information
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">First Name</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">Rajesh</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">Last Name</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">Verma</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">Gender</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">Male</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Contact No.
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">9988776655</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Language Chosen
                            </p>
                            <p className="w-8 text-center text-kilamanjaro">
                              -
                            </p>
                            <p className="font-medium">English</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">Selfie</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <img
                              src={images.selfie || "/placeholder.svg"}
                              alt="selfie"
                              className="h-16 w-16 rounded"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Agreement and Submission
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Registration Fee
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">200</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Transaction Id
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">#Del4567</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Date & Time
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">22/07/2024 3:30 AM</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-kilamanjaro">
                              Payment Method
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">UPI</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {personalDetailsActiveTab === "workSetting" && (
                  <>
                    <h6 className="text-lg font-bold mb-8">Work Setting</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Vehicle & License
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">Vehicle type</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">Petrol</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">Number plate</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">8899775566</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">License</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">567890</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Area & Timing
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">
                              Selected work area
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">
                              Narmada Colony, Khategaon
                            </p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">
                              Preferred work time
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">All day full time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {personalDetailsActiveTab === "bank&Documentation" && (
                  <>
                    <h6 className="text-lg mb-8 text-kilamanjaro font-bold">
                      Bank & Documentation
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Bank Details
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">
                              Account Number
                            </p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">45678912345</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">IFSC Code</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">IFSC789067</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">Branch Name</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">Khategaon</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-black-20 rounded-xl p-4">
                        <h6 className="text-lg font-medium mb-3 text-kilamanjaro">
                          Documentation
                        </h6>
                        <div className="flex flex-col gap-4 mt-5">
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">PAN Image</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <img
                              src={images.pan || "/placeholder.svg"}
                              alt="PAN card"
                              className="h-16 w-24 rounded"
                            />
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">Aadhar Number</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">366953295678</p>
                          </div>
                          <div className="flex">
                            <p className="w-1/3 text-gray-600">PAN Number</p>
                            <p className="w-8 text-center text-gray-400">-</p>
                            <p className="font-medium">123456789</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Activity & Feedback tab content would go here */}
          {activeTab === "activity&Feedback" && (
            <div className="py-4">
              <h6 className="text-lg font-medium">Activity & Feedback</h6>
              <p className="text-gray-500 mt-2">
                No activity or feedback available.
              </p>
            </div>
          )}

          {/* Commented because removed from figma also */}
          {/* Footer Buttons */}
          {/* <div className="pt-3 flex justify-end gap-2">
            <button
              className="bg-gray-200 rounded-full px-4 py-2 text-gray-500 opacity-50"
              disabled
            >
              Save Draft
            </button>
            <button
              className="bg-orange-500 rounded-full px-4 py-2 text-white opacity-50"
              disabled
            >
              Submit
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsAll;
