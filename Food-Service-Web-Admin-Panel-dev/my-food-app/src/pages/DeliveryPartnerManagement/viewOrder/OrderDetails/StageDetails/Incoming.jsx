import { useState } from "react";
import { CustomTable } from "../../../../../components";
import { assignmentDetailsData, escalationData } from "../../constants/index";
import { SectionRow, SectionCard } from "../../Section";

const Incoming = () => {
  const [incomingActiveTab, setIncomingActiveTab] =
    useState("assignmentDetails");

  const columns = [
    { title: "Attempt", dataIndex: "attempt", type: "text" },
    { title: "Request Sent Time", dataIndex: "requestSentTime", type: "text" },
    { title: "PartnerID", dataIndex: "partnerId", type: "text" },
    { title: "Partner Type", dataIndex: "partnerType", type: "text" },
    {
      title: "Partner Response",
      dataIndex: "partnerResponse",
      type: "custom",
      render: (value) => (
        <div
          className={`rounded-lg font-medium text-sm text-center py-1 px-1 cursor-pointer border-2 ${
            value === "No Response"
              ? "bg-pending-subtle border-pending text-pending"
              : value === "Accept"
              ? "bg-blue-subtle border-blue text-blue-600"
              : value === "Rejected"
              ? "bg-danger-subtle text-danger"
              : ""
          }`}
          style={{ fontSize: "0.8rem", width: "100px" }}
        >
          {value || "N/A"}
        </div>
      ),
    },
    { title: "Response Time", dataIndex: "responseTime", type: "text" },
    { title: "Reassignment", dataIndex: "reassigment", type: "text" },
    { title: "Phone", dataIndex: "phone", type: "text" },
  ];

  const reassigmentCycleData = [
    {
      attempt: "1",
      requestSentTime: "14:10:00",
      partnerId: "DP1001",
      partnerType: "Regular",
      partnerResponse: "No Response",
      responseTime: "N/A",
      reassigment: "YES",
      phone: "+919988776655",
    },
    {
      attempt: "2",
      requestSentTime: "14:10:00",
      partnerId: "DP1002",
      partnerType: "Regular",
      partnerResponse: "Accept",
      responseTime: "N/A",
      reassigment: "NO",
      phone: "+919988776655",
    },
    {
      attempt: "3",
      requestSentTime: "14:10:00",
      partnerId: "DP1003",
      partnerType: "Regular",
      partnerResponse: "Rejected",
      responseTime: "N/A",
      reassigment: "YES",
      phone: "+919988776655",
    },
    {
      attempt: "4",
      requestSentTime: "14:10:00",
      partnerId: "DP1004",
      partnerType: "Regular",
      partnerResponse: "Accept",
      responseTime: "N/A",
      reassigment: "NO",
      phone: "+919988776655",
    },
  ];

  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="border border-black-20 rounded-lg p-4">
      <div className="flex gap-5 border-b border-[#00014533] mb-4">
        <h6
          onClick={() => setIncomingActiveTab("assignmentDetails")}
          className={`${
            incomingActiveTab === "assignmentDetails"
              ? "border-b-2 border-blue"
              : "opacity-50"
          } text-blue font-medium cursor-pointer pb-3 m-0 px-4`}
        >
          Assignment Details
        </h6>
        <h6
          onClick={() => setIncomingActiveTab("deliveryManagerEscalation")}
          className={`${
            incomingActiveTab === "deliveryManagerEscalation"
              ? "border-b-2 border-blue"
              : "opacity-50"
          } text-blue font-medium cursor-pointer pb-3 m-0 px-4`}
        >
          Delivery Manager Escalation
        </h6>
        <h6
          onClick={() => setIncomingActiveTab("reassignmentCycleData")}
          className={`${
            incomingActiveTab === "reassignmentCycleData"
              ? "border-b-2 border-blue"
              : "opacity-50"
          } text-blue font-medium cursor-pointer pb-3 m-0 px-4`}
        >
          Reassignment Cycle Data ({reassigmentCycleData.length})
        </h6>
      </div>

      {incomingActiveTab === "assignmentDetails" && (
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SectionCard title="Request & Assignment Details">
            <SectionRow
              label="Request Sent Time"
              value={renderValue(assignmentDetailsData.requestSentTime)}
            />
            <SectionRow
              label="Assigned Partner ID"
              value={renderValue(assignmentDetailsData.assignedPartnerId)}
            />
            <SectionRow
              label="Partner Type"
              value={renderValue(assignmentDetailsData.partnerType)}
            />
          </SectionCard>

          <SectionCard title="Partner Response & Status">
            <SectionRow
              label="Partner Response"
              value={renderValue(assignmentDetailsData.partnerResponse)}
            />
            <SectionRow
              label="Response Time"
              value={renderValue(assignmentDetailsData.responseTime)}
            />
            <SectionRow
              label="Auto-Reassignment Triggered?"
              value={renderValue(
                assignmentDetailsData.autoReassignmentTriggered
              )}
            />
            <SectionRow
              label="Reassignment Count"
              value={renderValue(assignmentDetailsData.reassignmentCount)}
            />
          </SectionCard>

          <SectionCard title="SLA Monitoring">
            <SectionRow
              label="SLA 50% Breached?"
              value={renderValue(assignmentDetailsData.sla50Breached)}
            />
            <SectionRow
              label="SLA Fully Breached?"
              value={renderValue(assignmentDetailsData.slaFullyBreached)}
            />
          </SectionCard>

          <SectionCard title="Emergency Handling">
            <SectionRow
              label="Emergency Partner Assigned?"
              value={renderValue(assignmentDetailsData.emergencyAssigned)}
            />
            <SectionRow
              label="Emergency Partner Request Sent Time"
              value={renderValue(assignmentDetailsData.emergencyRequestTime)}
            />
            <SectionRow
              label="Emergency Partner ID"
              value={renderValue(assignmentDetailsData.emergencyPartnerId)}
            />
            <SectionRow
              label="Emergency Partner’s Acceptance Time"
              value={renderValue(assignmentDetailsData.emergencyAcceptanceTime)}
            />
          </SectionCard>
        </div>
      )}

      {incomingActiveTab === "deliveryManagerEscalation" && (
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <SectionCard title="Escalation Trigger">
            <SectionRow
              label="Escalated to Delivery Manager?"
              value={renderValue(escalationData.escalatedToDM)}
            />
            <SectionRow
              label="Escalation Time"
              value={renderValue(escalationData.escalationTime)}
            />
          </SectionCard>

          <SectionCard title="Reassignment Management">
            <SectionRow
              label="Delivery Manager Extends Reassignment?"
              value={renderValue(escalationData.dmExtendsReassignment)}
            />
            <SectionRow
              label="Counts of Extension by the Delivery Manager"
              value={renderValue(escalationData.dmExtensionCount)}
            />
          </SectionCard>

          <SectionCard title="Final Decision & Order Status">
            <SectionRow
              label="Message"
              value={renderValue(escalationData.finalMessage)}
            />
            <SectionRow
              label="Order Cancelled?"
              value={renderValue(escalationData.orderCancelled)}
            />
          </SectionCard>
        </div>
      )}

      {incomingActiveTab === "reassignmentCycleData" && (
        <div className="mt-2">
          <CustomTable columns={columns} data={reassigmentCycleData} />
        </div>
      )}
    </div>
  );
};

export default Incoming;
