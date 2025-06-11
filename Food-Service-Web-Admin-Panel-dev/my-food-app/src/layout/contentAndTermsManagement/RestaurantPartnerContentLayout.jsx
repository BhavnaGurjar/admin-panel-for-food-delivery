import React from "react";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const RestaurantPartnerContentLayout = () => {
  const location = useLocation();
  const { restaurantId } = useParams();
  const { id } = useParams();

  // const breadcrumbItems = [
  //   {
  //     name: "1  SLA ( Service level agreement )",
  //     link: "/restaurant-management/approvals",
  //   },
  //   { name: "Request" },
  // ];

  const sidebarLinks = [
    {
      name: "1  SLA ( Service level agreement )",
      link: `/content-terms-management/restaurant-partner/sla`,
      subLinks: [],
    },
    {
      name: "2 Refund & Penalty policies",
      link: `/content-terms-management/restaurant-partner/refund-penalty`,
      subLinks: [],
    },
    {
      name: "3 Partner Contract",
      link: `/content-terms-management/restaurant-partner/partner-contract`,
      subLinks: [],
    },
    {
      name: "4 Cuisines",
      link: `/content-terms-management/restaurant-partner/cuisines`,
      subLinks: [],
    },
    {
      name: "5 Item Tags",
      link: `/content-terms-management/restaurant-partner/item-tags`,
      subLinks: [],
    },
    {
      name: "6 Predefined Category",
      link: `/content-terms-management/restaurant-partner/predefined-category`,
      subLinks: [],
    },
    {
      name: "7 Tax Commissions & Charges",
      link: `/content-terms-management/restaurant-partner/tax-commissions-charges`,
      subLinks: [],
    },
  ];

  return (
    <div className="p-3 resto-layout-container overflow-auto">
      <div className="flex justify-between items-center">
        <h3 className="primary-font fw-bold fs-3">Restaurant Partner</h3>
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
      </div>
      <Container fluid className="border bg-white rounded p-3 mt-2">
        <Row>
          {/* Sidebar */}
          <Col md={4} lg={3}>
            <div className="resto-sidebar-container border rounded p-3 h-100">
              <ul className="list-unstyled">
                {sidebarLinks.map((item, index) => {
                  // Check if the parent link or any sub-links are active
                  const isActive =
                    location.pathname === item.link ||
                    location.pathname.startsWith(item.link);

                  return (
                    <li key={index} className="mt-4">
                      {/* Main Link */}
                      <Link
                        to={item.link}
                        style={{ fontSize: "15px" }}
                        className={`text-decoration-none ${
                          isActive
                            ? "text-blue fw-medium"
                            : "text-blue opacity-75"
                        }`}
                      >
                        {item.name}
                      </Link>
                      {/* Sub-links */}
                      {item.subLinks.length > 0 && (
                        <ul className="list-unstyled ps-3 mt-1">
                          {item.subLinks.map((subItem, subIndex) => {
                            return (
                              <li key={subIndex} className="mt-3">
                                <span
                                  className={`text-decoration-none fs-7 ${
                                    isActive
                                      ? "text-blue fw-medium"
                                      : "text-blue opacity-75"
                                  }`}
                                >
                                  {subItem.name}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>

          {/* Content */}
          <Col md={8} lg={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantPartnerContentLayout;
