import { Icons } from "../../../../assets";
import StageDetails from "./StageDetails";
import BasicDetails from "./BasicDetails";
import { orderData } from "../constants";

const OrderDetails = () => {
  return (
    <>
      {/* Order Header Card */}
      <div className="bg-white my-4 p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-start">
          {/* Order ID */}
          <div className="text-blue-600 flex items-center text-primary text-lg font-medium">
            <Icons.Id />
            {orderData.orderId}
          </div>

          {/* Date & Time */}
          <div className="flex flex-col text-[0.813rem] text-right ">
            <div className="flex items-center">
              <p className="pe-2">Date:</p>
              <span className="text-[rgba(95,94,94,1)]">{orderData.date}</span>
            </div>
            <div className="flex items-center">
              <p className="pe-2">Time:</p>
              <span className="text-[rgba(95,94,94,1)]">{orderData.time}</span>
            </div>
          </div>
        </div>

        {/* Customer & Restaurant Info */}
        <div className="flex flex-wrap gap-10">
          {/* Customer Info */}
          <div>
            <div className="flex items-center">
              <p className="pe-2 text-[rgba(95,94,94,1)] text-[0.938rem]">Customer Name:</p>
              <span className="font-medium text-[0.938rem]">{orderData.customer.name}</span>
            </div>
            <div className="flex items-center pt-2">
              <p className="pe-2 text-[rgba(95,94,94,1)] text-[0.938rem]">Customer Contact:</p>
              <span className="font-medium text-[0.938rem]">{orderData.customer.contact}</span>
            </div>
          </div>

          {/* Restaurant Info */}
          <div>
            <div className="flex items-center">
              <p className="pe-2 text-[rgba(95,94,94,1)] text-[0.938rem]">Restaurant Name:</p>
              <span className="font-medium text-[0.938rem]">{orderData.restaurant.name}</span>
            </div>
            <div className="flex items-center pt-2">
              <p className="pe-2 text-[rgba(95,94,94,1)] text-[0.938rem]">Restaurant Contact:</p>
              <span className="font-medium text-[0.938rem]">{orderData.restaurant.contact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Basic and Stage Details */}
      <div>
        {/* Basic Details Card */}
        <div className="bg-white my-4 p-4 rounded-xl shadow-sm">
          <BasicDetails />
        </div>

        {/* Stage Details Card */}
        <div className="bg-white my-4 p-4 rounded-xl shadow-sm">
          <div className="py-2">
            <h3 className="text-[rgba(0,1,69,1)] font-semibold text-2xl font-satoshi">Stage Details</h3>
          </div>
          <StageDetails />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
