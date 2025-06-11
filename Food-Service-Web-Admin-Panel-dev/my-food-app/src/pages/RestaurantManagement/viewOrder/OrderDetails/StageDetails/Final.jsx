import React from "react";
import { orderCompletion } from "../../constants";

const Final = () => {
  const renderValue = (value) =>
    value ? (
      <span className="fw-semibold">{value}</span>
    ) : (
      <span className="text-muted">N/A</span>
    );

  return (
    <div className="col-6 border rounded my-3">
      <div className="p-2">
        <div className="tabs-row">
          <h6 className="text-custom-primary fw-medium pt-2">
            Order Completion Status
          </h6>
        </div>
        <DataRow
          label="Final Status"
          value={renderValue(orderCompletion.finalStatus)}
        />
        <DataRow label="Time" value={renderValue(orderCompletion.time)} />
        <DataRow label="Stage" value={renderValue(orderCompletion.stage)} />
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="p-0 mb-0 pe-1">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default Final;
