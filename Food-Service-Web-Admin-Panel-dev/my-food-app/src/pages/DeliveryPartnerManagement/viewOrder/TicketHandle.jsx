import React from "react";
import { TbTruckReturn, TbMessageCircleUser } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { MdEarbuds } from "react-icons/md";
import { ticketData } from "./constants/index";
import { Icons } from "../../../assets";

// Icon generator
const getIcon = (type) => {
  const baseClasses =
    "rounded-full p-2 flex items-center justify-center w-10 h-10";
  switch (type) {
    case "return":
      return (
        <div className={`${baseClasses} bg-yellow-100 text-red-600`}>
          <Icons.TruckReturn size={20} />
        </div>
      );
    case "restaurant":
    case "customer":
      return (
        <div className={`${baseClasses} bg-red-100 text-red-600`}>
          <Icons.Complaint size={20} />
        </div>
      );
    case "drop":
      return (
        <div className={`${baseClasses} bg-green-100 text-green-600`}>
          <Icons.Location size={20} />
        </div>
      );
    case "pickup":
      return (
        <div className={`${baseClasses} bg-blue-subtle text-blue`}>
          <Icons.Truck size={20} />
        </div>
      );
    case "onTheWay":
      return (
        <div className={`${baseClasses} bg-yellow-200 text-blue-600`}>
          <Icons.RouteOutline size={20} />
        </div>
      );
    case "incoming":
      return (
        <div className={`${baseClasses} bg-yellow-100 text-yellow-600`}>
          <Icons.Bell size={20} />
        </div>
      );
    default:
      return null;
  }
};

// Status badge color mapping
const statusColor = {
  success: "bg-success-subtle text-success border-success",
  accepted: "bg-blue-subtle text-blue border-blue",
  pending: "bg-warning-subtle text-warning border-warning",
  rejected: "bg-danger-subtle text-danger border-danger",
};

export const ticketMeta = [
  {
    id: "return",
    title: "Return",
    iconType: "return",
    responseLabel: "Call Response",
  },
  {
    id: "restaurant",
    title: "Restaurant complaint",
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
    title: "Customer complaint",
    iconType: "customer",
    responseLabel: "Message",
  },
  {
    id: "onTheWay",
    title: "On the way",
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
    <div className="space-y-4">
      {ticketData.map((ticket, index) => {
        const meta = ticketMeta.find((m) => m.id === ticket.metaId);
        if (!meta) return null;

        return (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm w-[70%]"
          >
            <div className="flex justify-between items-start">
              {/* Left content */}
              <div className="flex gap-4">
                {/* Icon */}
                {getIcon(meta.iconType)}

                {/* Info block */}
                <div>
                  <h5 className="font-semibold text-base text-gray-800">
                    {meta.title}
                  </h5>
                  <p className="text-sm text-gray-500">{ticket.time}</p>

                  <div className="flex text-sm text-gray-600 mt-1">
                    <span className="mr-1">Ticket ID</span>
                    <span className="font-semibold">- {ticket.ticketId}</span>
                  </div>

                  <p className="text-red-600 font-medium text-sm mt-2">
                    {ticket.description}
                  </p>

                  <div className="flex text-sm mt-1">
                    <span className="font-semibold mr-1">
                      {meta.responseLabel}
                    </span>
                    <span className="text-gray-500">
                      - {ticket.responseMessage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: status badge */}
              <div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-lg border ${
                    statusColor[ticket.status] || "bg-gray-400"
                  }`}
                >
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketDetails;
