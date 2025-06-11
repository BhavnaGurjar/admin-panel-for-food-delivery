import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";

const RestaurantLayout = () => {
  const location = useLocation();
  const { restaurantId, id, verificationStatus, rejectionMessage,rejectionCount, stepCount } = useParams();

  const breadcrumbItems = [
    {
      name: "Approval & Verification",
      link: "/restaurant-management/approvals",
    },
    { name: "Request" },
  ];

  const sidebarLinks = [
    {
      name: "1 Restaurant Information",
      link: `/restaurant-management/approvals/restaurant-info/${id}/${restaurantId}/${verificationStatus}/${rejectionMessage}/${rejectionCount}/1`,
      subLinks: [],
    },
    {
      name: "2 Restaurant Documents",
      link: `/restaurant-management/approvals/restaurant-docs/${id}/${restaurantId}/${verificationStatus}/${rejectionMessage}/${rejectionCount}/2`,
      subLinks: [
        { name: "2.1 PAN Details", link: "" },
        { name: "2.2 GST Details", link: "" },
        { name: "2.3 FSSAI Details", link: "" },
        { name: "2.4 Bank Details", link: "" },
      ],
    },
    {
      name: "3 Menu & Operational Details",
      link: `/restaurant-management/approvals/restaurant-menu/${id}/${restaurantId}/${verificationStatus}/${rejectionMessage}/${rejectionCount}/3`,
      subLinks: [
        { name: "3.1 Menu Images", link: "" },
        { name: "3.2 Restaurant Profile Image", link: "" },
        { name: "3.3 Cuisines", link: "" },
        { name: "3.4 Delivery Timing", link: "" },
      ],
    },
    {
      name: "4 Restaurant Partner Contract",
      link: `/restaurant-management/approvals/restaurant-contract/${id}/${restaurantId}/${verificationStatus}/${rejectionMessage}/${rejectionCount}/4`,
      subLinks: [],
    },
  ];

  // currentStep ko parse karte hain stepCount se, agar nahi mile toh 0
  const currentStep = stepCount ? parseInt(stepCount, 10) : 0;

  return (
    <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Request Details</h3>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="border border-[rgba(0,0,0,0.05)] bg-white rounded-lg p-4 mt-3">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/2 lg:w-1/3 mb-4 lg:mb-0">
            <div className="bg-[rgba(249,250,252,1)] text-[0.95rem] border border-[rgba(0,0,0,0.05)] rounded-md p-4 h-full">
              <ul>
                {sidebarLinks.map((item, index) => {
                  // isActive check
                  const isActive =
                    location.pathname === item.link ||
                    location.pathname.startsWith(item.link);

                  // targetStep extract kar rahe hain URL ke end se
                  const targetStepMatch = item.link.match(/\/(\d+)$/);
                  const targetStep = targetStepMatch ? parseInt(targetStepMatch[1], 10) : 0;

                  return (
                    <li key={index} className="mt-4">
                      <Link
                        to={item.link}
                        onClick={(e) => {
                          if (verificationStatus === "APPROVED") {
                            if (targetStep > currentStep) {
                              e.preventDefault();
                            }
                          }
                        }}
                        className={`block ${isActive ? "text-blue font-medium" : "text-blue opacity-75"}`}
                      >
                        {item.name}
                      </Link>
                      {item.subLinks.length > 0 && (
                        <ul className="pl-4 mt-3">
                          {item.subLinks.map((subItem, subIndex) => (
                            <li key={subIndex} className="mt-3 ">
                              <span
                                className={`${
                                  isActive ? "text-blue" : "text-blue opacity-75"
                                }`}
                              >
                                {subItem.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4 lg:pl-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLayout;
