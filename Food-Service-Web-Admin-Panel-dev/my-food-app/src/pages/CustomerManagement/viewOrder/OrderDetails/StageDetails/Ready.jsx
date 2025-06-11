import {
  slaOrderCancellationData,
  orderReadiness,
  otpVerification,
} from "../../constants";

const Ready = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="mx-2">
      {/* Order Acceptance & Movement */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className=" font-medium">
              Order Readiness & OTP Generation
            </h6>
          </div>
          <DataRow
            label="Order Ready?"
            value={renderValue(orderReadiness.orderReady)}
          />
          <DataRow
            label="OTP Generated & Time"
            value={renderValue(orderReadiness.otpGeneratedTime)}
          />
        </div>
      </div>

      {/* Communication & Response */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className=" font-medium">
              OTP Verification & Regeneration
            </h6>
          </div>
          <DataRow
            label="OTP Verified?"
            value={renderValue(otpVerification.otpVerified)}
          />
          <DataRow
            label="OTP Verified & Time"
            value={renderValue(otpVerification.otpVerifiedTime)}
          />
          <DataRow
            label="OTP Regenerated?"
            value={renderValue(otpVerification.otpRegenerated)}
          />
          <DataRow
            label="OTP Regenerated Counts"
            value={renderValue(otpVerification.otpRegeneratedCounts)}
          />
        </div>
      </div>

      {/* Order Cancellation */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md my-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className=" font-medium">
              SLA & Order Cancellation
            </h6>
          </div>
          <DataRow
            label="SLA Breach?"
            value={renderValue(slaOrderCancellationData.slaBreach)}
          />
          <DataRow
            label="Order Cancelled?"
            value={renderValue(slaOrderCancellationData.orderCancelled)}
          />
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

export default Ready;
