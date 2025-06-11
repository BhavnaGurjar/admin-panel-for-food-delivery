import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets";

const Header = ({toggleSidebar, toggleCollapse }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false); 
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

 const handleToggleClick = () => {
  setIsRotated(!isRotated);
  toggleCollapse();
  toggleSidebar();
};



  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray font-poppins">
      {/* Sidebar Toggle Button on the LEFT */}
      <button
        onClick={handleToggleClick}
        className={`hidden md:block border-0 transition-all duration-300 ${
          isRotated ? "rotate-180" : ""
        }`}
        aria-label="Toggle Sidebar"
      >
        <Icons.Header strokeColor="#1273EE" />
      </button>

      {/* Profile Info on the RIGHT */}
      <div className="relative flex items-center gap-3">
        <img
          src="https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?w=500&auto=format&fit=crop&q=60"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button
          onClick={handleDropdownToggle}
          className="flex items-center gap-2 text-left focus:outline-none"
        >
          <div className="text-left">
            <div className="font-bold">John Doe</div>
            <small className="text-gray-500">Admin Role</small>
          </div>
          <Icons.DropDownArrow className="mt-1" />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 w-36 origin-top-right bg-white rounded-md border z-10"
            style={{ top: "calc(100%)" }}
          >
            <div className="py-1">
              <button
                onClick={() => handleNavigate("/profile")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </button>
              <button
                onClick={() => handleNavigate("/profile")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                History
              </button>
              <button
                onClick={() => handleNavigate("/logout")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
