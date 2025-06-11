import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { RiFilter3Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdRemoveRedEye } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import {
  CommonModal,
  CustomTable,
  HeaderCard,
  Search,
  CustomFilterDropdown,
  PaginationRow,
} from "../../../components";

import {
  lastUpdatedOptions,
  restaurantOnboardingCounts,
  restaurantOnboardingTableData,
} from "./constants";

const RestaurantOnboarding = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedLastUpdatedFilter, setSelectedLastUpdatedFilter] = useState("Last Updated");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("Status");

  const columns = [
    { title: "Res. Id", dataIndex: "resId", type: "text" },
    { title: "Restaurant Name", dataIndex: "restaurantName", type: "text" },
    { title: "Owner Name", dataIndex: "ownerName", type: "text" },
    {
      title: "Profile Status",
      dataIndex: "profileStatus",
      type: "text",
    },
    {
      title: "Verification Status",
      dataIndex: "verificationStatus",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-full text-center py-1 px-2 w-3/4 mx-auto ${
            value === "Approved" ? "bg-green-100 text-green-700" : ""
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Onboarding Status",
      dataIndex: "onboardingStatus",
      type: "custom",
      render: (value) => (
        <div
          className={`flex items-center gap-2 ${
            value === "Approved" ? "bg-green-100 text-green-700" : ""
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              value === "Live"
                ? "bg-green-500"
                : value === "In Progress"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          <span>{value}</span>
        </div>
      ),
    },
    { title: "Last Updated", dataIndex: "lastUpdated", type: "text" },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      render: (_, row) => (
        <div className="flex justify-center">
          <div className="relative group">
            <button className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">
              <BsThreeDotsVertical />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block z-10 p-3">
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => navigate("restaurant-details")}
              >
                <MdRemoveRedEye color="#000145" size={20} />
                <span>View Details</span>
              </div>
              <hr className="my-2" />
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => setModalShow(true)}
              >
                <GoXCircleFill color="#000145" size={20} />
                <span>Reject</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h4 className="mb-6 font-bold text-2xl text-primary">Restaurant Onboarding</h4>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {restaurantOnboardingCounts?.map((item, index) => (
          <HeaderCard
            key={index}
            heading={item.heading}
            count={item.count}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="bg-white mt-6 p-6 rounded shadow">
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Search />
          <div className="flex flex-row items-center gap-3">
            <CustomFilterDropdown
              filterOptions={lastUpdatedOptions}
              icon={<SlCalender />}
              value={selectedLastUpdatedFilter}
              handleOnChange={setSelectedLastUpdatedFilter}
            />
            <CustomFilterDropdown
              filterOptions={lastUpdatedOptions}
              icon={<RiFilter3Fill />}
              value={selectedStatusFilter}
              handleOnChange={setSelectedStatusFilter}
            />
          </div>
        </div>

        <CustomTable columns={columns} data={restaurantOnboardingTableData} />
        <PaginationRow totalResults={100} resultsPerPage={4} />
      </div>

      <CommonModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        title="Reject Application"
        icon={<FcCancel color="red" size={24} />}
        buttonText="Reject Application"
      >
        <p className="text-sm text-gray-600 mb-2">
          Please specify the reason for rejection to notify the restaurant owner.
        </p>
        <h6 className="font-semibold mb-1">Rejection Reason</h6>
        <textarea
          className="w-full rounded border p-2 text-sm focus:outline-none resize-none"
          rows={3}
          placeholder="eg. your Documents is Wrong"
        />
      </CommonModal>
    </div>
  );
};

export default RestaurantOnboarding;
