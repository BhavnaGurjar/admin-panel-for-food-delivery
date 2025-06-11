import { useEffect, useRef, useState } from "react";

const CityDropdown = ({ selectedCity, onSelect }) => {
  const [showCityPicker, setShowCityPicker] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCityPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowCityPicker(!showCityPicker)}
        className="bg-white hover:bg-black-10 text-black border border-black-10 font-regular px-4 py-2 rounded-lg flex items-center gap-2"
      >
        {selectedCity || "Select City"}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showCityPicker && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                onSelect("Khategaon");
                setShowCityPicker(false);
              }}
              className="block px-4 py-2 text-sm text-black hover:bg-black-10 hover:font-semibold w-full text-left"
              role="menuitem"
            >
              Khategaon
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
