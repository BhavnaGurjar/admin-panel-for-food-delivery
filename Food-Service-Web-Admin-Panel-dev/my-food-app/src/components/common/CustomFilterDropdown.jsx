import { useState, useRef, useEffect } from "react";
import { Icons } from "../../assets";

const CustomFilterDropdown = ({
  filterOptions,
  value = [],
  handleOnChange,
  selectedCount = null,
  icon = <Icons.Filter />,
  labelText = "Filter",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (status) => {
    let newValue = value.includes(status)
      ? value.filter((v) => v !== status)
      : [...value, status];

    handleOnChange(newValue.length > 0 ? newValue : []);
  };

  const handleClear = () => {
    handleOnChange([]);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 border border-black-10 rounded-lg bg-white font-medium text-sm text-black hover:bg-black-20 focus:outline-none transition"
      >
        {icon}
        <span>
          Filter {selectedCount ? <span>({selectedCount})</span> : null}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-md rounded">
          {filterOptions.map((option, index) => {
            const plainLabel = option.label.replace(/\s?\(\d+\)/, "");
            const statusValue = option.value;
            return (
              <div
                key={index}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleToggle(statusValue)}
              >
                <input
                  type="checkbox"
                  readOnly
                  className="cursor-pointer w-4 h-4 mr-2 accent-primary"
                  checked={value.includes(statusValue)}
                />
                <label className="text-sm text-gray-800">{plainLabel}</label>
              </div>
            );
          })}

          {value.length > 0 && (
            <div
              className="text-primary text-sm font-medium px-4 py-2 border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition"
              onClick={handleClear}
            >
              Clear
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default CustomFilterDropdown;
