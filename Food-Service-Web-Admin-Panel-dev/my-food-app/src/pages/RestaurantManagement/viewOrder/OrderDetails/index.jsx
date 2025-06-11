import { Icons } from "../../../../assets";
import StageDetails from "./StageDetails";
import BasicDetails from "./BasicDetails";
import { orderData } from "../constants/index";

const OrderDetails = () => {
  return (
    <>
      <div className="bg-white my-4 p-3 rounded-3 shadow-sm">
        <div className="flex justify-between align-items-start">
          <div className="text-custom-primary flex gap-1 mb-1 fs-5 items-center">
            <Icons.Id />
            {orderData.orderId}
          </div>
          <div className="flex flex-column text-end">
            <div className="flex items-center fs-7">
              <p className="p-0 mb-0 pe-1">Date :</p>
              <span className="p-0 mb-0 text-muted">{orderData.date}</span>
            </div>
            <div className="flex items-center fs-7">
              <p className="p-0 mb-0 pe-1">Time :</p>
              <span className="p-0 mb-0 text-muted">{orderData.time}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 flex-wrap">
          <div>
            <div className="flex items-center">
              <p className="p-0 mb-0 pe-1">Customer Name:</p>
              <span className="p-0 mb-0 fw-semibold">
                {orderData.customer.name}
              </span>
            </div>
            <div className="flex items-center pt-2">
              <p className="p-0 mb-0 pe-1">Customer Contact:</p>
              <span className="p-0 mb-0 fw-semibold">
                {orderData.customer.contact}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <p className="p-0 mb-0 pe-1">Restaurant Name:</p>
              <span className="p-0 mb-0 fw-semibold">
                {orderData.restaurant.name}
              </span>
            </div>
            <div className="flex items-center pt-2">
              <p className="p-0 mb-0 pe-1">Restaurant Contact:</p>
              <span className="p-0 mb-0 fw-semibold">
                {orderData.restaurant.contact}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white my-4 p-3 rounded-3 shadow-sm">
          <BasicDetails />
        </div>
        <div className="bg-white my-4 p-3 rounded-3 shadow-sm">
          <div className="py-1">
            <h3 className="text-blue">Stage</h3>
          </div>
          <StageDetails />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
