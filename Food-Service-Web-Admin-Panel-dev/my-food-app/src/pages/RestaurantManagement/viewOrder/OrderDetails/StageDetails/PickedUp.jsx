import React, { useState } from "react";
import {
  progress,
  ticket,
  finalstatus,
  otpDetails,
} from "../../constants/index"; // Adjust the import path as necessary

const PickedUp = () => {
  const [otpButton, setOtpButton] = useState(false);

  const handleOtpButtonClick = () => {
    setOtpButton(!otpButton);
  };

  const renderValue = (value) =>
    value ? (
      <span className="fw-semibold">{value}</span>
    ) : (
      <span className="text-muted">N/A</span>
    );

  return (
    <>
      {/* Delivery Partner & Restaurant Readiness */}
      <div className="col-6 border rounded mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              Pickup & Drop Progress
            </h6>
          </div>
          <DataRow
            label="Order Picked Up "
            value={renderValue(progress.pickUp)}
          />
          <DataRow
            label="Reached Drop"
            value={renderValue(progress.reachedDrop)}
          />
        </div>
      </div>
      <div className="flex align-items-start gap-3 mt-3">
        <div className="col-6 border rounded">
          <div className="p-2">
            <div className="tabs-row">
              <h6 className="text-custom-primary fw-medium pt-2">
                Ticket & OTP Verification
              </h6>
            </div>
            <DataRow label="Ticket Raised" value={renderValue(ticket.raised)} />
            <DataRow
              label="Drop OTP Verified"
              value={renderValue(ticket.drop)}
            />
            <button
              onClick={handleOtpButtonClick}
              className="rounded-pill p-2 text-white border-0 custom-bg-blue fw-medium fs-7 mt-2"
            >
              {otpButton ? "Hide All OTP" : "View All OTP"}
            </button>
          </div>
        </div>
        {/* OTP Table appearing right side */}
        {otpButton && <OTPTable attempts={otpDetails.otpAttempts} />}
      </div>
      <div className="col-6 border rounded my-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              Final Order Status
            </h6>
          </div>
          <DataRow
            label="Delivered"
            value={renderValue(finalstatus.delivered)}
          />
          <DataRow
            label="Order Cancelled"
            value={renderValue(finalstatus.orderCancel)}
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
const OTPTable = ({ attempts }) => (
  <div className="col-5 border rounded p-2">
    <table className="table mb-0 fs-7">
      <thead className="text-center">
        <tr>
          <th className="fw-medium">Attempt</th>
          <th className="fw-medium">OTP Generation Time</th>
          <th className="fw-medium">OTP</th>
          <th className="fw-medium">Verified</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {attempts.map((a, idx) => (
          <tr key={idx}>
            <td className="p-2">{a.attempt}</td>
            <td className="p-2">{a.time}</td>
            <td className="p-2">{a.otp}</td>
            <td className="p-2">{a.verified}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PickedUp;
