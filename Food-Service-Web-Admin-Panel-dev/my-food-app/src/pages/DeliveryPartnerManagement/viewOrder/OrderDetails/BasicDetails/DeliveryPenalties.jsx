import { deliveryFeeDetails, penaltyDetails } from "../../constants/index";
import { SectionCard, SectionRow } from "../../Section";

const DeliveryPenalties = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="mt-4 px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Delivery Fee Details */}
        <SectionCard title="Delivery Fee Details">
          <SectionRow
            label="Delivery Fee"
            value={renderValue(deliveryFeeDetails.fee)}
          />
          <SectionRow
            label="Delivery Type"
            value={renderValue(deliveryFeeDetails.type)}
          />
          <SectionRow
            label="Delivery Tip"
            value={renderValue(deliveryFeeDetails.tip)}
          />
          <SectionRow
            label="Payable Delivery Fee"
            value={renderValue(deliveryFeeDetails.payableFee)}
          />
          <SectionRow
            label="Fee Paid & Time"
            value={renderValue(
              `${deliveryFeeDetails.paidStatus} - ${deliveryFeeDetails.paidTime} / ${deliveryFeeDetails.paidDate}`
            )}
          />
        </SectionCard>

        {/* Penalty Details */}
        <SectionCard title="Penalty Details">
          <SectionRow
            label="Penalties Applied?"
            value={renderValue(penaltyDetails.applied)}
          />
          <SectionRow
            label="Penalty Type"
            value={renderValue(penaltyDetails.type)}
          />
          <SectionRow
            label="Penalty Amount"
            value={renderValue(penaltyDetails.amount)}
          />
          <SectionRow
            label="Penalty Deducted?"
            value={renderValue(penaltyDetails.deducted)}
          />
          <SectionRow
            label="Penalty Deducted Date"
            value={renderValue(penaltyDetails.deductedDate)}
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default DeliveryPenalties;
