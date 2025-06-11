import { useEffect, useState } from "react";
import {
  FaBell,
  FaTruck,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaFlagCheckered,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { MdRemoveRedEye } from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Row, Col, Card, Dropdown, Button } from "react-bootstrap";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { MdEarbuds } from "react-icons/md";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ticketData } from "../viewOrder/constants";
import {
  TicketCard,
  CustomTable,
  Search,
  PaginationRow,
  CustomFilterDropdown,
} from "../../../components";
import { tickets, ticketMeta, orderTableData } from "./constants";
import "react-circular-progressbar/dist/styles.css";

const LiveActivityMonitoring = () => {
  const [showSubData, setShowSubData] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("Tickets");
  const [selectedOrderId, setSelectedOrderId] = useState("12345");
  const totalTime = 180;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const percentage = (timeLeft / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const uniqueOrderIds = [...new Set(tickets.map((ticket) => ticket.ticketId))];

  const filteredTickets = tickets.filter(
    (ticket) => ticket.ticketId === selectedOrderId
  );
  const getIcon = (type) => {
    switch (type) {
      case "return":
        return (
          <div className="mb-2 text-custom-red flex items-center justify-center bg-danger-subtle rounded-circle p-2">
            <TbTruckReturn size={24} />
          </div>
        );
      case "drop":
        return (
          <div className="mb-2 text-success bg-success-subtle flex items-center justify-center rounded-circle p-2">
            <HiOutlineLocationMarker size={24} />
          </div>
        );
      case "pickup":
        return (
          <div className="mb-2 text-primary bg-primary-subtle flex items-center justify-center rounded-circle p-2">
            <LuTruck size={24} />
          </div>
        );
      case "onTheWay":
        return (
          <div className="mb-2 text-custom-primary bg-custom-yellow-light flex items-center justify-center rounded-circle p-2">
            <MdEarbuds size={24} />
          </div>
        );
      case "incoming":
        return (
          <div className="mb-2 text-warning bg-warning-subtle flex items-center justify-center rounded-circle p-2">
            <AiOutlineBell size={24} />
          </div>
        );
      default:
        return null;
    }
  };

  const stages = [
    {
      name: "Incoming",
      icon: <FaBell size={16} />,
      color: "warning",
      total: 1,
      subStages: [
        { name: "Requests", count: 0 },
        { name: "Request Sent", count: 0 },
        {
          name: "Reassignment",
          subStages: [{ name: "Request Sent", count: 0 }],
        },
        {
          name: "50% SLA Reassign",
          subStages: [{ name: "Request Sent", count: 0 }],
        },
        {
          name: "Emergency Partner",
          subStages: [{ name: "Request Sent", count: 0 }],
        },
      ],
    },
    {
      name: "On the way",
      icon: <FaTruck size={16} />,
      color: "danger",
      total: 0,
      subStages: [
        {
          name: "Accepted & On the way",
          subStages: [
            { name: "On time", count: 0 },
            { name: "Delay", count: 0 },
            {
              name: "Unresponsive",
              subStages: [
                { name: "Within SLA", count: 0 },
                { name: "SLA breach", count: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Pickup location",
      icon: <FaMapMarkerAlt size={16} />,
      color: "info",
      total: 0,
      subStages: [
        { name: "Reached Pickup", count: 0 },
        {
          name: "OTP Verification",
          subStages: [
            { name: "Within SLA", count: 0 },
            { name: "SLA breach", count: 0 },
          ],
        },
      ],
    },
    {
      name: "Drop location",
      icon: <FaLocationArrow size={16} />,
      color: "success",
      total: 0,
      subStages: [
        {
          name: "Out for delivery",
          subStages: [
            {
              name: "On the way",
              subStages: [
                { name: "On time", count: 0 },
                { name: "Delay", count: 0 },
                { name: "Unresponsive", count: 0 },
              ],
            },
            {
              name: "Reached drop & Verifying OTP",
              subStages: [
                { name: "Within SLA", count: 0 },
                { name: "SLA breach", count: 0 },
              ],
            },
          ],
        },

        {
          name: "Return",
          subStages: [
            { name: "Back to Restaurant", count: 0 },
            {
              name: "Reached return & Verifying OTP",
              subStages: [
                { name: "Within SLA", count: 0 },
                { name: "SLA breach", count: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Final Status",
      icon: <FaFlagCheckered size={16} />,
      color: "secondary",
      total: 0,
      subStages: [
        {
          name: "Delivered",
          subStages: [
            { name: "On time", count: 0 },
            { name: "Delay", count: 0 },
          ],
        },
        { name: "Cancelled", count: 0 },
        { name: "Returned", count: 0 },
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
          className={`rounded-pill text-center p-1 fw-medium ${
            value === "New"
              ? "bg-success-subtle text-success"
              : value === "In Preparation"
              ? "bg-warning-subtle text-warning"
              : value === "Ready Pickup"
              ? "bg-danger-subtle text-danger"
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
          className={`rounded-pill text-center p-1 fw-medium ${
            value === "On time"
              ? "bg-success-subtle text-success"
              : value === "Delayed"
              ? "bg-warning-subtle text-warning"
              : value === "SLA Breached"
              ? "bg-danger-subtle text-danger"
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
          className={`rounded-pill text-center p-1 fw-medium ${
            value === "Delivered"
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
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
      render: () => (
        <div className="position-relative">
          <Dropdown className="position-relative">
            <Dropdown.Toggle
              variant="link"
              className="action-toggler rounded-circle bg-secondary-subtle text-dark opacity-75 action-dots"
            >
              <BsThreeDotsVertical />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end px-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <MdRemoveRedEye color="#000145" size={20} />
                <span>View Details</span>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 position-relative h-100">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h4 className="fw-bold mb-4 primary-font">Live activity monitoring</h4>
        <div className="flex gap-2 items-center">
          <div className="shadow-sm bg-white rounded-circle p-1 text-custom-primary">
            <IoMdNotificationsOutline size={24} />
          </div>
          <p className="p-0 m-1">Show all data</p>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={showSubData}
              onChange={() => setShowSubData(!showSubData)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="row gx-2">
        {stages.map((stage, index) => (
          <div key={index} className="col">
            <Card
              className={`shadow-sm border-0 rounded-3 flex flex-column`}
              style={{ width: "100%", height: "100%" }}
            >
              <Card.Body className="flex flex-column flex-grow-1">
                {/* Main Heading */}
                <Card.Title className="flex gap-2 items-center fs-6 fw-medium">
                  <div
                    className={`text-${stage.color} bg-${stage.color}-subtle rounded-circle icon-size-card flex justify-center items-center`}
                  >
                    {stage.icon}
                  </div>
                  {stage.name}
                </Card.Title>

                {/* Total Count */}
                <div className="mt-2 fs-5 flex justify-center gap-2">
                  <span className="fw-medium">Total</span>
                  <span className="fw-bold">{stage.total}</span>
                </div>

                {/* Sub Stages */}
                {stage.subStages?.map((status, i) => (
                  <div
                    key={i}
                    className={`mt-2  rounded-3 custom-padding custom-shadow ${
                      status.name === "SLA breach"
                        ? "border-danger-subtle"
                        : status.name === "Return" || status.name === "Delay"
                        ? "border-warning-subtle border"
                        : "border border-light-subtle"
                    }`}
                  >
                    <div className="flex justify-between fs-8 fw-medium">
                      <span className="fw-medium">{status.name}</span>
                      <span className="fw-bold">{status.count || 0}</span>
                    </div>

                    {/* Super Nested Stages */}
                    {showSubData &&
                      status.subStages?.length > 0 &&
                      status.subStages.map((subStatus, j) => (
                        <div
                          key={j}
                          className={`mt-2 rounded-3 p-2 bg-custom-secondary
                            ${
                              subStatus.name === "SLA breach" ||
                              (status.name === "Emergency Partner" &&
                                subStatus.name === "Request Sent")
                                ? "border border-danger-subtle"
                                : "border border-light-subtle"
                            }`}
                        >
                          <div className="flex justify-between">
                            <span className="fw-medium fs-8">
                              {subStatus.name}
                            </span>
                            <span className="fw-bold fs-8">
                              {subStatus.count || 0}
                            </span>
                          </div>

                          <div>
                            {showSubData &&
                              subStatus.subStages?.length > 0 &&
                              subStatus.subStages.map((deepSub, k) => (
                                <div
                                  key={k}
                                  className={`mt-2 rounded-3 p-2 flex justify-between bg-white
                                    ${
                                      deepSub.name === "SLA breach" ||
                                      (status.name === "Out for delivery" &&
                                        subStatus.name === "On the way" &&
                                        deepSub.name === "Unresponsive")
                                        ? "border border-danger-subtle"
                                        : "border border-light-subtle"
                                    }`}
                                >
                                  <span className="fw-medium fs-8">
                                    {deepSub.name}
                                  </span>
                                  <span className="fw-bold fs-8">
                                    {deepSub.count || 0}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="shadow-sm bg-white rounded-3 mt-3 p-3">
        <div className="custom-tabs-container px-3 py-2 rounded-pill">
          {["Tickets", "Emergency Delivery Partner", "Tables"].map((tab) => (
            <button
              key={tab}
              className={`border-0 px-3 py-2 rounded-pill text-secondary ${
                activeNavTab === tab
                  ? "fw-medium bg-custom-primary text-white"
                  : "bg-transparent tab-hover"
              }`}
              onClick={() => setActiveNavTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeNavTab === "Emergency Delivery Partner" ? (
          <div className="p-3 border rounded-3 mt-3">
            <Row>
              <h4 className="fs-5">Ticket List</h4>

              <Col lg={2}>
                <div className="bg-custom-secondary border p-3 flex flex-column gap-3 rounded-3 mt-2 h-100">
                  {uniqueOrderIds.map((orderId, index) => (
                    <button
                      key={index}
                      className={`rounded p-2 fs-7 border-0 w-100 ${
                        selectedOrderId === orderId
                          ? "bg-white border fw-semibold shadow-sm"
                          : " bg-transparent "
                      }`}
                      onClick={() => setSelectedOrderId(orderId)}
                      style={{
                        transition: "background 0.3s ease-in-out",
                      }}
                    >
                      Order ID: {orderId}
                    </button>
                  ))}
                </div>
              </Col>

              <Col lg={10} className="ps-0">
                <div className="rounded-3 p-3 border mt-2">
                  <div className="flex justify-between pb-2">
                    <h5 className="text-custom-primary fs-6">
                      ORDER ID: {selectedOrderId}
                    </h5>
                    <div className="fs-6 fw-semibold">
                      <IoCallOutline className="text-custom-yellow" size={20} />{" "}
                      9926490897
                    </div>
                  </div>

                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket, index) => (
                      <TicketCard key={index} {...ticket} />
                    ))
                  ) : (
                    <p className="text-muted mt-3">
                      No tickets found for this order.
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
        {activeNavTab === "Tickets" ? (
          <div className="p-3 border rounded-3 mt-3">
            <Row>
              <h4 className="fs-5">Ticket List</h4>

              <Col lg={2}>
                <div className="bg-custom-secondary border p-3 flex flex-column gap-3 rounded-3 mt-2 h-100">
                  {uniqueOrderIds.map((orderId, index) => (
                    <button
                      key={index}
                      className={`rounded p-2 fs-7 border-0 w-100 ${
                        selectedOrderId === orderId
                          ? "bg-white border fw-medium shadow-sm"
                          : " bg-transparent "
                      }`}
                      onClick={() => setSelectedOrderId(orderId)}
                      style={{
                        transition: "background 0.3s ease-in-out",
                      }}
                    >
                      Order ID: {orderId}
                    </button>
                  ))}
                </div>
              </Col>

              <Col lg={10} className="ps-0">
                <div className="rounded-3 border p-3">
                  <div className="flex justify-between border-bottom">
                    <h5 className="text-custom-primary fs-6 pb-1">
                      ORDER ID: {selectedOrderId}
                    </h5>
                    <div className="fs-6 fw-semibold">
                      <IoCallOutline className="text-custom-yellow" size={20} />{" "}
                      9926490897
                    </div>
                  </div>
                  {ticketData.map((ticket, index) => {
                    const meta = ticketMeta.find((m) => m.id === ticket.metaId);
                    if (!meta) return null;

                    return (
                      <div
                        key={index}
                        className="bg-white mt-3 mb-0 p-3 border shadow-sm rounded"
                      >
                        <Row className="justify-between align-items-start">
                          <Col>
                            <div className="flex gap-2">
                              {getIcon(meta.iconType)}
                              <span>
                                <h5 className="mb-0 fw-semibold fs-6">
                                  {meta.title}
                                </h5>
                                <span className="fs-7 text-muted">
                                  {ticket.time}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center pt-1 fs-7">
                              <p className="p-0 mb-0 pe-1 text-muted">
                                Ticket ID
                              </p>
                              <span className="p-0 mb-0 fw-semibold">
                                - {ticket.ticketId}
                              </span>
                            </div>
                            <h6 className="text-custom-red pt-2 fs-7">
                              {ticket.description}
                            </h6>
                            <div className="flex items-center fs-7">
                              <p className="p-0 mb-0 pe-1 fw-semibold">
                                {meta.responseLabel}
                              </p>
                              <span className="p-0 mb-0 text-muted">
                                - {ticket.responseMessage}
                              </span>
                            </div>
                          </Col>
                          <Col className="flex items-center justify-end pt-2">
                            {ticket.status === null ? (
                              <div className="flex flex-column align-items-end">
                                <span className="text-secondary mt-2">
                                  Preparation time left
                                </span>
                                <div style={{ width: "80px" }}>
                                  <CircularProgressbar
                                    value={percentage}
                                    text={`${minutes}:${seconds
                                      .toString()
                                      .padStart(2, "0")}`}
                                    styles={buildStyles({
                                      textSize: "20px",
                                      pathColor: "#000145",
                                      textColor: "#333",
                                      trailColor: "#d6d6d6",
                                    })}
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                            ) : (
                              <Button
                                className={`fs-7 rounded-pill border-0 text-white ${
                                  ticket.status === "success"
                                    ? "btn-success"
                                    : ticket.status === "accepted"
                                    ? "btn-success"
                                    : ticket.status === "pending"
                                    ? "bg-custom-yellow"
                                    : ticket.status === "rejected"
                                    ? "bg-custom-red"
                                    : ""
                                }`}
                              >
                                {ticket.status}
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
        {activeNavTab === "Tables" ? (
          <div className="bg-white mt-3 py-4 px-0">
            <div className="mb-4 flex flex-row items-center justify-between">
              <Search />
              <div className="flex flex-row items-center gap-3">
                <CustomFilterDropdown
                  filterOptions={filterOptions}
                  value={selectedFilter}
                  handleOnChange={(value) => {
                    setSelectedFilter(value);
                  }}
                />
              </div>
            </div>
            <CustomTable columns={columns} data={orderTableData} />
            <PaginationRow />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LiveActivityMonitoring;
