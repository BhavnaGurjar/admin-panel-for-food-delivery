import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { refunds, penaltyDetails } from "../../constants/index";

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-2">
    <p className="p-0 mb-0 pe-1">{label}:</p>
    <span className="p-0 mb-0 fw-semibold">{value}</span>
  </div>
);

const DeliveryPenalties = () => {
  const renderValue = (value) =>
    value ? <span>{value}</span> : <span className="text-muted">N/A</span>;

  return (
    <Container className="mx-0 mt-3">
      <Row>
        <Col>
          {/* Delivery Fee Details */}
          <div className="border rounded">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Refunds Information
                </h6>
              </div>
              <DataRow
                label="Refund initiated"
                value={renderValue(refunds.initiated)}
              />
              <DataRow label="Refund Type" value={renderValue(refunds.type)} />
              <DataRow
                label="Refund %"
                value={renderValue(refunds.percentage)}
              />
              <DataRow
                label="Assigned Manager"
                value={renderValue(refunds.assignedManager)}
              />
              <DataRow
                label="Refund Status"
                value={renderValue(refunds.refundStatus)}
              />
              <DataRow
                label="Refund Date & Time"
                value={renderValue(refunds.refundDate)}
              />
            </div>
          </div>
        </Col>
        <Col>
          {/* Penalty Details */}
          <div className="border rounded">
            <div className="p-2">
              <div className="tabs-row">
                <h6 className="text-custom-primary fw-medium pt-2">
                  Penalty Information
                </h6>
              </div>
              <DataRow
                label="Penalty Applied?"
                value={renderValue(penaltyDetails.applied)}
              />
              <DataRow
                label="Penalty Type"
                value={renderValue(penaltyDetails.type)}
              />
              <DataRow
                label="Penalty %"
                value={renderValue(penaltyDetails.percentage)}
              />
              <DataRow
                label="Penalty Amount"
                value={renderValue(penaltyDetails.amount)}
              />
              <DataRow
                label="Penalty Deducted Status"
                value={renderValue(penaltyDetails.deducted)}
              />
              <DataRow
                label="Penalty Deducted Date"
                value={renderValue(penaltyDetails.deductedDate)}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryPenalties;
