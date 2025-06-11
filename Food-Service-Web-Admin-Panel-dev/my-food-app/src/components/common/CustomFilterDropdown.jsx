import { useState, useRef, useEffect } from "react";
import { Icons } from "../../assets";

const CustomFilterDropdown = ({
  filterOptions,
  value,
  handleOnChange,
  selectedCount = 0, // 🔸 Accept count as prop
  icon = <Icons.Filter />,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
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

  const handleSelect = (label) => {
    if (selectedLabel === label) {
      setSelectedLabel(null);
      handleOnChange(null);
    } else {
      setSelectedLabel(label);
      handleOnChange(label);
    }
  };

  const handleClear = () => {
    setSelectedLabel(null);
    handleOnChange(null);
    setIsOpen(false);
  };

  return (
    <div className="inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[0.9rem] justify-between gap-2 px-4 py-2 border border-black-20 rounded-lg bg-transparent font-medium transition"
      >
        {icon}
        <span>
          Filter {selectedLabel ? <span>({selectedCount})</span> : null}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded">
          {filterOptions.map((option, index) => {
            const plainLabel = option.label.replace(/\s?\(\d+\)/, "");
            return (
              <div
                key={index}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.label)}
              >
                <input
                  type="checkbox"
                  readOnly
                  className="cursor-pointer w-4 h-4 mr-2 accent-primary"
                  checked={selectedLabel === option.label}
                />
                <label className="text-sm">{plainLabel}</label>
              </div>
            );
          })}

          {selectedLabel && (
            <div
              className="text-primary text-sm font-medium px-3 py-2 cursor-pointer border-t border-primary"
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
