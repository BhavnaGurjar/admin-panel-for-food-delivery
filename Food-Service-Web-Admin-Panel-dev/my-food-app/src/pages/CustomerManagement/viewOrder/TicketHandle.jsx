import { Icons } from "../../../assets";
import { ticketData } from "./constants/index";

// Ticket Metadata
const ticketMeta = [
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

// Icon Generator
const getIcon = (type) => {
  const baseClasses =
    "mb-2 flex items-center justify-center rounded-full p-2 w-10 h-10";

  const iconMap = {
    return: {
      className: "bg-red-100",
      icon: <Icons.ReturnTruck />,
    },
    restaurant: {
      className: "bg-red-100",
      icon: <Icons.Complaints />,
    },
    customer: {
      className: "bg-red-100",
      icon: <Icons.Complaints />,
    },
    drop: {
      className: "bg-green-100",
      icon: <Icons.Location />,
    },
    pickup: {
      className: "bg-sky-100",
      icon: <Icons.Truck />,
    },
    onTheWay: {
      className: "bg-red-100",
      icon: <Icons.Way />,
    },
    incoming: {
      className: "bg-yellow-100",
      icon: <Icons.Bell />,
    },
  };

  const data = iconMap[type];
  if (!data) return null;

  return <div className={`${baseClasses} ${data.className}`}>{data.icon}</div>;
};

// Main Component
const TicketDetails = () => {
  return (
    <>
      {ticketData.map((ticket, index) => {
        const meta = ticketMeta.find((m) => m.id === ticket.metaId);
        if (!meta) return null;

        return (
          <div
            key={index}
            className="bg-white my-4 p-4 rounded-xl shadow-sm w-full max-w-4xl"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex gap-2">
                  {getIcon(meta.iconType)}
                  <div>
                    <h5 className="mb-0 font-semibold">{meta.title}</h5>
                    <span className="text-sm text-[rgba(95,94,94,1)]">{ticket.time}</span>
                  </div>
                </div>

                <div className="flex items-center pt-1 text-sm">
                  <p className="m-0 mr-1 text-[rgba(95,94,94,1)]">Ticket ID</p>
                  <span className="font-medium">- {ticket.ticketId}</span>
                </div>

                <h6 className="text-red-600 pt-1 text-sm">{ticket.description}</h6>

                <div className="flex items-center text-sm pt-1">
                  <p className="m-0 mr-1 font-medium">{meta.responseLabel}</p>
                  <span className="text-[rgba(95,94,94,1)]">
                    - {ticket.responseMessage}
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-end pt-2">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded ${
                    ticket.status === "success" || ticket.status === "accepted"
                      ? "bg-[rgba(3,188,68,0.1)] border-[0.063rem] border-[rgba(3,188,68,1)] text-[rgba(3,188,68,1)]"
                      : ticket.status === "pending"
                      ? "bg-[rgba(255,253,211,1)] border-[0.063rem] border-[rgba(250,173,20,1)] text-[rgba(250,173,20,1)]"
                      : ticket.status === "rejected"
                      ? "bg-[rgba(255,77,79,0.1)] border-[0.063rem] border-[rgba(255,77,79,1)] text-[rgba(255,77,79,1)]"
                      : "bg-gray-40 border border-black-40 text-gray"
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
    </>
  );
};

export default TicketDetails;
