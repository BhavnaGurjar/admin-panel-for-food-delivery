import { orderData } from "../constants/index";
import { Icons } from "../../../../assets";
import StageDetails from "./StageDetails";
import BasicDetails from "./BasicDetails";

const OrderDetails = () => {
  return (
    <>
      <div className="bg-white my-4 p-4 rounded-lg shadow-sm">
        <div className="flex flex-col items-start">
          <div className="flex gap-2 mb-2 text-primary text-lg items-center font-medium">
            <Icons.Id />
            {orderData.orderId}
          </div>
          <div className="flex flex-col text-right text-sm text-gray-600">
            {orderData.date}:{orderData.time}
          </div>
        </div>

        <div className="flex gap-14 flex-wrap mt-4 text-sm text-gray-700">
          <div>
            <div className="flex items-center">
              <p className="m-0 pr-1 font-medium text-scorpion">
                Customer Name:
              </p>
              <span className="text-kilamanjaro">
                {orderData.customer.name}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <p className="m-0 pr-1 font-medium text-scorpion">
                Customer Contact:
              </p>
              <span className="text-kilamanjaro">
                {orderData.customer.contact}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <p className="m-0 pr-1 font-medium text-scorpion">
                Restaurant Name:
              </p>
              <span className="text-kilamanjaro">
                {orderData.restaurant.name}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <p className="m-0 pr-1 font-medium text-scorpion">
                Restaurant Contact:
              </p>
              <span className="text-kilamanjaro">
                {orderData.restaurant.contact}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white my-4 p-4 rounded-lg shadow-sm">
          <BasicDetails />
        </div>
        <div className="bg-white my-4 p-4 rounded-lg shadow-sm">
          <div className="py-1 border-b border-black-20 pb-5">
            <h3 className="text-blue font-bold text-2xl">Stage Details</h3>
          </div>
          <StageDetails />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
