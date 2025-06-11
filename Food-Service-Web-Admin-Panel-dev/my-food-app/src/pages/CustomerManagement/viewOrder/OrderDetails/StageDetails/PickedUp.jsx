import { useState } from "react";
import { transitStatus, issuesOrderCancel } from "../../constants";

const PickedUp = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="mx-2">
      {/* Delivery Partner & Restaurant Readiness */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-primary font-medium  pb-1">
              Order Pickup & Transit Status
            </h6>
          </div>
          <DataRow
            label="Picked Up?"
            value={renderValue(transitStatus.pickUp)}
          />
          <DataRow
            label="On the Way?"
            value={renderValue(transitStatus.ontheWay)}
          />
          <DataRow
            label="Timestamp"
            value={renderValue(transitStatus.timestamp)}
          />
        </div>
      </div>

      {/* OTP Verification & Security */}
      <div className="flex items-start gap-2">
        <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md my-3">
          <div className="p-2">
            <div className="tabs-row">
              <h6 className="text-primary font-medium  pb-1">
                Issues & Order Cancellation
              </h6>
            </div>
            <DataRow
              label="Ticket Raised?"
              value={renderValue(issuesOrderCancel.ticketRaised)}
            />
            <DataRow
              label="Ticket Status"
              value={renderValue(issuesOrderCancel.ticketStatus)}
            />
            <DataRow
              label="Order Cancelled?"
              value={renderValue(issuesOrderCancel.orderCancelled)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-1">
    <p className="p-0 mb-0 pr-1 text-[rgba(95,94,94,1)] text-[0.938rem]">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default PickedUp;
