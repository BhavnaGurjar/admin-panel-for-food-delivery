import { Breadcrumbs } from "../../../components";
import OrderDetails from "./OrderDetails";
import TicketHandle from "./TicketHandle";
import { useState } from "react";

const ViewOrder = () => {
  const [active, setActive] = useState("orderDetails");
  const breadcrumbItems = [
    {
      name: "Active Orders",
      link: "/customer-management/view-orders",
    },
    { name: "Order & Ticket Details", },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-2xl font-semibold">
            Order & Ticket Details
          </h3>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="flex gap-3 mb-4">
        <button
          className={`px-3 py-2 rounded-lg font-medium transition ${
            active === "orderDetails"
              ? "bg-primary text-white"
              : "bg-white text-primary border-primary border"
          }`}
          onClick={() => setActive("orderDetails")}
        >
          Order Details
        </button>
        <button
          className={`px-3 py-2 rounded-lg font-medium transition ${
            active === "ticketHandled"
         ? "bg-primary text-white"
              : "bg-white text-primary border-primary border"
          }`}
          onClick={() => setActive("ticketHandled")}
        >
          Ticket Handled
        </button>
      </div>

      <div>
        {active === "orderDetails" ? <OrderDetails /> : <TicketHandle />}
      </div>
    </div>
  );
};

export default ViewOrder;
