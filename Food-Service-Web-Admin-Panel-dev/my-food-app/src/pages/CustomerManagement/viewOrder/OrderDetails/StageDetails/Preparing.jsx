import {
  restaurantPreparation,
  orderCancellationData,
  deliveryPartnerAssignment,
} from "../../constants";

const Preparing = () => {
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
            <h6 className="text-primary font-medium  pb-1">
              Restaurant Preparation Status
            </h6>
          </div>
          <DataRow
            label="Accepted & Preparing?"
            value={renderValue(restaurantPreparation.acceptedPreparing)}
          />
          <DataRow
            label="Preparation Time"
            value={renderValue(restaurantPreparation.preparationTime)}
          />
          <DataRow
            label="Restaurant Partner Ready"
            value={renderValue(restaurantPreparation.restaurantPartnerReady)}
          />
          <DataRow
            label="Restaurant Partner Delayed?"
            value={renderValue(restaurantPreparation.restaurantPartnerDelayed)}
          />
        </div>
      </div>

      {/* Communication & Response */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mt-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-primary font-medium  pb-1">
              Delivery Partner Assignment & Status
            </h6>
          </div>
          <DataRow
            label="Delivery Partner Assigned?"
            value={renderValue(deliveryPartnerAssignment.dpAssignment)}
          />
          <DataRow
            label="Delivery Partner Type"
            value={renderValue(deliveryPartnerAssignment.dpType)}
          />
          <DataRow
            label="Delivery Partner ID"
            value={renderValue(deliveryPartnerAssignment.dpID)}
          />
          <DataRow
            label="Delivery Partner Contact"
            value={renderValue(deliveryPartnerAssignment.dpContact)}
          />
          <DataRow
            label="Delivery Partner Reached Pickup?"
            value={renderValue(deliveryPartnerAssignment.dpReachedPickup)}
          />
          <DataRow
            label="Delivery Partner Delayed?"
            value={renderValue(deliveryPartnerAssignment.dpDelayed)}
          />
          <DataRow
            label="Delivery Partner Live Location"
            value={renderValue(deliveryPartnerAssignment.dpLiveLocation)}
          />
          <DataRow
            label="Delivery Reassigned?"
            value={renderValue(deliveryPartnerAssignment.dpReassigned)}
          />
        </div>
      </div>

      {/* Order Cancellation */}
      <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md my-3">
        <div className="p-2">
          <div className="tabs-row">
            <h6 className="text-primary font-medium  pb-1">
              Order Cancellation
            </h6>
          </div>
          <DataRow
            label="Order Cancelled?"
            value={renderValue(orderCancellationData.orderCancelled)}
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

export default Preparing;
