import { useEffect, useState } from "react";
import { TbTruckReturn } from "react-icons/tb";
import { MdMyLocation, MdRemoveRedEye } from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiPathBold } from "react-icons/pi";
import { RiCustomerServiceLine } from "react-icons/ri";
import {
  CustomTable,
  Search,
  PaginationRow,
  CustomFilterDropdown,
} from "../../../components";
import "react-circular-progressbar/dist/styles.css";
import StageLogsOffcanvas from "./StageLogsOffcanvas";
import "./style.css";
import { Icons } from "../../../assets";

const ActiveOrders = () => {
  const [showSubData, setShowSubData] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("Tickets");
  const [selectedOrderId, setSelectedOrderId] = useState("12345");
  const totalTime = 180;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [finalStatusTab, setFinalStatusTab] = useState("Cancellation");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const tickets = [
    {
      icon: <TbTruckReturn size={24} />,
      title: "Return",
      time: "7.00 AM",
      ticketId: "12345",
      status: "Success",
      message: "OTP Verification Pending",
      response: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      icon: <MdMyLocation size={24} />,
      title: "Drop Location",
      time: "7.00 AM",
      ticketId: "12349",
      status: "Cancelled",
      message: "OTP Verification Pending",
      response: "Drop Order Successfully",
    },
    {
      icon: <LuTruck size={24} />,
      title: "Pickup Location",
      time: "7.00 AM",
      ticketId: "12347",
      status: "Not Responded",
      message: "OTP Verification Pending",
      response: "OTP Verified Successfully",
    },
    {
      icon: <RiCustomerServiceLine size={24} />,
      title: "Customer Complaint",
      time: "7.00 AM",
      ticketId: "12349",
      status: "Success",
      message: "Customer Unresponsive",
      response: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      icon: <PiPathBold size={24} />,
      title: "On the Way",
      time: "7.00 AM",
      ticketId: "12348",
      status: "Success",
      message: "Unresponsive Partner",
      response: "Call Received By User",
    },
    {
      icon: <FaRegBell size={24} />,
      title: "Incoming",
      time: "7.00 AM",
      ticketId: "12347",
      status: "Not Responded",
      message: "Emergency Partner Unavailable",
      response: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  const statusColors = {
    Success: "success",
    Cancelled: "danger",
    Warning: "warning",
    "Not Responded": "warning",
  };

  const uniqueOrderIds = [...new Set(tickets.map((ticket) => ticket.ticketId))];

  const stages = [
    {
      name: "New",
      icon: (
        <div className="rounded-full bg-blue-subtle p-2">
          <Icons.Clipboard color="#007BFF" size={24} />
        </div>
      ),
      color: "warning",
      total: 1,
      subStages: [
        { name: "Awating", count: 0 },
        { name: "Unaccepted", count: 0 },
      ],
    },
    {
      name: "In Preparation",
      icon: (
        <div className="rounded-full bg-warning-subtle p-2">
          <Icons.Clipboard color="#FFC107" size={24} />
        </div>
      ),
      color: "danger",
      total: 0,
      subStages: [
        { name: "Preparing", count: 0 },
        { name: "Order not ready", count: 0 },
      ],
    },
    {
      name: "Ready pickup",
      icon: (
        <div className="rounded-full bg-primary-subtle p-2">
          <Icons.Clipboard color="#FD7E14" size={24} />
        </div>
      ),
      color: "success",
      total: 0,
      subStages: [
        { name: "Waiting for pickup", count: 0 },
        { name: "Delay pickup", count: 0 },
      ],
    },
    {
      name: "Out delivered",
      icon: (
        <div className="rounded-full bg-success-subtle p-2">
          <Icons.Clipboard color="#28A745" size={24} />
        </div>
      ),
      color: "primary",
      total: 0,
      subStages: [
        { name: "On the way", count: 0 },
        { name: "Reached drop", count: 0 },
      ],
    },
    {
      name: "Delivered",
      icon: (
        <div className="rounded-full bg-success-subtle p-2">
          <Icons.Clipboard color="#198754" size={24} />
        </div>
      ),
      color: "success",
      total: 0,
      subStages: [
        { name: "On time", count: 0 },
        { name: "Delay", count: 0 },
      ],
    },
    {
      name: "Order issues",
      icon: (
        <div className="rounded-full bg-danger-subtle p-2">
          <Icons.Clipboard color="#DC3545" size={24} />
        </div>
      ),
      color: "primary",
      total: 0,
      subStages: [
        { name: "Restaurant part.", count: 0 },
        { name: "Delivery part.", count: 0 },
        { name: "Customer", count: 0 },
        { name: "Completed", count: 0 },
        { name: "Uncompleted", count: 0 },
      ],
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("Filters");

  const filterOptions = [{ id: 1, label: "Option 1" }];

  const columns = [
    { title: "Order Id", dataIndex: "orderId", type: "text" },
    { title: "Customer", dataIndex: "customer", type: "text" },
    { title: "Restaurant", dataIndex: "restaurant", type: "text" },
    {
      title: "Cur. Status",
      dataIndex: "curStatus",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-full text-center p-1 font-medium ${
            value === "New"
              ? "bg-green-100 text-green-600"
              : value === "In Preparation"
              ? "bg-yellow-100 text-yellow-600"
              : value === "Ready Pickup"
              ? "bg-red-100 text-red-600"
              : ""
          }`}
          style={{ fontSize: "0.8rem", width: "93px" }}
        >
          {value}
        </div>
      ),
    },
    { title: "Order Time", dataIndex: "orderTime", type: "text" },
    {
      title: "Timeliness",
      dataIndex: "timeliness",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-full text-center p-1 font-medium ${
            value === "On time"
              ? "bg-green-100 text-green-600"
              : value === "Delayed"
              ? "bg-yellow-100 text-yellow-600"
              : value === "SLA Breached"
              ? "bg-red-100 text-red-600"
              : ""
          }`}
          style={{ fontSize: "0.8rem", width: "91px" }}
        >
          {value}
        </div>
      ),
    },
    { title: "Amount", dataIndex: "amount", type: "text" },
    { title: "Delivery Part.", dataIndex: "deliveryPartner", type: "text" },
    {
      title: "Final Status",
      dataIndex: "finalStatus",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-full text-center p-1 font-medium ${
            value === "Delivered"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
          style={{ fontSize: "0.8rem", width: "85px" }}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      type: "custom",
      render: (_, __, index) => (
        <div className="relative">
          <div className="relative">
            <button
              onClick={() => {
                setActiveDropdownIndex(
                  activeDropdownIndex === index ? null : index
                );
                setDropdownOpen(!dropdownOpen);
              }}
              className="rounded-full bg-gray-200 bg-opacity-75 text-gray-800 opacity-75 action-dots p-2"
            >
              <BsThreeDotsVertical />
            </button>
            {dropdownOpen && activeDropdownIndex === index && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-10">
                <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-black-10 rounded-md">
                  <MdRemoveRedEye color="#000145" size={20} />
                  <span>View Details</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  const orderTableData = [
    {
      orderId: "4556",
      customer: "Ritesh...",
      restaurant: "Ritesh...",
      curStatus: "New",
      orderTime: "5.00 PM",
      timeliness: "On time",
      amount: "₹500",
      payment: "Paid",
      deliveryPartner: "Ritesh...",
      finalStatus: "Delivered",
    },
    {
      orderId: "4556",
      customer: "Ritesh...",
      restaurant: "Ritesh...",
      curStatus: "In Preparation",
      orderTime: "5.00 PM",
      timeliness: "Delayed",
      amount: "₹500",
      payment: "Pending",
      deliveryPartner: "Ritesh...",
      finalStatus: "Undelivered",
    },
    {
      orderId: "4556",
      customer: "Ritesh...",
      restaurant: "Ritesh...",
      curStatus: "New",
      orderTime: "5.00 PM",
      timeliness: "On time",
      amount: "₹500",
      payment: "Paid",
      deliveryPartner: "Ritesh...",
      finalStatus: "Delivered",
    },
    {
      orderId: "4556",
      customer: "Ritesh...",
      restaurant: "Ritesh...",
      curStatus: "Ready Pickup",
      orderTime: "5.00 PM",
      timeliness: "SLA Breached",
      amount: "₹500",
      payment: "Pending",
      deliveryPartner: "Ritesh...",
      finalStatus: "Undelivered",
    },
  ];

  const logs = [
    {
      status: "green",
      message: "New order ID 8978564512 placed by Ram Sharma.",
    },
    {
      status: "orange",
      message: "New order ID 8978564512 placed by Ram Sharma.",
    },
    { status: "red", message: "New order ID 8978564512 placed by Ram Sharma." },
    {
      status: "green",
      message: "New order ID 8978564512 placed by Ram Sharma.",
    },
  ];

  const cardLogs = {
    New: [
      {
        status: "custom-green",
        message: "New order ID 8978564512 placed by Ram Sharma.",
      },
      {
        status: "custom-primary",
        message: "Order ID 8978564512 remains unaccepted.",
      },
    ],
    "In Preparation": [
      {
        status: "custom-green",
        message: "New order ID 8978564512 placed by Ram Sharma.",
      },
      {
        status: "custom-primary",
        message: "Order ID 8978564512 remains unaccepted.",
      },
    ],
    "Ready pickup": [
      {
        status: "custom-green",
        message: "New order ID 8978564512 placed by Ram Sharma.",
      },
      {
        status: "custom-primary",
        message: "Order ID 8978564512 remains unaccepted.",
      },
    ],
    "Out delivered": [
      {
        status: "custom-green",
        message: "New order ID 8978564512 placed by Ram Sharma.",
      },
      {
        status: "custom-primary",
        message: "Order ID 8978564512 remains unaccepted.",
      },
    ],
    Delivered: [
      {
        status: "custom-green",
        message: "New order ID 8978564512 placed by Ram Sharma.",
      },
      {
        status: "custom-primary",
        message: "Order ID 8978564512 remains unaccepted.",
      },
    ],
  };

  return (
    <div className="relative h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl md:text-2xl lg:text-3xl font-satoshi font-bold">
          Active Orders
        </h4>
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        {stages.map((stage, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm">
            <div className="border-0 rounded-xl flex flex-col h-full">
              <div className="flex flex-col flex-grow p-4">
                {/* Main Heading */}
                <div className="flex gap-2 items-center text-base font-semibold">
                  <div
                    className={`text-${stage.color} bg-${stage.color}-100 rounded-full icon-size-card flex justify-center items-center`}
                  >
                    {stage.icon}
                  </div>
                  <span className="ps-2 truncate">{stage.name}</span>
                </div>

                <div className="my-2 flex justify-center gap-2">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">00</span>
                </div>

                {stage.name === "Order issues" && (
                  <>
                    {/* Main Tabs */}
                    <div className="flex justify-center text-xs my-2 w-full">
                      <button
                        className={`border-0 bg-transparent w-[48%] pt-2 font-medium px-1 ${
                          finalStatusTab === "Cancellation"
                            ? "text-primary border-b-2 border-b-primary font-medium"
                            : ""
                        }`}
                        onClick={() => setFinalStatusTab("Cancellation")}
                      >
                        Cancellations
                      </button>
                      <button
                        className={`border-0 bg-transparent w-[48%] pt-2 font-medium px-1 ${
                          finalStatusTab === "Refunds"
                            ? "text-primary border-b-2 border-b-primary"
                            : ""
                        }`}
                        onClick={() => setFinalStatusTab("Refunds")}
                      >
                        Refunds
                      </button>
                    </div>
                  </>
                )}

                {stage.name === "Order issues"
                  ? stage.subStages
                      ?.filter((status) => {
                        if (finalStatusTab === "Cancellation") {
                          return (
                            status.name === "Restaurant part." ||
                            status.name === "Delivery part." ||
                            status.name === "Customer"
                          );
                        } else if (finalStatusTab === "Refunds") {
                          return (
                            status.name !== "Restaurant part." &&
                            status.name !== "Delivery part." &&
                            status.name !== "Customer"
                          );
                        }
                        return false;
                      })
                      .map((status, i) => (
                        <div
                          key={i}
                          className="mt-2 border border-black-10 rounded p-3"
                        >
                          <div className="flex justify-between text-xs font-medium">
                            <span className="font-medium">{status.name}</span>
                            <span className="font-bold">
                              {status.count || 0}
                            </span>
                          </div>
                          {showSubData &&
                            status.subStages?.length > 0 &&
                            status.subStages.map((subStatus, j) => (
                              <div
                                key={j}
                                className={`mt-2 rounded-xl p-2 bg-custom-secondary border`}
                              >
                                <div className="flex justify-between">
                                  <span className="font-medium text-xs">
                                    {subStatus.name}
                                  </span>
                                  <span className="font-bold text-xs">
                                    {subStatus.count || 0}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))
                  : stage.subStages?.map((status, i) => (
                      <div
                        key={i}
                        className="mt-2 border border-black-10 rounded p-3"
                      >
                        <div className="flex justify-between text-xs font-medium">
                          <span className="font-medium text-scorpion">
                            {status.name}
                          </span>
                          <span className="font-bold">{status.count || 0}</span>
                        </div>

                        {/* Nested SubStages */}
                        {showSubData &&
                          status.subStages?.length > 0 &&
                          status.subStages.map((subStatus, j) => (
                            <div
                              key={j}
                              className={`mt-2 rounded-xl p-2 bg-custom-secondary
                              ${
                                subStatus.name === "SLA breach"
                                  ? "border-red-200 border"
                                  : status.name === "Delay"
                                  ? "border-yellow-200 border"
                                  : "border border-black-20"
                              }`}
                            >
                              <div className="flex justify-between">
                                <span className="font-medium text-xs">
                                  {subStatus.name}
                                </span>
                                <span className="font-bold text-xs">
                                  {subStatus.count || 0}
                                </span>
                              </div>

                              {/* Deep SubStages */}
                              {showSubData &&
                                subStatus.subStages?.length > 0 &&
                                subStatus.subStages.map((deepSub, k) => (
                                  <div
                                    key={k}
                                    className={`mt-2 rounded-xl p-2 flex justify-between bg-white
                                    ${
                                      deepSub.name === "SLA breach"
                                        ? "border border-red-200"
                                        : deepSub.name === "Delay"
                                        ? "border-yellow-200 border"
                                        : "border border-black-20"
                                    }`}
                                  >
                                    <span className="font-medium text-xs">
                                      {deepSub.name}
                                    </span>
                                    <span className="font-bold text-xs">
                                      {deepSub.count || 0}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    ))}
              </div>

              {cardLogs[stage.name] && (
                <div className="bg-card rounded-b-xl flex flex-col p-2">
                  {cardLogs[stage.name].map((log, index) => (
                    <div
                      key={index}
                      className="pt-2 pb-0 px-1 flex justify-between items-center"
                    >
                      <div className="flex">
                        <div>
                          <div
                            className={`log-status bg-${log.status} mt-1 mx-1`}
                          ></div>
                        </div>
                        <p className="text-xs m-0 text-gray-500 line-clamp-1">
                          {log.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end p-2">
                <button
                  className="rounded-full border shadow-sm border-black-10 p-2 flex justify-center items-center hover:bg-black-10 transition-colors"
                  onClick={handleOpenOffcanvas}
                >
                  <Icons.Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-4 p-4 rounded-xl shadow-sm">
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full md:w-auto">
            <Search />
          </div>
          <div className="w-full md:w-auto">
            <CustomFilterDropdown
              filterOptions={filterOptions}
              value={selectedFilter}
              handleOnChange={(value) => {
                setSelectedFilter(value);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <CustomTable columns={columns} data={orderTableData} />
        </div>

        <div className="mt-4">
          <PaginationRow />
        </div>
      </div>

      <StageLogsOffcanvas
        showOffcanvas={showOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
        logs={logs}
      />
    </div>
  );
};

export default ActiveOrders;
