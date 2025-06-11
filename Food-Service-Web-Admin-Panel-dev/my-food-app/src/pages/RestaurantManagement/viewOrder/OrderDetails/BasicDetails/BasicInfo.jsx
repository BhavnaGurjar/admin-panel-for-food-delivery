import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { basicInfoData } from "../../constants/index";

const BasicInfo = () => {
  const {
    customer,
    restaurant,
    delivery,
    cancellation,
    order,
    specialIntruction,
    reassignmentDetails,
  } = basicInfoData;

  const renderValue = (value) =>
    value ? (
      <span className="fw-semibold">{value}</span>
    ) : (
      <span className="text-muted">N/A</span>
    );

  return (
    <Container className="mx-0 mt-3">
      <Row>
        <Col>
          {/* Customer Details */}
          <div className="border rounded">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Customer Details
                </h6>
              </div>
              <DataRow
                label="Customer Name"
                value={renderValue(customer.name)}
              />
              <DataRow
                label="Customer Contact"
                value={renderValue(customer.contact)}
              />
              <DataRow
                label="Customer Location"
                value={renderValue(customer.location)}
              />
            </div>
          </div>

          {/* Restaurant Details */}
          <div className="border rounded mt-3">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Restaurant Details
                </h6>
              </div>
              <DataRow
                label="Restaurant Name"
                value={renderValue(restaurant.name)}
              />
              <DataRow
                label="Restaurant Contact"
                value={renderValue(restaurant.contact)}
              />
            </div>
          </div>

          {/* Delivery Details */}
          <div className="border rounded mt-3">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Delivery Details
                </h6>
              </div>
              <DataRow
                label="Delivery Partner Name"
                value={renderValue(delivery.name)}
              />
              <DataRow
                label="Delivery Partner Contact"
                value={renderValue(delivery.contact)}
              />
            </div>
          </div>

          <div className="border rounded mt-3">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Reassignment Details
                </h6>
              </div>
              <DataRow
                label="Reassignment"
                value={renderValue(reassignmentDetails.reassign)}
              />
              <DataRow
                label="Reassignment Count"
                value={renderValue(reassignmentDetails.reassignmentCount)}
              />
              <DataRow
                label="Reassignment Type"
                value={renderValue(reassignmentDetails.reassignmentType)}
              />
            </div>
          </div>

          {/* Cancellation Details */}
          <div className="border rounded mt-3">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Cancellation Details
                </h6>
              </div>
              <DataRow
                label="Reason for Cancellation"
                value={renderValue(cancellation.reason)}
              />
            </div>
          </div>
        </Col>
        <Col>
          {/* Order Details */}
          <div className="border rounded">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Order Details
                </h6>
              </div>
              <DataRow label="Order ID" value={renderValue(order.id)} />
              <DataRow
                label="Order Placed At"
                value={renderValue(order.placedAt)}
              />
              <DataRow label="Order Type" value={renderValue(order.type)} />
              <DataRow label="Order Amount" value={renderValue(order.amount)} />
              <div className="flex items-center pt-2">
                <p className="p-0 mb-0 pe-1">Payment Status :</p>
                <span className="p-0 mb-0">
                  <button
                    className={`rounded-pill btn-sm text-center fs-8 border-0 py-1 px-2 text-white ${
                      order.paymentStatus === "Paid"
                        ? "btn-success"
                        : order.paymentStatus === "Unpaid"
                        ? "bg-custom-red"
                        : order.paymentStatus === "Pending"
                        ? "bg-custom-yellow"
                        : ""
                    }`}
                    style={{ fontSize: "0.8rem", width: "70px" }}
                  >
                    {order.paymentStatus}
                  </button>
                </span>
              </div>

              <DataRow
                label="Discount Applied"
                value={renderValue(order.applied)}
              />
              <DataRow
                label="Discount Type"
                value={renderValue(order.discountType)}
              />
              <DataRow
                label="Final Payable Amount"
                value={renderValue(order.finalAmount)}
              />
              <DataRow
                label="Current Order Status"
                value={renderValue(order.duration)}
              />
              <DataRow
                label="Order Timeline"
                value={renderValue(order.timeLine)}
              />
              <DataRow
                label="Order Duration"
                value={renderValue(order.duration)}
              />
              <div className="flex items-center pt-2">
                <p className="p-0 mb-0 pe-1">Final Order Status :</p>
                <span className="p-0 mb-0">
                  <button
                    className={`rounded-pill btn-sm text-center fs-8 py-1 border-0 px-2 text-white ${
                      order.finalStatus === "Delivered"
                        ? "btn-success"
                        : order.finalStatus === "Pending"
                        ? "bg-custom-yellow"
                        : order.finalStatus === "Undelivered"
                        ? "bg-custom-red"
                        : ""
                    }`}
                    style={{ fontSize: "0.8rem", width: "92px" }}
                  >
                    {order.finalStatus}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Reassignment Details */}
          <div className="border rounded mt-3">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Special Instructions & Support
                </h6>
              </div>
              <DataRow
                label="Special Intruction"
                value={renderValue(specialIntruction.intruction)}
              />
              <DataRow
                label="Ticket Handled"
                value={renderValue(specialIntruction.ticketHandled)}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="p-0 mb-0 pe-1">{label}:</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default BasicInfo;
