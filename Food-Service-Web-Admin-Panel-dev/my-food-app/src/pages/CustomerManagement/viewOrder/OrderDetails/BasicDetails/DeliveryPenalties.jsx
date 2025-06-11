import { refundDetails, couponsDetails } from "../../constants";

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="mb-0 mr-2 text-[rgba(95,94,94,1)] text-[0.938rem]">{label}:</p>
    <span>{value}</span>
  </div>
);

const DeliveryPenalties = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="w-full mt-3 px-2">
      <div className="flex flex-col lg:flex-row md:w-9/12 lg:w-full lg:gap-6 gap-4">
        {/* Refund Details */}
        <div className="flex-1 border border-black-10 rounded-md bg-white  p-3">
          <h6 className=" font-medium text-base pb-1 border-b border-black-10">
            Refund Details
          </h6>
          <DataRow
            label="Refund Applied"
            value={renderValue(refundDetails.refundApplied)}
          />
          <DataRow
            label="Refund Type"
            value={renderValue(refundDetails.refundType)}
          />
          <DataRow
            label="Refund%"
            value={renderValue(refundDetails.refundPer)}
          />
          <DataRow
            label="Refund Amount"
            value={renderValue(refundDetails.refundAmount)}
          />
          <DataRow
            label="Refund Status"
            value={renderValue(refundDetails.refundStatus)}
          />
          <DataRow
            label="Refund Date"
            value={renderValue(refundDetails.refundDate)}
          />
        </div>

        {/* Coupons Details */}
        <div className="flex-1 border border-black-10 rounded-md bg-white  p-3">
          <h6 className=" font-medium text-base pb-1 border-b border-black-10">
            Coupons Details
          </h6>
          <DataRow
            label="Coupons Generated"
            value={renderValue(couponsDetails.couponsGenerated)}
          />
          <DataRow
            label="Coupons Type"
            value={renderValue(couponsDetails.couponsType)}
          />
          <DataRow
            label="Coupons Timeline"
            value={renderValue(couponsDetails.couponsTimeline)}
          />
          <DataRow
            label="Coupons Used"
            value={renderValue(couponsDetails.couponsUsed)}
          />
          <DataRow
            label="Coupons Usage"
            value={renderValue(couponsDetails.couponsUsage)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPenalties;
