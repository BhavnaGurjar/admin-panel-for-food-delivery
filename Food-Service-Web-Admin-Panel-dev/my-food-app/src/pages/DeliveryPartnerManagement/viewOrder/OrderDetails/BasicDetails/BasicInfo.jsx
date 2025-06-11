import { basicInfoData } from "../../constants/index";
import { SectionCard, SectionRow } from "../../Section";

const BasicInfo = () => {
  const { customer, restaurant, delivery, cancellation, order, reassignment } =
    basicInfoData;

  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="mt-4 px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Customer Details */}
          <SectionCard title="Customer Details">
            <SectionRow
              label="Customer Name"
              value={renderValue(customer.name)}
            />
            <SectionRow
              label="Customer Contact"
              value={renderValue(customer.contact)}
            />
            <SectionRow
              label="Customer Location"
              value={renderValue(customer.location)}
            />
          </SectionCard>

          {/* Restaurant Details */}
          <SectionCard title="Restaurant Details">
            <SectionRow
              label="Restaurant Name"
              value={renderValue(restaurant.name)}
            />
            <SectionRow
              label="Restaurant Contact"
              value={renderValue(restaurant.contact)}
            />
          </SectionCard>

          {/* Delivery Details */}
          <SectionCard title="Delivery Details">
            <SectionRow
              label="Delivery Partner Name"
              value={renderValue(delivery.name)}
            />
            <SectionRow
              label="Delivery Partner Contact"
              value={renderValue(delivery.contact)}
            />
            <SectionRow
              label="Delivery Vehicle Type"
              value={renderValue(delivery.vehicleType)}
            />
            <SectionRow
              label="Delivery Fee"
              value={renderValue(delivery.fee)}
            />
          </SectionCard>

          {/* Cancellation Details */}
          <SectionCard title="Cancellation Details">
            <SectionRow
              label="Reason for Cancellation"
              value={renderValue(cancellation.reason)}
            />
          </SectionCard>
        </div>

        <div className="space-y-4">
          {/* Order Details */}
          <SectionCard title="Order Details">
            <SectionRow label="Order ID" value={renderValue(order.id)} />
            <SectionRow
              label="Order Placed At"
              value={renderValue(order.placedAt)}
            />
            <SectionRow label="Order Type" value={renderValue(order.type)} />
            <SectionRow
              label="Payment Status"
              value={<StatusBadge status={order.paymentStatus} />}
            />
            <SectionRow
              label="Final Payable Amount"
              value={renderValue(order.amount)}
            />
            <SectionRow
              label="Current Order Status"
              value={renderValue(order.currentStatus)}
            />
            <SectionRow
              label="Order Timeline"
              value={renderValue(order.timeline)}
            />
            <SectionRow
              label="Order Duration"
              value={renderValue(order.duration)}
            />
            <SectionRow
              label="Ticket Handled"
              value={renderValue(order.ticketHandled)}
            />
            <SectionRow
              label="Final Order Status"
              value={<StatusBadge status={order.finalStatus} />}
            />
          </SectionCard>

          {/* Reassignment Details */}
          <SectionCard title="Reassignment Details">
            <SectionRow
              label="Reassignment"
              value={renderValue(reassignment.name)}
            />
            <SectionRow
              label="Reassignment Count"
              value={renderValue(reassignment.count)}
            />
            <SectionRow
              label="Reassignment Type"
              value={renderValue(reassignment.type)}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

// Badge component for statuses
const StatusBadge = ({ status }) => {
  let color = "bg-gray-400";
  if (status === "Paid" || status === "Delivered")
    color = "bg-success-subtle text-success border-success";
  else if (status === "Pending")
    color = "bg-warning-subtle text-warning border-pending";
  else if (status === "Unpaid" || status === "Undelivered")
    color = "bg-danger-subtle text-danger border-danger";

  return (
    <span
      className={`text-xs font-regular px-3 py-1 rounded-lg border-2 inline-block ${color}`}
    >
      {status}
    </span>
  );
};

export default BasicInfo;
