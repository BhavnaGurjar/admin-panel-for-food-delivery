import { Icons } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { deliveryPartnerRouteConstants } from "../../../routes/routesConstants";
import {
  CustomFilterDropdown,
  CustomTable,
  PaginationRow,
  Search,
  CityDropdown,
} from "../../../components";
import {
  locationFilterOptions,
  statusFilterOptions,
  vehicleFilterOptions,
} from "./constants";
import { useState, useRef, useEffect } from "react";

const AllPartners = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedVehicleFilter, setSelectedVehicleFilter] =
    useState("Select Vehicle");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState("Select Status");
  const [selectedLocationFilter, setSelectedLocationFilter] =
    useState("Select Location");

  // Not needed for now maybe used in future
  const ThreeDotsDropdown = ({ row }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() =>
            navigate(deliveryPartnerRouteConstants.redirectPartnerDetailsAll)
          }
          className="p-2 hover:bg-black-10 rounded-full bg-gray-100 transition flex flex-row items-center gap-2"
        >
          <Icons.Eye />
          <span>View</span>
        </button>
      </div>
    );
  };

  const columns = [
    { title: "Partner Id", dataIndex: "partnerId", type: "text" },
    { title: "Name", dataIndex: "name", type: "text" },
    { title: "Mobile No.", dataIndex: "mobileNo", type: "text" },
    {
      title: "Preferred Work Area",
      dataIndex: "preferredWorkArea",
      type: "text",
    },
    {
      title: "Status",
      dataIndex: "status",
      type: "custom",
      render: (value) => (
        <div
          className={`text-center border-2 py-1 px-2 rounded-lg ${
            value === "Pending"
              ? "bg-pending-subtle border-pending text-warning"
              : value === "In Review"
              ? "bg-success-subtle border-success text-success"
              : value === "Rejected"
              ? "bg-rejected-subtle border-rejected text-rejected"
              : ""
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      title: "All Partners Submission",
      dataIndex: "applicationSubmission",
      type: "text",
    },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      // render: (value, row) => <ThreeDotsDropdown row={row} />,
      render: (value, row) => (
        <div className="my-auto">
          <button
            onClick={() =>
              navigate(deliveryPartnerRouteConstants.redirectPartnerDetailsAll)
            }
            className="p-2 rounded-full hover:bg-black-10 border-0 opacity-75"
          >
            <Icons.ViewFilled />
          </button>
        </div>
      ),
    },
  ];

  const deliveryManagementTableData = [
    {
      partnerId: "0123",
      name: "Ritesh Chouhan",
      mobileNo: "9988776655",
      preferredWorkArea: "Khategaon, Narmada...",
      status: "Pending",
      applicationSubmission: "22/07/2024",
    },
    {
      partnerId: "0124",
      name: "Ravi Verma",
      mobileNo: "9988776622",
      preferredWorkArea: "Dewas, Madhya Pradesh",
      status: "In Review",
      applicationSubmission: "20/07/2024",
    },
    {
      partnerId: "0125",
      name: "Priya Sharma",
      mobileNo: "9988776644",
      preferredWorkArea: "Indore, MP",
      status: "Rejected",
      applicationSubmission: "18/07/2024",
    },
  ];

  return (
    <div>
      <div className="py-2 mb-2 flex flex-row items-center justify-between">
        <h4 className="text-[1.75rem] font-satoshi font-bold">
          All Partners (200)
        </h4>
        <div className="relative py-2">
          <CityDropdown
            selectedCity={selectedCity}
            onSelect={setSelectedCity}
          />
        </div>
      </div>

      <div className="bg-white mt-3 p-6 rounded-lg shadow-sm">
        {/* Responsive Filter Layout */}
        <div className="mb-4 flex flex-col lg:flex-row lg:flex-wrap lg:items-center justify-between gap-4 pb-6">
          <Search />
          <div className="flex flex-wrap ms-auto justify-end items-center gap-3">
            <CustomFilterDropdown
              labelText="Select Vehicle"
              filterOptions={vehicleFilterOptions}
              value={selectedVehicleFilter}
              handleOnChange={setSelectedVehicleFilter}
            />
            <CustomFilterDropdown
              labelText="Select Status"
              filterOptions={statusFilterOptions}
              value={selectedStatusFilter}
              handleOnChange={setSelectedStatusFilter}
            />
            <CustomFilterDropdown
              labelText="Select Location"
              filterOptions={locationFilterOptions}
              value={selectedLocationFilter}
              handleOnChange={setSelectedLocationFilter}
            />
          </div>
        </div>

        <CustomTable columns={columns} data={deliveryManagementTableData} />

        {deliveryManagementTableData.length > 0 ? (
          <PaginationRow
            totalResults={deliveryManagementTableData.length}
            resultsPerPage={5}
            currentPage={1}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
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

export default AllPartners;
