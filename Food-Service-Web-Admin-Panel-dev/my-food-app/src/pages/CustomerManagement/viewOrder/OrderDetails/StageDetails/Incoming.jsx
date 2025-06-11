import {
  orderPlacement,
  cancellationWindow,
  slaTracking,
} from "../../constants";

const Incoming = () => {
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
          <h6 className="text-primary font-medium pb-1">
            Order Placement & Status Details
          </h6>
        </div>
        <DataRow
          label="Order Placed Status & Time"
          value={renderValue(orderPlacement.orderPlaced)}
        />
        <DataRow
          label="Order Status"
          value={renderValue(orderPlacement.orderStatus)}
        />
        <DataRow
          label="Order’s Action Time"
          value={renderValue(orderPlacement.actionTime)}
        />
      </div>

      {/* Partner Response & Status */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3 p-2">
        <div className="tabs-row">
          <h6 className="text-primary font-medium  pb-1">
            Cancellation Window & Timings
          </h6>
        </div>
        <DataRow
          label="In the Cancellation Window?"
          value={renderValue(cancellationWindow.cancellationWindow)}
        />
        <DataRow
          label="Awaiting Period"
          value={renderValue(cancellationWindow.awaitingPeriod)}
        />
        <DataRow
          label="Order Cancelled?"
          value={renderValue(cancellationWindow.orderCancelled)}
        />
      </div>

      {/* SLA Monitoring */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md my-3 p-2">
        <div className="tabs-row">
          <h6 className="text-primary font-medium  pb-1">
            Service Level Agreement (SLA) Tracking
          </h6>
        </div>
        <DataRow
          label="Within SLA?"
          value={renderValue(slaTracking.withinSLA)}
        />
        <DataRow
          label="SLA Breach?"
          value={renderValue(slaTracking.slaBreach)}
        />
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-1">
    <p className="mb-0 pr-1 text-[rgba(95,94,94,1)] text-[0.938rem]">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default Incoming;
