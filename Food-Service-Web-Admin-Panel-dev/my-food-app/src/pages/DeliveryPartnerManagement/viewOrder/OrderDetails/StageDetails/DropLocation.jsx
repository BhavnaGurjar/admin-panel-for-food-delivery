import { useState } from "react";
import {
  journeyDetails,
  dropVerification,
  returnFlow,
  otpDetails,
} from "../../constants/index";
import { SectionCard, SectionRow } from "../../Section";

const DropLocation = () => {
  const [dropLocationActiveTab, setDropLocationActiveTab] = useState(
    "deliveryPartnerJourney"
  );
  const [otpButton, setOtpButton] = useState(false);
  const [secondOtpButton, setSecondOtpButton] = useState(false);

  const handleOtpButton = () => setOtpButton(!otpButton);
  const handleSecondOtpButton = () => setSecondOtpButton(!secondOtpButton);

  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="border border-black-20 rounded-lg p-4">
      {/* Tabs */}
      <div className="flex flex-row items-center gap-6 border-b border-b-black-20 mb-4">
        {[
          {
            key: "deliveryPartnerJourney",
            label: "Delivery Partner’s Journey",
          },
          {
            key: "dropLocation&OTPVerification",
            label: "Drop Location & OTP Verification",
          },
          {
            key: "returnFlow&OTPHandling",
            label: "Return Flow & OTP Handling",
          },
        ].map(({ key, label }) => (
          <h6
            key={key}
            onClick={() => setDropLocationActiveTab(key)}
            className={`pb-3 px-4 text-base font-medium cursor-pointer ${
              dropLocationActiveTab === key
                ? "text-blue border-b-2 border-blue"
                : "text-gray-500 hover:text-blue"
            }`}
          >
            {label}
          </h6>
        ))}
      </div>

      {/* Content */}
      <div className="px-2">
        {/* Delivery Partner Journey */}
        {dropLocationActiveTab === "deliveryPartnerJourney" && (
          <>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="Order Pickup & Delivery Status">
                <SectionRow
                  label="Picked Up Order?"
                  value={renderValue(journeyDetails.orderPickupStatus)}
                />
                <SectionRow
                  label="Out for Delivery?"
                  value={renderValue(journeyDetails.outForDelivery)}
                />
                <SectionRow
                  label="Drop Distance"
                  value={renderValue(journeyDetails.dropDistance)}
                />
                <SectionRow
                  label="On the Way?"
                  value={renderValue(journeyDetails.onTheWay)}
                />
              </SectionCard>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              <SectionCard title="Delivery Partner Monitoring">
                <SectionRow
                  label="Timestamp"
                  value={renderValue(journeyDetails.timestamp)}
                />
                <SectionRow
                  label="Unresponsive?"
                  value={renderValue(journeyDetails.unresponsive)}
                />
                <SectionRow
                  label="Order Cancelled?"
                  value={renderValue(journeyDetails.orderCancelled)}
                />
              </SectionCard>
            </div>
          </>
        )}

        {/* Drop Location & OTP Verification */}
        {dropLocationActiveTab === "dropLocation&OTPVerification" && (
          <>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="Reaching Drop Location & Live Tracking">
                <SectionRow
                  label="Reached Drop?"
                  value={renderValue(dropVerification.reachedDrop)}
                />
                <SectionRow
                  label="Delivery Partner Location"
                  value={renderValue(dropVerification.deliveryPartnerLocation)}
                />
              </SectionCard>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="OTP Verification & SLA Tracking">
                <SectionRow
                  label="OTP Generated?"
                  value={renderValue(dropVerification.otpGenerated)}
                />
                <SectionRow
                  label="OTP"
                  value={renderValue(dropVerification.otp)}
                />
                <SectionRow
                  label="SLA Timer"
                  value={renderValue(dropVerification.slaTimer)}
                />
                <SectionRow
                  label="Within SLA?"
                  value={renderValue(dropVerification.withinSla)}
                />
                <SectionRow
                  label="SLA Breach?"
                  value={renderValue(dropVerification.slaBreach)}
                />
                <SectionRow
                  label="Call Response?"
                  value={renderValue(dropVerification.callResponse)}
                />
                <SectionRow
                  label="OTP Verified & Time"
                  value={renderValue(dropVerification.otpVerifiedTime)}
                />
                <SectionRow
                  label="OTP Regenerated?"
                  value={renderValue(dropVerification.otpRegenerated)}
                />
                <SectionRow
                  label="OTP Regenerated Count"
                  value={renderValue(dropVerification.otpRegeneratedCount)}
                />
                <button
                  onClick={handleOtpButton}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                >
                  {otpButton ? "Hide All OTP" : "View All OTP"}
                </button>
              </SectionCard>
            </div>

            {otpButton && (
              <div className="mt-4">
                <SectionCard title="OTP Attempts Table">
                  <OTPTable attempts={otpDetails.otpAttempts} />
                </SectionCard>
              </div>
            )}
          </>
        )}

        {/* Return Flow & OTP Handling */}
        {dropLocationActiveTab === "returnFlow&OTPHandling" && (
          <>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="Support Ticket & Return Initiation">
                <SectionRow
                  label="Ticket Raised?"
                  value={renderValue(returnFlow.ticketRaised)}
                />
                <SectionRow
                  label="Ticket Status"
                  value={renderValue(returnFlow.ticketStatus)}
                />
                <SectionRow
                  label="Back to Restaurant?"
                  value={renderValue(returnFlow.backToRestaurant)}
                />
              </SectionCard>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="Reaching Return Location & Live Tracking">
                <SectionRow
                  label="Reached Return?"
                  value={renderValue(returnFlow.reachedReturn)}
                />
                <SectionRow
                  label="Delivery Partner Live Location"
                  value={renderValue(returnFlow.partnerLocation)}
                />
              </SectionCard>
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
              <SectionCard title="Return OTP Verification & SLA Tracking">
                <SectionRow
                  label="OTP Generated?"
                  value={renderValue(returnFlow.otpGenerated)}
                />
                <SectionRow
                  label="Return OTP"
                  value={renderValue(returnFlow.returnOtp)}
                />
                <SectionRow
                  label="SLA Timer"
                  value={renderValue(returnFlow.slaTimer)}
                />
                <SectionRow
                  label="Within SLA?"
                  value={renderValue(returnFlow.withinSla)}
                />
                <SectionRow
                  label="SLA Breach?"
                  value={renderValue(returnFlow.slaBreach)}
                />
                <SectionRow
                  label="Call Response?"
                  value={renderValue(returnFlow.callResponse)}
                />
                <SectionRow
                  label="Return OTP Verified & Time"
                  value={renderValue(returnFlow.returnOtpVerifiedTime)}
                />
                <SectionRow
                  label="Return OTP Regenerated?"
                  value={renderValue(returnFlow.returnOtpRegenerated)}
                />
                <SectionRow
                  label="Return OTP Regenerated Count"
                  value={renderValue(returnFlow.returnOtpRegeneratedCount)}
                />
                <SectionRow
                  label="Order Returned?"
                  value={renderValue(returnFlow.orderReturned)}
                />
                <button
                  onClick={handleSecondOtpButton}
                  className="mt-3 px-4 py-2 bg-blue text-white text-sm rounded-full hover:bg-blue transition"
                >
                  {secondOtpButton ? "Hide All OTP" : "View All OTP"}
                </button>
              </SectionCard>
            </div>
            {secondOtpButton && (
              <div className="mt-4">
                <SectionCard title="Return OTP Attempts Table">
                  <OTPTable attempts={otpDetails.otpAttempts} />
                </SectionCard>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// OTP Table Component
const OTPTable = ({ attempts }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-center border border-black-20">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 font-medium text-gray-700 border">
            Attempt
          </th>
          <th className="px-4 py-2 font-medium text-gray-700 border">
            OTP Generation Time
          </th>
          <th className="px-4 py-2 font-medium text-gray-700 border">OTP</th>
          <th className="px-4 py-2 font-medium text-gray-700 border">
            Verified
          </th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((a, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-4 py-2 border">{a.attempt}</td>
            <td className="px-4 py-2 border">{a.time}</td>
            <td className="px-4 py-2 border">{a.otp}</td>
            <td className="px-4 py-2 border">{a.verified}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DropLocation;
