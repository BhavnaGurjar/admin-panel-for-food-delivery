import React, { useState } from "react";
import { orderStatus, serviceLevel, callAttempts } from "../../constants/index"; // Adjust the import path as necessary
const Incoming = () => {
  const renderValue = (value) =>
    value ? (
      <span className="fw-semibold">{value}</span>
    ) : (
      <span className="text-muted">N/A</span>
    );

  return (
    <>
      <div className="col-6 border rounded mt-3 p-2">
        <div className="tabs-row">
          <h6 className="text-custom-primary fw-medium pt-2">Order Status</h6>
        </div>
        <div className="flex items-center pt-2">
          <p className="p-0 mb-0 pe-1">Status :</p>
          <span className="p-0 mb-0">
            <button
              className={`rounded-pill btn-sm text-center fs-8 border-0 py-1 px-2 text-white
                        ${
                          orderStatus.status === "Pending"
                            ? "bg-custom-yellow"
                            : orderStatus.status === "Accepted"
                            ? "bg-custom-green"
                            : orderStatus.status === "Rejected"
                            ? "bg-danger"
                            : ""
                        }`}
              style={{ fontSize: "0.8rem", width: "80px" }}
            >
              {orderStatus.status}
            </button>
          </span>
        </div>
        <DataRow label="Time" value={renderValue(orderStatus.time)} />
        <DataRow
          label="Order Cancelled"
          value={renderValue(orderStatus.orderCancelled)}
        />
      </div>

      {/* Partner Response & Status */}
      <div className="col-6 border rounded mt-3 p-2">
        <div className="tabs-row">
          <h6 className="text-custom-primary fw-medium pt-2">
            Service Level Agreement (SLA)
          </h6>
        </div>
        <DataRow
          label="Has Set Preparation Time"
          value={renderValue(serviceLevel.preparationTime)}
        />
        <DataRow
          label="Total Time"
          value={renderValue(serviceLevel.totalTime)}
        />

        <DataRow label="SLA Breach" value={renderValue(serviceLevel.breach)} />
        <DataRow label="SLA Time" value={renderValue(serviceLevel.time)} />
        <DataRow label="Time Left" value={renderValue(serviceLevel.timeLeft)} />
      </div>

      {/* SLA Monitoring */}
      <div className="col-6 border rounded my-3 p-2">
        <div className="tabs-row">
          <h6 className="text-custom-primary fw-medium pt-2">Call Attempts</h6>
        </div>
        <DataRow
          label="Call Response1"
          value={renderValue(callAttempts.response1)}
        />
        <DataRow
          label="Call Response2"
          value={renderValue(callAttempts.response2)}
        />
      </div>
    </>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="mb-0 pe-1">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default Incoming;
