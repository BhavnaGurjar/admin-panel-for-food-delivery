import { useState } from "react";

const StageLogsOffcanvas = ({ showOffcanvas, handleCloseOffcanvas, logs }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getStatusColor = (log) => {
    if (log.status === "green") return "🟢";
    if (log.status === "orange") return "🟠";
    if (log.status === "red") return "🔴";
    return "⚪";
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-[30%] transform bg-black ${
        showOffcanvas ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full bg-gray-800 text-white">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex justify-between w-full">
            <h5 className="text-lg font-medium">New stage logs</h5>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white text-gray-800 px-3 py-1 rounded-full mr-4 text-sm text-black"
              >
                Apply filter
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 text-black bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-black-10">
                      All
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-black-10">
                      Success
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-black-10">
                      Pending
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-black-10">
                      Failed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleCloseOffcanvas}
            className="text-white hover:text-gray-300 ml-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-auto p-4 flex-grow">
          {logs.map((log, index) => (
            <div key={index} className="py-2 text-sm">
              {getStatusColor(log)} {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageLogsOffcanvas;
