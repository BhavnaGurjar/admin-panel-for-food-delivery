import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../../components";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen bg-[#F5F6FA] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="bg-white shadow-xl h-full overflow-y-auto">
            <Sidebar isCollapsed={false} />
          </div>
          <div
            className="flex-grow bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Header
          toggleSidebar={toggleSidebar}
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-3 sm:p-4 lg:p-6 max-w-full min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
