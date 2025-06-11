import { images } from "../../assets";
const ItemCard = ({ handleOnClick, status }) => {
  return (
    <div className="relative bg-white p-3 rounded border shadow-sm ">
      {/* Image */}
      <img
        src={images.itemDemo}
        alt="Item"
        className="h-[170px] w-full object-cover rounded"
      />

      {/* Status Badge */}
      <div
        className={`absolute top-4 right-4 text-xs rounded-full px-2 py-1 shadow ${
          status === "Approved"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status === "Approved" ? "Approved" : "Pending"}
      </div>

      {/* Title & Category */}
      <div className="pt-2 flex items-center justify-between">
        <h3 className="text-base font-medium m-0">Cheese Pizza</h3>
      </div>
      <p className="text-sm text-gray-500 m-0">Pizza &gt; Pizza</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-2">
        {["Noodles", "Pasta", "Veg"].map((item) => (
          <span
            key={item}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 m-0">
        A creamy and rich Indian curry made with soft paneer cubes
      </p>

      {/* Footer: Price + Button */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-[#000145] font-semibold m-0">₹90.00</p>
        <button
          onClick={handleOnClick}
          className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-[#00012e]"
        >
          View Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
