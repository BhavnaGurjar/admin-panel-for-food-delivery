import { Breadcrumbs } from "../../../components";
import OrderDetails from "./OrderDetails";
import TicketHandle from "./TicketHandle";
import { useState } from "react";

const ViewOrder = () => {
  const [active, setActive] = useState("orderDetails");

  const breadcrumbItems = [
    {
      name: "Order & Ticket Details",
      link: "/delivery-partner-management/dashboard",
    },
    { name: "Active Orders" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="py-2 mb-2 flex flex-row items-center">
          <h3 className="text-[1.75rem] font-satoshi font-bold">
            Order & Ticket Details
          </h3>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-5">
        <button
          className={`px-2 rounded-lg transition font-medium ${
            active === "orderDetails"
              ? "bg-info text-white"
              : "bg-white text-info border border-info"
          }`}
          onClick={() => setActive("orderDetails")}
        >
          Order Details
        </button>

        <button
          className={`px-4 py-3 rounded-lg transition font-medium ${
            active === "ticketHandled"
              ? "bg-info text-white"
              : "bg-white text-info border border-info"
          }`}
          onClick={() => setActive("ticketHandled")}
        >
          Ticket Handled
        </button>
      </div>

      {/* Content */}
      {active === "orderDetails" ? <OrderDetails /> : <TicketHandle />}
    </div>
  );
};

export default ViewOrder;
