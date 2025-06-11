import { useState } from "react";
import { Icons } from "../../assets";

const AddOnSelector = ({ title, options, max, min }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-3 mb-3 w-full rounded border-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <h5 className="m-0 font-semibold text-base text-[#000145]">
            {title} <span className="text-green-600">({options.length})</span>
          </h5>
        </div>
        <button
          className="p-0 bg-transparent text-inherit"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <Icons.RightArrow/>
          ) : (
            <Icons.DownArrow/>
          )}
        </button>
      </div>

      {/* Body */}
      {isOpen && (
        <div>
          {/* Max/Min Labels */}
          <div className="mb-2 mt-3 text-red-600 flex items-center gap-2">
            <p className="bg-[#fd631f1a] rounded py-2 px-3 text-sm">
              Max: {max}
            </p>
            <p className="bg-[#fd631f1a] rounded py-2 px-3 text-sm">
              Min: {min}
            </p>
          </div>

          {/* Options */}
          <div className="flex overflow-x-auto">
            {options.map((option) => (
              <div
                key={option.name}
                className="border-r px-4 py-3 min-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <p className="m-0 text-[#3C3A45]">{option.name}</p>
                  <Icons.Veg />
                </div>
                <div className="text-black font-semibold">
                  Price: ₹{option.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOnSelector;
