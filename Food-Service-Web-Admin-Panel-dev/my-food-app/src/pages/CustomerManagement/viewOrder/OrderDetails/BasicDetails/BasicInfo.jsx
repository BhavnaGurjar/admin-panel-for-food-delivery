import { basicInfoData } from "../../constants";

const BasicInfo = () => {
  const {
    customer,
    restaurant,
    orderAssignment,
    additionalInformation,
    order,
    orderAmount,
    orderTimeLine,
  } = basicInfoData;

  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="w-full mt-3 px-2">
      <div className="flex flex-col lg:flex-row md:w-9/12 lg:w-full gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {/* Customer Details */}
          <div className="border border-black-10 rounded-md bg-white p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Customer Details
            </h6>
            <DataRow label="Customer Name" value={renderValue(customer.name)} />
            <DataRow
              label="Customer Contact"
              value={renderValue(customer.contact)}
            />
            <DataRow
              label="Customer Location"
              value={renderValue(customer.location)}
            />
            <DataRow
              label="Customer Instructions"
              value={renderValue(customer.location)}
            />
          </div>

          {/* Restaurant Details */}
          <div className="border border-black-10 rounded-md bg-white  p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Restaurant Details
            </h6>
            <DataRow
              label="Restaurant Name"
              value={renderValue(restaurant.name)}
            />
            <DataRow
              label="Restaurant Contact"
              value={renderValue(restaurant.contact)}
            />
          </div>

          {/* Delivery Details */}
          <div className="border border-black-10 rounded-md bg-white  p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Order Assignment & Delivery Details
            </h6>
            <DataRow
              label="Reassignment"
              value={renderValue(orderAssignment.reassignment)}
            />
            <DataRow
              label="Reassignment Count"
              value={renderValue(orderAssignment.reassignmentCount)}
            />
            <DataRow
              label="Reassignment Type"
              value={renderValue(orderAssignment.type)}
            />
            <DataRow
              label="Delivery Partner Name"
              value={renderValue(orderAssignment.name)}
            />
            <DataRow
              label="Delivery Partner Contact"
              value={renderValue(orderAssignment.contact)}
            />
          </div>

          {/* Additional Info */}
          <div className="border border-black-10 rounded-md bg-white p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Additional Information
            </h6>
            <DataRow
              label="Ticket Handled"
              value={renderValue(additionalInformation.ticketHandle)}
            />
            <DataRow
              label="Reason for Cancellation"
              value={renderValue(additionalInformation.ReasonforCancellation)}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4">
          {/* Order Details */}
          <div className="border border-black-10 rounded-md bg-white p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Order Identification Details
            </h6>
            <DataRow label="Order ID" value={renderValue(order.id)} />
            <DataRow
              label="Order Placed At"
              value={renderValue(order.placedAt)}
            />
            <DataRow
              label="Current Order Status"
              value={renderValue(order.currentOrderStatus)}
            />
            <div className="flex items-center pt-2">
              <p className="mb-0 mr-2">Final Order Status :</p>
              <span>
                <button
                  className={`text-xs font-medium py-1 px-2 rounded-md ${
                    order.paymentStatus === "Paid"
                      ? "bg-[rgba(3,188,68,0.1)] border-[0.063rem] border-[rgba(3,188,68,1)] text-[rgba(3,188,68,1)]"
                      : order.paymentStatus === "Unpaid"
                      ? "bg-[rgba(255,77,79,0.1)] border-[0.063rem] border-[rgba(255,77,79,1)] text-[rgba(255,77,79,1)]"
                      : order.paymentStatus === "Pending"
                      ? "bg-[rgba(255,253,211,1)] border-[0.063rem] border-[rgba(250,173,20,1)] text-[rgba(250,173,20,1)]"
                      : "bg-gray-400"
                  }`}
                >
                  {order.paymentStatus}
                </button>
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border border-black-10 rounded-md bg-white p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Payment & Order Amount Details
            </h6>
            <DataRow
              label="Order Type"
              value={renderValue(orderAmount.orderType)}
            />
            <DataRow
              label="Payment Status"
              value={renderValue(orderAmount.paymentStatus)}
            />
            <DataRow
              label="Order Amount"
              value={renderValue(orderAmount.orderAmount)}
            />
            <DataRow
              label="Discount Applied"
              value={renderValue(orderAmount.discountApplied)}
            />
            <DataRow
              label="Discount Type"
              value={renderValue(orderAmount.discountType)}
            />
            <DataRow
              label="Final Payable Amount"
              value={renderValue(orderAmount.finalPayAmount)}
            />
          </div>

          {/* Timeline Info */}
          <div className="border border-black-10 rounded-md bg-white p-3">
            <h6 className=" font-medium text-base border-b border-black-10 pb-1">
              Order Timeline & Status Tracking
            </h6>
            <DataRow
              label="Order Timeline"
              value={renderValue(orderAmount.orderTimeline)}
            />
            <DataRow
              label="Order Duration"
              value={renderValue(orderAmount.orderDiscount)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="mb-0 mr-2 text-[rgba(95,94,94,1)] text-[0.938rem]">{label}:</p>
    <span>{value}</span>
  </div>
);

export default BasicInfo;
