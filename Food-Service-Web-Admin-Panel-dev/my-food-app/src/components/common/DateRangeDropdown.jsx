import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { Icons } from "../../assets";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeDropdown = ({ onDateRangeChange, selectedRange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const [range, setRange] = useState({
    startDate: selectedRange?.startDate,
    endDate: selectedRange?.endDate,
    key: "selection",
  });

  const pickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (ranges) => {
    const newRange = ranges.selection;
    setRange(newRange);
    onDateRangeChange({
      startDate: newRange.startDate,
      endDate: newRange.endDate,
    });
  };

  const handleClear = () => {
    const cleared = {
      startDate: null,
      endDate: null,
      key: "selection",
    };
    setRange(cleared);
    onDateRangeChange({ startDate: null, endDate: null });
    setShowPicker(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="text-black hover:bg-black-10 flex items-center justify-between gap-2 font-medium rounded-lg border border-black-10 py-2 px-4 bg-transparent"
      >
        <Icons.Filter />
        {range.startDate
          ? `${range.startDate.toLocaleDateString()} - ${
              range.endDate ? range.endDate.toLocaleDateString() : ""
            }`
          : "Select Date"}
      </button>

      {showPicker && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg z-20 p-4">
          <button
            onClick={handleClear}
            className="text-sm text-black text-center hover:bg-black-10 px-3 py-2 w-full font-satoshi font-bold mb-2"
          >
            Clear Filter
          </button>

          <DateRangePicker
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="vertical"
            ranges={[range]}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
