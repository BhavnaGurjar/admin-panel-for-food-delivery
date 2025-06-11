import { Icons } from "../../assets";

const capitalizeFirst = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const truncateText = (text, limit) => {
  if (!text) return "";
  const truncated = text.length > limit ? text.slice(0, limit) + "..." : text;
  return capitalizeFirst(truncated);
};

const ItemCard = ({
  handleOnClick,
  status,
  name,
  category,
  subCategory,
  description,
  type,
  image,
  itemTag = [],
  price = 0,
}) => {
  return (
    <div className="relative bg-white p-2 rounded border border-[rgba(0,0,0,0.04)] shadow-sm hover:shadow-md transition">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="h-[10.625rem] w-full object-cover rounded"
      />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex gap-1 items-center text-xs px-2 py-1 rounded-md shadow bg-[rgba(255,255,255,0.9)]">
        <span
          className={`rounded-full w-1.5 h-1.5 ${
            status === "APPROVED"
              ? "bg-success"
              : status === "REJECTED"
              ? "bg-danger"
              : "bg-warning"
          }`}
        />
        <span
          className={`${
            status === "APPROVED"
              ? "text-success"
              : status === "REJECTED"
              ? "text-danger"
              : "text-warning"
          }`}
        >
          {status === "APPROVED"
            ? "Approved"
            : status === "REJECTED"
            ? "Rejected"
            : "Pending"}
        </span>
      </div>

      {/* Title & Category */}
      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <h3 className="text-base font-medium">
            {truncateText(name, 11)}
          </h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium">{truncateText(category, 7)}</span>
            {subCategory && (
              <>
                {" "}
                &gt; {truncateText(subCategory, 4)}
              </>
            )}
          </p>
        </div>
        <span
          className={`text-[0.725rem] flex items-center gap-0.5 font-medium ${
            type === "VEG" ? "text-green-800" : "text-red-600"
          }`}
        >
          {type === "VEG" ? (
            <Icons.Veg />
          ) : (
            <Icons.Veg strokeColor="#F11F46" />
          )}
          {type === "VEG" ? "Veg" : "Non Veg"}
        </span>
      </div>

      {/* Tags */}
     {itemTag?.length > 0 && (
  <div className="flex flex-wrap gap-1 my-2">
    {[]
      .concat(...itemTag.map(tag => tag.split(",")))
      .map(t => t.trim()) // clean up whitespace
      .filter(t => t) // remove empty strings
      .slice(0, 2)
      .map((tag, index) => (
        <span
          key={index}
          className={`text-xs px-2 py-1 rounded-full ${
            tag === "No item tags selected"
              ? "bg-gray-100 text-gray-400 opacity-50"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {tag}
        </span>
      ))}

    {[]
      .concat(...itemTag.map(tag => tag.split(",")))
      .map(t => t.trim())
      .filter(t => t).length > 2 && (
        <span className="text-xs text-gray-600">...</span>
    )}
  </div>
)}


      {/* Description */}
      <p
        className="text-xs text-gray-500 overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          minHeight: "2rem",
        }}
      >
        {description}
      </p>

      {/* Price + Action */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-[#000145] font-semibold">Rs.{price}</p>
        <button
          onClick={handleOnClick}
          className="bg-[rgba(18,115,238,0.1)] border border-primary text-primary text-sm px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
        >
          View Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
