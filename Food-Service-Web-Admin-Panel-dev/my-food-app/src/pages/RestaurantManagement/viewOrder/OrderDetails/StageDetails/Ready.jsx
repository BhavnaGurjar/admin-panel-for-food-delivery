import React, { useState } from "react";
import {
  orderReadiness,
  deliveryPartnerArrival,
  otpProcess,
  slaCompliance2,
  orderStatus3,
  otpDetails,
} from "../../constants";

const Ready = () => {
  const [otpButton, setOtpButton] = useState(false);

  const handleOtpButton = () => setOtpButton(!otpButton);

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
              Order Readiness
            </h6>
          </div>
          <DataRow
            label="Time When Marked Ready"
            value={renderValue(orderReadiness.markedReady)}
          />
          <DataRow
            label="Restaurant Partner Delayed"
            value={renderValue(orderReadiness.resDelayed)}
          />
        </div>
      </div>

      {/* Communication & Response */}
      <div className="col-6 border rounded mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              Delivery Partner Arrival
            </h6>
          </div>
          <DataRow
            label="Delivery Partner Arrived"
            value={renderValue(deliveryPartnerArrival.arrival)}
          />
          <DataRow
            label="Delivery Partner Delayed"
            value={renderValue(deliveryPartnerArrival.delayed)}
          />
        </div>
      </div>

      {/* Order Cancellation */}
      <div className="flex align-items-start gap-3 mt-3">
        <div className="col-6 border rounded">
          <div className="p-2">
            <div className="tabs-row">
              <h6 className="text-custom-primary fw-medium pt-2">
                OTP Verification Process
              </h6>
            </div>
            <DataRow
              label="OTP Generated At"
              value={renderValue(otpProcess.generated)}
            />
            <DataRow label="OTP Time" value={renderValue(otpProcess.time)} />
            <DataRow label="OTP" value={renderValue(otpProcess.otp)} />
            <DataRow
              label="OTP Verified"
              value={renderValue(otpProcess.verified)}
            />
            <DataRow
              label="OTP Verified Time"
              value={renderValue(otpProcess.verifiedTime)}
            />
            <DataRow
              label="OTP Verified Delay"
              value={renderValue(otpProcess.verifiedDelay)}
            />
            <button
              onClick={handleOtpButton}
              className="rounded-pill p-2 text-white border-0 custom-bg-blue fw-medium fs-7 mt-2"
            >
              {otpButton ? "Hide All OTP" : "View All OTP"}
            </button>
          </div>
        </div>
        {/* OTP Table appearing right side */}
        {otpButton && <OTPTable attempts={otpDetails.otpAttempts} />}
      </div>
      <div className="col-6 border rounded mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">
              SLA Compliance
            </h6>
          </div>
          <DataRow
            label="SLA Breach"
            value={renderValue(slaCompliance2.breach)}
          />
          <DataRow label="SLA Time" value={renderValue(slaCompliance2.time)} />
        </div>
      </div>

      <div className="col-6 border rounded my-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-custom-primary fw-medium pt-2">Order Status</h6>
          </div>
          <DataRow
            label="Call Response"
            value={renderValue(orderStatus3.callResponse)}
          />
          <DataRow
            label="Order Cancelled"
            value={renderValue(orderStatus3.orderCancelled)}
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

export default Ready;
