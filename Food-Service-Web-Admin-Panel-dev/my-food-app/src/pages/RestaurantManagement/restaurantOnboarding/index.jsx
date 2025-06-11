import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets";
import DateTime from "../../../utils/DateTime";
import { useGetOnboardingDataQuery } from "../../../apis/restaurant";

import {
  CommonModal,
  CustomTable,
  HeaderCard,
  Search,
  CustomFilterDropdown,
  PaginationRow,
} from "../../../components";

import {
  onboardingStatusOptions
} from "./constants";

const RestaurantOnboarding = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedLastUpdatedFilter, setSelectedLastUpdatedFilter] = useState("Last Updated");

  const filter = {
    pageNo,
    pageSize,
    status: selectedStatusFilter.length > 0 ? selectedStatusFilter : null,
    name: searchTerm,
  };

  const { data, isLoading: isGetLoading } =
    useGetOnboardingDataQuery({
      type: "RESTAURANT",
      filter: encodeURIComponent(JSON.stringify(filter)),
    });
  const tableData = data?.data?.restaurantList || [];
  const restaurantOnboardingCounts = [
  {
    heading: "Total Restaurants in Onboarding",
    count: data?.data?.totalCount ?? 0,
    icon: (
      <div className="rounded-full w-12 h-12 flex justify-center bg-[rgba(71,57,216,0.05)] items-center p-2">
        <Icons.Home strokeColor={"#4739D8"} />
      </div>
    ),
  },
  {
    heading: "Incomplete Profiles",
    count: data?.data?.notStartedCount ?? 0,
    icon: (
      <div className="rounded-full w-12 h-12 bg-[rgba(246,155,14,0.05)] flex justify-center items-center p-2">
        <Icons.WarnInfo size={30} />
      </div>
    ),
  },
  {
    heading: "Pending Admin Reviews",
    count: data?.data?.inProgressCount ?? 0,
    icon: (
      <div className="rounded-full w-12 h-12 flex bg-[#4739D80D] justify-center items-center p-2">
        <Icons.Note />
      </div>
    ),
  },
  {
    heading: "Approved/Live Restaurants",
    count: data?.data?.liveCount ?? 0,
    icon: (
      <div className="rounded-full bg-[rgba(239,254,239,1)] w-12 h-12 flex justify-center items-center p-2">
        <Icons.Checked size={30} />
      </div>
    ),
  },
];

  const columns = [
    { title: "Res. Id", dataIndex: "refId", type: "text" },
    { title: "Restaurant Name", dataIndex: "restaurantName", type: "text" },
    { title: "Owner Name", dataIndex: "ownerName", type: "text" },
    {
      title: "Profile Status",
      dataIndex: "stepCount",
      type: "text",
      render: (stepCount) => {
        const steps = Math.min(stepCount, 5); // max limit to 5
        const percentage = steps * 20;
        return `${percentage}% (${steps} step${steps === 1 ? "" : "s"})`;
      },
    },
    {
      title: "Onboarding Status",
      dataIndex: "onboardingStatus",
      type: "custom",
      render: (value) => {
        const styles = {
          LIVE: [
            "Live",
            "bg-success-10 text-success border border-[0.063rem] border-success w-[3.4375rem] h-[1.625rem]",
          ],
          IN_PROGRESS: [
            "In Progress",
            "bg-warning-10 text-warning border border-[0.063rem] border-warning w-[5.1875rem] h-[1.625rem]",
          ],
          NOT_STARTED: [
            "Not Started",
            "bg-danger-10 text-danger border border-[0.063rem] border-danger w-[5.3125rem] h-[1.625rem]",
          ],
        };

        const [label, className] = styles[value] || [value, ""];

        return (
          <div className={`rounded text-center px-2 py-1 font-medium text-xs ${className}`}>
            {label}
          </div>
        );
      },
    },
    {
      title: "Last Updated", dataIndex: "updatedAt",
      type: "custom",
      render: (value) => {
        const { date } = DateTime(value, { showYear: true, showTime: false });
        return date;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      render: (_, row) => (
        <button className="flex justify-center items-center p-1 border border-transparent hover:border-[rgba(209,213,219,1)] hover:bg-[rgba(243,244,246,1)] rounded-md w-16"
          onClick={() =>
              navigate(`restaurant-details/${row.restaurantId}`, {
                state: {
                  RestaurantId: row.restaurantId,
                  Id: row.id,
                  stepCount:row.stepCount
                },})}
        >
          <Icons.Eye />
          <span className="pl-1 text-sm text-blue"> View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="">
      <h4 className="mb-6 font-bold text-2xl font-satoshi">Restaurant Onboarding</h4>

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
          <Search setSearchTerm={setSearchTerm} />
          <div className="flex flex-row items-center gap-3">
            <CustomFilterDropdown
              filterOptions={onboardingStatusOptions}
              value={selectedStatusFilter}
              selectedCount={selectedStatusFilter.length || null}
              handleOnChange={setSelectedStatusFilter}
            />
            <div className="flex justify-center items-center rounded-lg w-[8.0505rem] h-[2.49rem] bg-[rgba(82,196,26,0.1)] text-[rgba(82,196,26,1)] border border-[rgba(82,196,26,1)]">
              <span><Icons.Checked2 /></span><span>Approved</span>
            </div>
            <div>
              <Icons.WarnInfo strokeColor={'#5F5E5E'} />
            </div>
          </div>
        </div>

        <div className="shadow-md">
          <CustomTable columns={columns} data={data?.data?.restaurantList} />
        </div>
        {tableData.length > 0 ? (
          <PaginationRow
            totalResults={data?.data?.totalCount || 0}
            resultsPerPage={pageSize}
            currentPage={pageNo}
            onPageChange={(newPage) => setPageNo(newPage)}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNo(1);
            }}
          />

        ) : (
          <div className="flex flex-row items-center justify-center pt-8 pb-3">
            <h2 className="font-satoshi font-medium text-lg">
              No Data Found
            </h2>
          </div>
        )}
      </div>

      <CommonModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        title="Reject Application"
        icon={<Icons.Cross2 strokeColor="rgba(255,77,79,1)" strokeWidth='0.125rem' />}
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
