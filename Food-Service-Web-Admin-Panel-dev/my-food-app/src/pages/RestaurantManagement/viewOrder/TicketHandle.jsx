import React from "react";
import { TbTruckReturn, TbMessageCircleUser } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { MdEarbuds } from "react-icons/md";
import { Row, Col, Button } from "react-bootstrap";
import { ticketData } from "./constants/index";

const getIcon = (type) => {
  switch (type) {
    case "return":
      return (
        <div className="mb-2 text-custom-red flex items-center justify-center bg-warning-subtle rounded-circle p-2">
          <TbTruckReturn size={24} />
        </div>
      );
    case "restaurant":
    case "customer":
      return (
        <div className="mb-2 text-danger flex items-center justify-center bg-danger-subtle rounded-circle p-2">
          <TbMessageCircleUser size={24} />
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

// ticketMeta
export const ticketMeta = [
  {
    id: "return",
    title: "Return",
    iconType: "return",
    responseLabel: "Call Response",
  },
  {
    id: "restaurant",
    title: "Resturant Complaint",
    iconType: "restaurant",
    responseLabel: "Message",
  },
  {
    id: "drop1",
    title: "Drop Location",
    iconType: "drop",
    responseLabel: "Call Response",
  },
  {
    id: "drop2",
    title: "Drop Location",
    iconType: "drop",
    responseLabel: "Call Response",
  },
  {
    id: "pickup",
    title: "Pickup Location",
    iconType: "pickup",
    responseLabel: "Call Response",
  },
  {
    id: "customer",
    title: "Customer Complaint",
    iconType: "customer",
    responseLabel: "Message",
  },
  {
    id: "onTheWay",
    title: "On the Way",
    iconType: "onTheWay",
    responseLabel: "Call Response",
  },
  {
    id: "incoming",
    title: "Incoming",
    iconType: "incoming",
    responseLabel: "Message",
  },
];

const TicketDetails = () => {
  return (
    <>
      {ticketData.map((ticket, index) => {
        const meta = ticketMeta.find((m) => m.id === ticket.metaId);
        if (!meta) return null;

        return (
          <div
            key={index}
            className="bg-white my-4 p-3 rounded-3 shadow-sm col-9"
          >
            <Row className="justify-between align-items-start">
              <Col>
                <div className="flex gap-2">
                  {getIcon(meta.iconType)}
                  <span>
                    <h5 className="mb-0 fw-semibold">{meta.title}</h5>
                    <span className="fs-7 text-muted">{ticket.time}</span>
                  </span>
                </div>
                <div className="flex items-center pt-1">
                  <p className="p-0 mb-0 pe-1 text-muted">Ticket ID</p>
                  <span className="p-0 mb-0 fw-semibold">
                    - {ticket.ticketId}
                  </span>
                </div>
                <h6 className="text-custom-red pt-2">{ticket.description}</h6>
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
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default TicketDetails;
