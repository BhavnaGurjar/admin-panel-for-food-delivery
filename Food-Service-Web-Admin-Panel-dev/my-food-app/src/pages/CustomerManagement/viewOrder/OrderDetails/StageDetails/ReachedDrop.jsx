import { useState } from "react";
import {
  otpDetails,
  orderFinalization,
  slaCompliance,
  otpVerification2,
  locationTracking,
} from "../../constants";

const ReachedDrop = () => {
  const [otpButton, setOtpButton] = useState(false);

  const handleOtpButton = () => setOtpButton(!otpButton);

  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="mx-2">
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3 p-2">
        <div className="tabs-row">
          <h6 className=" font-medium  pb-1">
            Arrival & Location Tracking
          </h6>
        </div>
        <DataRow
          label="Reached Drop?"
          value={renderValue(locationTracking.reachedDrop)}
        />
        <DataRow
          label="Live Location of Delivery Partner"
          value={renderValue(locationTracking.liveLocation)}
        />
      </div>

      <div className="flex lg:flex-row md:flex-col items-start w-full gap-2 mt-3">
        {/* OTP Verification & Regeneration section */}
        <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md p-2">
          <div className="tabs-row">
            <h6 className=" font-medium  pb-1">
              OTP Verification & Regeneration
            </h6>
          </div>
          <DataRow
            label="OTP Generated ?"
            value={renderValue(otpVerification2.otpGenerated)}
          />
          <DataRow label="OTP" value={renderValue(otpVerification2.otp)} />
          <DataRow
            label="OTP Verified?"
            value={renderValue(otpVerification2.otpVerified)}
          />
          <DataRow
            label="OTP Regenerated?"
            value={renderValue(otpVerification2.otpRegenerated)}
          />
          <DataRow
            label="OTP Regenerated Counts"
            value={renderValue(otpVerification2.otpRegeneratedCounts)}
          />
          <button
  onClick={handleOtpButton}
  className={`rounded-md font-medium px-2 py-2 text-xs mt-2 border-[0.063rem] transition-colors duration-300
    ${otpButton
      ? "bg-[rgba(3,188,68,1)] text-white border-[rgba(3,188,68,1)]"
      : "bg-[rgba(3,188,68,0.1)] text-[rgba(3,188,68,1)] border-[rgba(3,188,68,1)] hover:bg-[rgba(3,188,68,1)] hover:text-white"
    }
  `}
>
  {otpButton ? "Hide All OTP" : "View All OTP"}
</button>

        {/* OTP Table appearing right side */}
        <div className="lg:hidden md:block mt-2">
          {otpButton && <OTPTable attempts={otpDetails.otpAttempts} />}
        </div>
        </div>

        {/* OTP Table appearing right side */}
        <div className="lg:w-6/12 w-9/12 lg:block md:hidden">
          {otpButton && <OTPTable attempts={otpDetails.otpAttempts} />}
        </div>
      </div>

      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3 p-2">
        <div className="tabs-row">
          <h6 className=" font-medium  pb-1">
            SLA Compliance & Customer Support
          </h6>
        </div>
        <DataRow
          label="Within SLA?"
          value={renderValue(slaCompliance.withinSLA)}
        />
        <DataRow
          label="SLA Timer"
          value={renderValue(slaCompliance.slaTimer)}
        />
        <DataRow
          label="SLA Breach?"
          value={renderValue(slaCompliance.slaBreach)}
        />
        <DataRow
          label="Call Response?"
          value={renderValue(slaCompliance.callResponse)}
        />
      </div>

      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md my-3 p-2">
        <div className="tabs-row">
          <h6 className=" font-medium  pb-1">
            Complaint Handling & Order Finalization
          </h6>
        </div>
        <DataRow
          label="Complaint Ticket Raised & Time"
          value={renderValue(orderFinalization.complaintTicketRaised)}
        />
        <DataRow
          label="Complaint Ticket Status"
          value={renderValue(orderFinalization.complaintTicketStatus)}
        />
        <DataRow
          label="Order Cancelled?"
          value={renderValue(orderFinalization.orderCancelled)}
        />
        <DataRow
          label="Order Delivered?"
          value={renderValue(orderFinalization.orderDelivered)}
        />
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

const OTPTable = ({ attempts }) => (
  <div className="border border-black-10 rounded-md overflow-auto">
    <table className="min-w-full text-sm">
      <thead className="text-center border-b border-black-10">
        <tr>
          <th className="font-medium px-3 py-2.5">Attempt</th>
          <th className="font-medium px-3 py-2.5">OTP Generation Time</th>
          <th className="font-medium px-3 py-2.5">OTP</th>
          <th className="font-medium px-3 py-2.5">Verified</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {attempts.map((a, idx) => (
          <tr key={idx} className="border-b border-black-10">
            <td className="px-3 py-2.5">{a.attempt}</td>
            <td className="px-3 py-2.5">{a.time}</td>
            <td className="px-3 py-2.5">{a.otp}</td>
            <td className="px-3 py-2.5">{a.verified}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReachedDrop;
