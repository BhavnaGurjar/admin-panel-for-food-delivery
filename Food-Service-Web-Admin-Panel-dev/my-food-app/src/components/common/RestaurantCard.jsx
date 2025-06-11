import { TbPointFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {Icons} from "../../assets";

const RestaurantCard = ({
  id,
  image,
  name,
  isVeg,
  categories,
  subCategories,
  items,
  lastUpdate,
  lastUpdatedAt,
  pendingApprovals,
  changesRequested,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="border p-3 rounded-xl bg-white mt-3 cursor-pointer transition duration-500 hover:shadow-md font-satoshi"
      onClick={() => navigate("/restaurant-management/menu/restaurant-view")}
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Rest. Id: <span className="font-medium text-black">{id}</span>
        </span>
        <span
          className="bg-success bg-opacity-10 text-success font-medium rounded-full py-1 px-2 flex items-center gap-1 justify-center"
        >
          <Icons.Checked /> Approved
        </span>
      </div>
      
      <img
        src={image}
        alt={name}
        className="rounded mt-2 mb-2 w-full h-[180px] object-cover"
      />
      
      <div className="flex justify-between items-center">
        <h5 className="font-semibold">{name}</h5>
        <span className={`${isVeg ? "text-success" : "text-danger"}`}>
          {isVeg ? (
            <div className="flex items-center gap-1 font-semibold">
              <div className="border-2 border-success rounded">
                <Icons.Veg/>
              </div>
              Veg
            </div>
          ) : (
            <div className="flex items-center gap-1 font-semibold">
              <div className="border-2 border-danger rounded">
                <TbPointFilled size={16} />
              </div>
              Non Veg
            </div>
          )}
        </span>
      </div>
      
      <div className="flex gap-2 mt-2">
        {pendingApprovals > 0 && (
          <span className="text-secondary bg-secondary bg-opacity-10 rounded-full font-medium px-2 py-1 text-xs relative">
           <span className="flex items-center"> 
            <Icons.Clock/>
            Pending App
            </span>
            <span className="bg-danger text-white rounded-full font-semibold absolute -top-2 right-1 flex items-center justify-center h-4 w-4 text-[10px] border-2 border-white">
              {pendingApprovals}
            </span>
          </span>
        )}
        {changesRequested > 0 && (
          <span className="text-white bg-primary rounded-full font-medium px-2 py-1 text-xs relative">
            <span className="flex items-center"> 
            <Icons.Pen/>
            Changes Req.
            </span>
            <span className="bg-danger text-white rounded-full font-semibold absolute -top-2 right-1 flex items-center justify-center h-4 w-4 text-[10px] border-2 border-white">
              {changesRequested}
            </span>
          </span>
        )}
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="bg-gray-50 p-2 rounded flex-1 mx-1">
          <p className="text-secondary text-sm text-center">Category</p>
          <h6 className="font-bold text-center text-black">{categories}</h6>
        </div>
        <div className="bg-gray-50 p-2 rounded flex-1 mx-1">
          <p className="text-secondary text-sm text-center">Sub-Cate.</p>
          <h6 className="font-bold text-center text-black">{subCategories}</h6>
        </div>
        <div className="bg-gray-50 p-2 rounded flex-1 mx-1">
          <p className="text-secondary text-sm text-center">Total Item</p>
          <h6 className="font-bold text-center text-black">{items}</h6>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between gap-2">
        <div>
          <p className="text-sm m-0">Last Update</p>
          <p className="text-xs m-0 text-secondary">{lastUpdate}</p>
        </div>
        <div>
          <p className="text-sm m-0">Last Updated at</p>
          <p className="text-right text-xs m-0 text-secondary">{lastUpdatedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;