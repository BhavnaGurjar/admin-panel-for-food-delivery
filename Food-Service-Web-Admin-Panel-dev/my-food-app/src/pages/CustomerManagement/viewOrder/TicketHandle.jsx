import { Icons } from "../../../assets";
import { ticketData } from "./constants/index";

const metaMap = {
  onTheWay: {
    title: "On the Way",
    label: "Call Response",
    icon: <Icons.Way />,
    bg: "bg-sky-100",
  },
  incoming: {
    title: "Incoming",
    label: "Message",
    icon: <Icons.Bell />,
    bg: "bg-yellow-100",
  },
};

const statusClass = {
  success: "bg-[rgba(3,188,68,0.1)] border-[rgba(3,188,68,1)] text-[rgba(3,188,68,1)]",
  accepted: "bg-[rgba(3,188,68,0.1)] border-[rgba(3,188,68,1)] text-[rgba(3,188,68,1)]",
  pending: "bg-[rgba(255,253,211,1)] border-[rgba(250,173,20,1)] text-[rgba(250,173,20,1)]",
  rejected: "bg-[rgba(255,77,79,0.1)] border-[rgba(255,77,79,1)] text-[rgba(255,77,79,1)]",
};

export default function TicketDetails() {
  return ticketData.map((t, i) => {
    const meta = metaMap[t.metaId];
    if (!meta) return null;

    return (
      <div key={i} className="bg-white my-4 p-4 rounded-xl shadow-sm w-full max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex gap-2">
              <div className={`w-10 h-10 p-2 rounded-full ${meta.bg} flex items-center justify-center`}>
                {meta.icon}
              </div>
              <div>
                <h5 className="font-semibold mb-0">{meta.title}</h5>
                <span className="text-sm text-[rgba(95,94,94,1)]">{t.time}</span>
              </div>
            </div>
            <div className="text-sm pt-1">
              <span className="text-[rgba(95,94,94,1)] mr-1">Ticket ID</span>
              <span className="font-medium">- {t.ticketId}</span>
            </div>
            <h6 className="text-red-600 pt-1 text-sm">{t.description}</h6>
            <div className="text-sm pt-1">
              <span className="font-medium mr-1">{meta.label}</span>
              <span className="text-[rgba(95,94,94,1)]">- {t.responseMessage}</span>
            </div>
          </div>
          <div className="flex items-start justify-end pt-2">
            <span
              className={`text-sm font-medium px-3 py-1 rounded border-[0.063rem] ${
                statusClass[t.status] || "bg-gray-40 border-black-40 text-gray"
              }`}
            >
              {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    );
  });
}
