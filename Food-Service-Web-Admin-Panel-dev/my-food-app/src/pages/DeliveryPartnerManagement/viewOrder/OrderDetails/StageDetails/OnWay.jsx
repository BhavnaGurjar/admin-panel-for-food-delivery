import {
  orderAcceptanceData,
  communicationResponseData,
  pickupDetailsData,
  orderCancellationData,
} from "../../constants/index";
import { SectionRow, SectionCard } from "../../Section";

const OnWay = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="flex">
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        <SectionCard title="Order Acceptance & Movement">
          <SectionRow
            label="Accepted & On the Way?"
            value={renderValue(orderAcceptanceData.acceptedOnTheWay)}
          />
          <SectionRow
            label="Within SLA?"
            value={renderValue(orderAcceptanceData.withinSLA)}
          />
          <SectionRow
            label="SLA Breach?"
            value={renderValue(orderAcceptanceData.slaBreach)}
          />
          <SectionRow
            label="Timestamp Status"
            value={renderValue(orderAcceptanceData.timestampStatus)}
          />
        </SectionCard>

        <SectionCard title="Communication & Response">
          <SectionRow
            label="Call Response?"
            value={renderValue(communicationResponseData.callResponse)}
          />
        </SectionCard>

        <SectionCard title="Pickup Details">
          <SectionRow
            label="Reached Pickup Time"
            value={renderValue(pickupDetailsData.reachedPickupTime)}
          />
          <SectionRow
            label="Location When Reached Pickup"
            value={renderValue(pickupDetailsData.locationWhenReachedPickup)}
          />
        </SectionCard>

        <SectionCard title="Order Cancellation">
          <SectionRow
            label="Order Cancelled?"
            value={renderValue(orderCancellationData.orderCancelled)}
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default OnWay;
