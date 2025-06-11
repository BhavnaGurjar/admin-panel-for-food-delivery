import React from "react";
import {
  preparationDetails,
  slaCompliance,
  orderStatus2,
} from "../../constants";
const Preparing = () => {
  const renderValue = (value) =>
    value ? (
      <span className="fw-semibold">{value}</span>
    ) : (
      <span className="text-muted">N/A</span>
    );

  return (
    <>
      {/* Order Acceptance & Movement */}
      <div className="col-6 border rounded mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              Preparation Details
            </h6>
          </div>
          <DataRow
            label="Preparation Time"
            value={renderValue(preparationDetails.time)}
          />
          <DataRow
            label="Time Left"
            value={renderValue(preparationDetails.timeLeft)}
          />
          <DataRow
            label="Marked Ready"
            value={renderValue(preparationDetails.markedready)}
          />
        </div>
      </div>

      {/* Communication & Response */}
      <div className="col-6 border rounded mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              SLA Compliance
            </h6>
          </div>
          <DataRow
            label="SLA Breach"
            value={renderValue(slaCompliance.breach)}
          />
          <DataRow
            label="Order SLA Timer"
            value={renderValue(slaCompliance.timer)}
          />
        </div>
      </div>

      {/* Order Cancellation */}
      <div className="col-6 border rounded my-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">Order Status</h6>
          </div>
          <DataRow
            label="Call Response"
            value={renderValue(orderStatus2.callResponse)}
          />
          <DataRow
            label="Order Cancelled?"
            value={renderValue(orderStatus2.orderCancelled)}
          />
        </div>
      </div>
    </>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="p-0 mb-0 pe-1">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default Preparing;
