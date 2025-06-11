import { sidebarLinks } from "../../constants/sidebarLinks";
import { Icons, images } from "../../assets";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isCollapsed }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

 const renderSidebarContent = () => (
  <div className={`h-full w-full flex flex-col
`}
                >
    {/* Logo */}
    <div className="border-b border-gray px-3 py-2.5 flex justify-center items-center flex-shrink-0">
      <img
        src={isCollapsed ? images.miniLogo : images.logo}
        alt="Logo"
        className={isCollapsed ? "h-11 w-12 p-2" : "h-11 w-32 py-2"}
      />
    </div>

    {/* Scrollable Navigation Links */}
    <div
      style={{
        scrollbarWidth: 'thin',
      }}
     className={`flex-1 overflow-y-auto sidebar-scrollbar mt-4 flex flex-col gap-1`}>
      {sidebarLinks.map((link, index) => {
        const isSubLinkActive = link.subLinks?.some(
          (subLink) => subLink.path === location.pathname
        );

        return (
          <div key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center w-full text-sm transition-all duration-300 ${
                  isCollapsed ? "justify-center py-2 px-0" : "justify-start gap-2 px-3 py-1.5"
                } ${
                  isActive || isSubLinkActive
                    ? "text-black font-medium"
                    : "text-[rgba(95,94,94,1)] rounded-md hover:bg-gray-100 transition-all duration-300"
                }`
              }
              onClick={() => handleMenuClick(index)}
            >
              <link.icon />
              {!isCollapsed && <span>{link.name}</span>}
              {link.subLinks && !isCollapsed && (
                <span className="ml-auto">
                  {activeMenu === index ? <Icons.DownArrow /> : <Icons.UpArrow />}
                </span>
              )}
            </NavLink>

            {/* Sub-links */}
            {link.subLinks && activeMenu === index && !isCollapsed && (
             <div className="pl-8">
  {link.subLinks.map((subLink, subIndex) => (
   <NavLink
  to={subLink.path}
  key={subIndex}
  className={({ isActive }) =>
    `relative flex items-center w-[12.188rem] py-[0.372rem] font-medium no-underline text-[0.840rem] pl-3 pr-2 rounded transition-all duration-300 ${
      isActive
        ? "text-primary bg-[#CFE1FD] hover:bg-[#c9ddfc] bg-opacity-75"
        : "text-[rgba(95,94,94,1)] hover:bg-gray-100"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span
  className={`rounded-full absolute left-0 top-1/2 -translate-y-[45%] bg-primary flex justify-center items-center transition-all duration-300 ${
    isActive ? "w-[0.15rem] h-[0.85rem] opacity-100" : "w-0 opacity-0"
  }`}
/>
      {subLink.name}
    </>
  )}
</NavLink>


  ))}
</div>

            )}
          </div>
        );
      })}
    </div>
  </div>
);


  return (
    <div
      className={`hidden md:flex flex-col bg-white border-r border-gray-100 transition-all duration-300
    ${isCollapsed ? "w-20 items-center" : "w-64"} 
    h-screen overflow-y-auto sidebar-scrollbar
  `}

    >
        {renderSidebarContent()}
    </div>

  );

};

export default Sidebar;
