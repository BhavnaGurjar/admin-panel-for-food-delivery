import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Breadcrumbs } from "../../../components";
import OrderDetails from "./OrderDetails";
import TicketHandle from "./TicketHandle";

const ViewOrder = () => {
  const [active, setActive] = useState("orderDetails");

  const breadcrumbItems = [
    {
      name: "Active Orders",
    },
    { name: "Order & Ticket Details", link: "/" },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="py-2 mb-2 flex flex-row items-center">
          <h3 className="mt-0 font-primary">Order & Ticket Details</h3>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="flex gap-3">
        <Button
          className={
            active === "orderDetails"
              ? "p-2 rounded-3"
              : "p-2 bg-white text-primary rounded-3"
          }
          onClick={() => setActive("orderDetails")}
        >
          Order Details
        </Button>

        <Button
          className={
            active === "ticketHandled"
              ? "p-2 rounded-3"
              : "p-2 bg-white text-primary rounded-3"
          }
          onClick={() => setActive("ticketHandled")}
        >
          Ticket Handled
        </Button>
      </div>

      {active === "orderDetails" ? (
        <>
          <OrderDetails />
        </>
      ) : (
        <>
          <TicketHandle />
        </>
      )}
    </div>
  );
};

export default ViewOrder;
