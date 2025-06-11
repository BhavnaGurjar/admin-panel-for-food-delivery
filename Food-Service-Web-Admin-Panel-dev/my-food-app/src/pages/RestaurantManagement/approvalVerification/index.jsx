import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "../../../utils/DateTime";
import { Icons } from "../../../assets";
import {
  CustomTable,
  Search,
  MainScreenLoader,
  CustomFilterDropdown,
  PaginationRow,
} from "../../../components";
import { useGetTicketsForVerificationQuery } from "../../../apis/ticket";

const ApprovalVerification = () => {
  const navigate = useNavigate();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filter = {
    pageNo,
    pageSize,
    status: selectedStatusFilter,
    name: searchTerm,
    startDate: null,
    endDate: null,
  };

  const { data: response, isLoading: isGetLoading } =
    useGetTicketsForVerificationQuery({
      type: "RESTAURANT",
      filter: encodeURIComponent(JSON.stringify(filter)),
    });
  const tableData = response?.tickets || [];
  const applicationStats = response?.applicationData?.[0] || {};

  const statusFilterOptions = useMemo(() => [
    {
      label: `Pending (${applicationStats.approvedApplication || 0})`,
      value: "APPROVED",
    },
    {
      label: `Rejected (${applicationStats.rejectedApplication || 0})`,
      value: "REJECTED",
    },
  ], [applicationStats]);

  const columns = [
    { title: "Res. Id", dataIndex: "restaurantDisplayId", type: "text" },
    { title: "Restaurant Name", dataIndex: "restaurantName", type: "text" },
    { title: "Owner Name", dataIndex: "ownerName", type: "text" },
    {
      title: "Submission Date",
      dataIndex: "subMisssionDate",
      type: "custom",
      render: (value) => {
        const { date } = DateTime(value, { showYear: true, showTime: false });
        return date;
      },
    },
    {
      title: "Submission Time",
      dataIndex: "subMisssionDate",
      type: "custom",
      render: (value) => {
        const { time } = DateTime(value, { showYear: false, showTime: true });
        return time;
      },
    },
    {
      title: "Verification Status",
      dataIndex: "verificationStatus",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-[0.375rem] text-[0.75rem] font-medium flex items-center justify-center
            ${
              value === "APPROVED"
                ? "text-[rgba(250,173,20,1)] bg-[rgba(255,253,211,1)] border-[0.063rem] border-[rgba(250,173,20,1)] w-[4.313rem] h-[1.625rem]"
                : "bg-[rgba(255,77,79,0.1)] text-[rgba(255,77,79,1)] border-[0.063rem] border-[rgba(255,77,79,1)] w-[4.313rem] h-[1.625rem]"
            }`}
        >
          {value === "APPROVED" ? <span>Pending</span> : <span>Rejected</span>}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      render: (_, row) => (
        <button
          className="flex justify-center items-center p-1 border border-transparent hover:border-[rgba(209,213,219,1)] hover:bg-[rgba(243,244,246,1)] rounded-md w-16"
          onClick={() =>
            navigate(
              `/restaurant-management/approvals/restaurant-info/${row.id}/${row.restaurantId}/${row.verificationStatus}/${row.message}/${row.rejectionStep}/1`
            )
          }
        >
          <Icons.Eye />
          <span className="pl-1 text-sm"> View</span>
        </button>
      ),
    },
  ];

  const totalResults = applicationStats?.totalApplication || 0;

  return (
    <div>
      {isGetLoading && <MainScreenLoader />}
      <h4 className="text-xl font-semibold mb-4 text-gray-800">
        Approval & Verification
      </h4>

      <div className="mt-2 bg-white border-gray rounded-lg p-2.5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="p-2">
            <Search setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex items-center gap-4 p-2 relative">
     <CustomFilterDropdown
  filterOptions={statusFilterOptions}
  value={
    statusFilterOptions.find((opt) => opt.value === selectedStatusFilter)
      ?.label || "Status"
  }
  selectedCount={tableData.length} 
  handleOnChange={(label) => {
    const selectedOption = statusFilterOptions.find(
      (opt) => opt.label === label
    );
    setSelectedStatusFilter(selectedOption?.value ?? null);
  }}
/>


          </div>
        </div>

        <div className="mt-6">
          <CustomTable columns={columns} data={tableData} />
          {tableData.length > 0 ? (
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
              <h2 className="font-satoshi font-medium text-lg">
                No Data Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalVerification;
