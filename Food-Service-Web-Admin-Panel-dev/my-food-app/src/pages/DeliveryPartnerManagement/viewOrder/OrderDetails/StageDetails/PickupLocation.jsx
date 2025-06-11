import { useState } from "react";
import {
  deliveryPartnerData,
  otpVerificationData,
  slaTrackingData,
  otpDetails,
} from "../../constants/index";
import { SectionRow, SectionCard } from "../../Section";

const PickupLocation = () => {
  const [otpButton, setOtpButton] = useState(false);

  const handleOtpButtonClick = () => {
    setOtpButton(!otpButton);
  };

  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Delivery Partner & Restaurant Readiness */}
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        <SectionCard title="Delivery Partner & Restaurant Readiness">
          <SectionRow
            label="Reached Pickup?"
            value={renderValue(deliveryPartnerData.reachedPickup)}
          />
          <SectionRow
            label="Delivery Partner Delayed?"
            value={renderValue(deliveryPartnerData.deliveryPartnerDelayed)}
          />
          <SectionRow
            label="Restaurant Partner Marked Ready?"
            value={renderValue(
              deliveryPartnerData.restaurantPartnerMarkedReady
            )}
          />
          <SectionRow
            label="Restaurant Partner Delayed?"
            value={renderValue(deliveryPartnerData.restaurantPartnerDelayed)}
          />
        </SectionCard>
      </div>
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        {/* OTP Verification & Security */}
        <SectionCard title="OTP Verification & Security">
          <SectionRow
            label="OTP Generated & Time"
            value={renderValue(otpVerificationData.otpGeneratedTime)}
          />
          <SectionRow
            label="OTP"
            value={renderValue(otpVerificationData.otp)}
          />
          <SectionRow
            label="OTP Verified?"
            value={renderValue(otpVerificationData.otpVerified)}
          />
          <SectionRow
            label="OTP Verified & Time"
            value={renderValue(otpVerificationData.otpVerifiedTime)}
          />
          <SectionRow
            label="OTP Regenerated Counts"
            value={renderValue(otpVerificationData.otpRegeneratedCounts)}
          />

          <div className="pt-2">
            <button
              onClick={handleOtpButtonClick}
              className="rounded-md px-3 py-1 text-white bg-blue hover:bg-blue text-sm font-medium"
            >
              {otpButton ? "Hide All OTP" : "View All OTP"}
            </button>
          </div>

          {otpButton && <OTPTable attempts={otpDetails.otpAttempts} />}
        </SectionCard>
      </div>
      {/* SLA Tracking & Order Status */}
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        <SectionCard title="SLA Tracking & Order Status">
          <SectionRow
            label="Within SLA?"
            value={renderValue(slaTrackingData.withinSLA)}
          />
          <SectionRow
            label="SLA Breach?"
            value={renderValue(slaTrackingData.slaBreach)}
          />
          <SectionRow
            label="SLA Timer"
            value={renderValue(slaTrackingData.slaTimer)}
          />
          <SectionRow
            label="Call Response?"
            value={renderValue(slaTrackingData.callResponse)}
          />
          <SectionRow
            label="Order Cancelled?"
            value={renderValue(slaTrackingData.orderCancelled)}
          />
        </SectionCard>
      </div>
    </div>
  );
};

const OTPTable = ({ attempts }) => (
  <div className="mt-4 border border-black-20 rounded-md overflow-hidden">
    <table className="w-full text-sm text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 font-medium">Attempt</th>
          <th className="p-2 font-medium">OTP Generation Time</th>
          <th className="p-2 font-medium">OTP</th>
          <th className="p-2 font-medium">Verified</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((a, idx) => (
          <tr key={idx} className="border-t">
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

export default PickupLocation;
