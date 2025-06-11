import { deliveryPartnerRouteConstants } from "../../../routes/routesConstants";
import { useGetTicketsForVerificationQuery } from "../../../apis/ticket";
import { statusFilterOptions } from "./constants";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CustomFilterDropdown,
  CustomTable,
  HeaderCard,
  PaginationRow,
  Search,
  CityDropdown,
  DateRangeDropdown,
  MainScreenLoader,
} from "../../../components";
import { Icons } from "../../../assets";

const Application = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [locationFilterOptions, setLocationFilterOptions] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedLocationFilter, setSelectedLocationFilter] =
    useState("Select Location");
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const filter = {
    pageNo,
    pageSize,
    status: selectedStatusFilter,
    name: searchTerm,
    startDate: selectedRange.startDate
      ? new Date(selectedRange.startDate).getTime()
      : null,
    endDate: selectedRange.endDate
      ? new Date(selectedRange.endDate).getTime() + 24 * 60 * 60 * 1000
      : null,
  };

  const { data, isLoading: isGetLoading } = useGetTicketsForVerificationQuery({
    type: "DELIVERY_PARTNER",
    filter: encodeURIComponent(JSON.stringify(filter)),
  });

  const tickets = data?.tickets ?? [];
  const totalResults = data?.applicationData?.[0]?.totalApplication || 0;

  const applicationCounts = [
    {
      heading: "In Review",
      count: data?.applicationData?.[0]?.approvedApplication,
      icon: (
        <div className="rounded-full p-2 bg-[#DFF5E4]">
          <Icons.InReview />
        </div>
      ),
    },
    {
      heading: "Rejected",
      count: data?.applicationData?.[0]?.rejectedApplication,
      icon: (
        <div className="rounded-full p-2 bg-[#FDE2E2]">
          <Icons.CircleCancelOutline />
        </div>
      ),
    },
    {
      heading: "Pending Approval",
      count: data?.applicationData?.[0]?.pendingApplication,
      icon: (
        <div className="rounded-full p-2 bg-[#FFF4E4]">
          <Icons.CircleEditOutline />
        </div>
      ),
    },
    {
      heading: "Total Application",
      count: data?.applicationData?.[0]?.totalApplication,
      icon: (
        <div className="rounded-full p-2 bg-[#6F42C11A]">
          <Icons.Town />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (Array.isArray(data?.tickets)) {
      const uniqueWorkAreas = Array.from(
        new Set(data.tickets.map((item) => item.workArea).filter(Boolean))
      ).map((area) => ({ label: area, value: area }));

      const optionsWithDefault = [
        { label: "Select Location", value: "" },
        ...uniqueWorkAreas,
      ];

      setLocationFilterOptions(optionsWithDefault);
    }
  }, [data]);

  const columns = [
    {
      title: "Partner Id",
      dataIndex: "deliveryPartnerDisplayId",
      type: "text",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      type: "custom",
      render: (value, row) =>
        `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
    },
    { title: "Mobile No.", dataIndex: "mobileNumber", type: "text" },
    {
      title: "Preferred Work Area",
      dataIndex: "workArea",
      type: "text",
      render: (value, row) => `${row.workArea ?? ""}, ${row.city ?? ""}`.trim(),
    },
    {
      title: "Status",
      dataIndex: "status",
      type: "custom",
      render: (value, row) => (
        <div
          className={`rounded-lg font-medium text-sm text-center py-1 px-1 cursor-pointer border-2 ${
            value === "PENDING"
              ? "bg-pending-subtle border-pending text-pending"
              : value === "IN REVIEW"
              ? "bg-blue-subtle border-blue text-blue-600"
              : value === "REJECTED"
              ? "bg-rejected-subtle border-rejected text-rejected"
              : value === "APPROVED"
              ? "bg-success-subtle border-success text-success"
              : ""
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Application Submission",
      dataIndex: "applicationSubmission",
      type: "custom",
      render: (value) => {
        if (!value) return "-";
        const date = new Date(Number(value));
        if (isNaN(date.getTime())) return "Invalid Date";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      render: (_, row) => (
        <div className="my-auto">
          <button
            onClick={() =>
              navigate(deliveryPartnerRouteConstants.redirectPartnerDetails, {
                state: {
                  partnerId: row.deliveryPartnerId,
                  Name: `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
                  id: row.id,
                  status: row.status,
                  reason: row.message,
                },
              })
            }
            className="p-2 rounded-full hover:bg-black-10 border-0 opacity-75"
          >
            <Icons.ViewFilled />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {isGetLoading && <MainScreenLoader />}
      <div className="flex flex-row items-center justify-between pt-2">
        <h4 className="text-[1.75rem] font-satoshi font-bold">Applications</h4>
        <CityDropdown
          selectedCity={selectedCity}
          onSelect={(city) => setSelectedCity(city)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        {applicationCounts?.map((item, index) => (
          <HeaderCard
            key={index}
            heading={item.heading}
            count={item.count}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="bg-white mt-3 p-6 rounded-lg shadow-sm">
        {/* Responsive Filter Row */}
        <div className="mb-4 flex flex-col lg:flex-row lg:flex-wrap lg:items-center justify-between md:gap-4 pb-6">
          <Search setSearchTerm={setSearchTerm} />
          <div className="flex flex-wrap ms-auto justify-end items-center gap-3">
            <CustomFilterDropdown
              filterOptions={statusFilterOptions}
              value={
                statusFilterOptions.find(
                  (opt) => opt.value === selectedStatusFilter
                )?.label
              }
              handleOnChange={(label) => {
                const selectedOption = statusFilterOptions.find(
                  (opt) => opt.label === label
                );
                setSelectedStatusFilter(selectedOption?.value ?? null);
              }}
            />
            <DateRangeDropdown
              selectedRange={selectedRange}
              onDateRangeChange={(range) => setSelectedRange(range)}
            />
            <CustomFilterDropdown
              filterOptions={locationFilterOptions}
              value={selectedLocationFilter}
              handleOnChange={(value) => {
                setSelectedLocationFilter(value);
              }}
            />
          </div>
        </div>

        <CustomTable columns={columns} data={tickets} />

        {tickets.length > 0 ? (
          <PaginationRow
            totalResults={totalResults}
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
            <h2 className="font-satoshi font-medium text-lg">No Data Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
