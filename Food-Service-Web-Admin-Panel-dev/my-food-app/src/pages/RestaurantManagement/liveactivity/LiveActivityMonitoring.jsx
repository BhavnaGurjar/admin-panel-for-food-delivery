import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Icons } from "../../../assets";
import { textareaSchema, validationSchema } from "../../../schema";
import { tickets, ticketData, orderTableData, callReasons, stages, columns } from "./constants";
import { CustomFilterDropdown, CustomTable, Search, PaginationRow, CommonModal, } from "../../../components";

const LiveActivityMonitoring = () => {
  const [showSubData, setShowSubData] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("Tickets");
  const [selectedOrderId, setSelectedOrderId] = useState("12345");
  const totalTime = 180;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [finalStatusTab, setFinalStatusTab] = useState("Delivered");
  const [undeliveredSubTab, setUndeliveredSubTab] = useState("Cancellation");
  const [modal, setModal] = useState({ show: false, ticketIndex: null, callIndex: null, });
  const [callResponses, setCallResponses] = useState({});
  const [acceptModalShow, setAcceptModalShow] = useState(false);
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [acceptReason, setAcceptReason] = useState("");
  const [checked, setChecked] = useState(
    ticketData.map((ticket) => ticket.calls.map(() => false))
  );
  const [ticketDurations, setTicketDurations] = useState(() =>
    ticketData.map(ticket => {
      const [min, sec] = ticket.duration.split(':').map(Number);
      return min * 60 + sec;
    })
  );
  useEffect(() => {
    const intervals = ticketDurations.map((_, idx) =>
      setInterval(() => {
        setTicketDurations(prev => {
          const updated = [...prev];
          if (updated[idx] > 0) updated[idx] -= 1;
          return updated;
        });
      }, 1000)
    );
    return () => intervals.forEach(clearInterval);
  }, []);
  //call responses modal
  const openModal = (ticketIndex, callIndex) => {
    setModal({ show: true, ticketIndex, callIndex });
  };
  //call response submission handler 
  const handleSubmit = (values, { resetForm }) => {
    const updatedChecked = [...checked];
    updatedChecked[modal.ticketIndex][modal.callIndex] = true;

    const key = `${modal.ticketIndex}-${modal.callIndex}`;
    const responseText =
      values.reason === "Other issue" ? values.otherIssue : values.reason;

    setCallResponses((prev) => ({
      ...prev,
      [key]: responseText,
    }));

    setChecked(updatedChecked);
    setModal({ show: false, ticketIndex: null, callIndex: null });
    resetForm();
  };
  //handlers for accept and reject actions of tickets
  const handleReject = async (message) => {
    setRejectReason(message);
    console.log("Rejecting ticket with message:", message);
    setRejectModalShow(false);
  };
  const handleAccept = async (message) => {
    setAcceptReason(message);
    console.log("Accepting ticket with message:", message);
    setAcceptModalShow(false);
  };

  //timer for circular progress bar
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const uniqueOrderIds = [...new Set(tickets.map((ticket) => ticket.ticketId))];
  const [selectedFilter, setSelectedFilter] = useState("Filters");

  const filterOptions = [{ id: 1, label: "Option 1" }];
  return (
    <div className="position-relative h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h4 className="font-bold primary-font text-xl">
          Live activity monitoring
        </h4>
        <div className="flex items-center gap-3">
          <div>
            <Icons.Notification />
          </div>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center w-[4.65rem] h-8 cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showSubData}
              onChange={() => setShowSubData(!showSubData)}
            />
            <div className="absolute inset-0 rounded-full bg-[rgba(185,191,196,1)] peer-checked:bg-[rgba(0,1,69,1)] transition-colors duration-300"></div>
            <div className="absolute top-1.5 left-1 right-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-[2.74rem]"></div>
            <span
              className={`relative z-10 w-full text-white text-sm font-medium flex items-center h-full px-2 ${showSubData ? "" : "justify-end"
                }`}
            >
              {showSubData ? "Show" : "Hide"}
            </span>
          </label>
        </div>
      </div>
      {/* cards of live activity monitoring */}
      <div className="grid mb-2 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 xl:gap-4 md:px-6 lg:px-0">
        {stages.map((stage, index) => (
          <div key={index} className=" flex-shrink-0">
            <div className="shadow-sm border-0 rounded-lg flex flex-col w-[14rem] sm:w-full h-full pt-3 px-3 pb-10 bg-white">
              <div className="flex flex-col flex-grow">
                <h3 className="flex gap-2 items-center text-[1rem] font-semibold">
                  <div
                    className={`${stage.color} rounded-full w-8 h-8 flex justify-center items-center z-10`}
                  >
                    {stage.icon}
                  </div>
                  {stage.name}
                </h3>
                <div className={`flex justify-center mt-2 ${stage.total === 0 ? 'opacity-50' : ''}`}>
                  <div className="text-[1rem] flex gap-2 items-center">
                    <span
                      className="font-medium"
                      style={{ color: stage.total > 0 ? 'rgba(95, 94, 94, 1)' : undefined }}
                    >
                      {stage.name === "Final Status" ? "Total" : "Live"}
                    </span>

                    <div className="relative w-full aspect-square h-full flex justify-center items-center">
                      {stage.total > 0 && (
                        <span className="absolute inset-0 flex justify-center items-center rounded-full opacity-75 animate-pulseRingSlow bg-[#b9d9f3]"></span>
                      )}
                      <span className="relative z-10 font-semibold text-black w-full h-full rounded-full flex justify-center items-center bg-[#f8f8f9]">
                        {stage.total}
                      </span>
                    </div>
                  </div>
                </div>



                {/* final status delivered tab and undelivered sub tab */}
                {stage.name === "Final Status" && (
                  <>
                    <div className="w-full flex justify-center">
                      <div className="flex text-xs mt-2 bg-[rgba(246,246,246,1)] rounded-full p-1">
                        <button
                          className={`border-0 px-2 py-2 rounded-full ${finalStatusTab === "Delivered"
                            ? "bg-primary font-medium text-white"
                            : "bg-transparent text-[rgba(95,94,94,1)] hover:text-black"
                            }`}
                          onClick={() => setFinalStatusTab("Delivered")}
                        >
                          Delivered
                        </button>
                        <button
                          className={`border-0 px-2 py-2 rounded-full ${finalStatusTab === "Undelivered"
                            ? "bg-primary font-medium text-white"
                            : "bg-transparent text-[rgba(95,94,94,1)] hover:text-black"
                            }`}
                          onClick={() => setFinalStatusTab("Undelivered")}
                        >
                          Undelivered
                        </button>
                      </div>
                    </div>
                    {(
                      stage.name === "Final Status"
                    ) && (
                        <div className={`flex justify-center mt-2 ${stage.total === 0 ? 'opacity-50' : ''}`}>
                          <div className="text-[0.90rem] flex gap-2 items-center">
                            <span
                              className={`font-medium`}
                              style={{ color: stage.total > 0 ? 'rgba(95, 94, 94, 1)' : undefined }}
                            >
                              Total
                            </span>

                            <div className="relative w-full aspect-square h-full flex justify-center items-center">
                              {stage.total > 0 && (
                                <span className="absolute inset-0 flex justify-center items-center rounded-full opacity-75 animate-pulseRingSlow bg-[#b9d9f3]"></span>
                              )}
                              <span className="relative z-10 font-semibold text-black w-full h-full rounded-full flex justify-center items-center bg-[#f8f8f9]">
                                {stage.total}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    {/* Undelivered Sub Tabs */}
                    {finalStatusTab === "Undelivered" && (

                      <div className="w-full flex justify-center text-xs transition-all duration-200 mt-2 p-1">
                        <button
                          className={`border-0 p-1 ${undeliveredSubTab === "Cancellation"
                            ? "border-primary border-b text-primary font-medium text-[rgba(95,94,94,1)]"
                            : "hover:text-black"
                            }`}
                          onClick={() => setUndeliveredSubTab("Cancellation")}
                        >
                          Cancelled(123)
                        </button>
                        <button
                          className={`border-0 p-1 ${undeliveredSubTab === "Return"
                            ? "border-primary border-b text-primary font-medium text-[rgba(95,94,94,1)]"
                            : "hover:text-black"
                            }`}
                          onClick={() => setUndeliveredSubTab("Return")}
                        >
                          Return(123)
                        </button>
                      </div>
                    )}
                  </>
                )}
                {/* all cards of live activity monitoring */}
                {((stage.name === "Final Status" &&
                  finalStatusTab === "Undelivered" &&
                  undeliveredSubTab === "Cancellation") ||
                  stage.name !== "Final Status") &&
                  stage.subStages?.map((status, i) => (
                    <div
                      key={i}
                      className={`mt-2 rounded-lg px-3 py-1.5 border-[0.031rem] ${status.name === "SLA breach"
                        ? "border-red-200 bg-red-50"
                        : status.name === "Return"
                          ? "border-yellow-300"
                          : "border-[rgba(0,0,0,0.1)]"
                        }`}
                    >
                      <div className="flex justify-between text-xs items-center">
                        <span className="font-medium">{status.name}</span>
                        <div className="relative aspect-square min-w-[1.5rem] min-h-[1.5rem] flex justify-center items-center">
                          {/* Outer pulse ring - only show if count > 1 */}
                          {status.count >= 1 && (
                            <span
                              className={`absolute inset-0 flex justify-center items-center rounded-full opacity-75 pointer-events-none ${status.name === "SLA breach"
                                ? "bg-red-400 animate-pulseRingFast"
                                : "bg-[#4ca7f9] animate-pulseRing"
                                }`}
                            ></span>
                          )}
                          <span className="relative z-10 w-full h-full font-semibold bg-[#f8f8f9] rounded-full flex justify-center items-center">
                            {status.count || 0}
                          </span>
                        </div>


                      </div>

                      {/* Sub Stages */}
                      {showSubData &&
                        status.subStages?.length > 0 &&
                        status.subStages.map((subStatus, j) => (
                          <div
                            key={j}
                            className={`mt-2 rounded-lg px-2 py-1.5 bg-[rgba(245,246,250,1)] border-[0.031rem]
                      ${subStatus.name === "SLA breach"
                                ? "border-red-300 bg-red-50"
                                : "border-[rgba(0,0,0,0.1)]"
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-[0.65rem]">
                                {subStatus.name}
                              </span>

                              <div className="relative aspect-square min-w-[1.2rem] min-h-[1.2rem]">
                                {subStatus.count >= 1 && (
                                  <span
                                    className={`absolute inset-0 flex justify-center items-center rounded-full opacity-75 ${subStatus.name === "SLA breach" ? "bg-red-400 animate-pulseRingFast" : "bg-[#4ca7f9] animate-pulseRing"
                                      }`}
                                  ></span>
                                )}
                                <span className="relative z-10 text-xs font-semibold bg-[#f8f8f9] w-full h-full rounded-full flex justify-center items-center">
                                  {subStatus.count || 0}
                                </span>
                              </div>

                            </div>
                            <div>

                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shadow-sm bg-white rounded-md mt-3 p-3">
        <div className="w-fit px-2 py-1 rounded-full flex gap-2 bg-[rgba(246,246,246,1)]">
          {["Tickets", "Tables"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${activeNavTab === tab
                ? "bg-primary text-white font-medium"
                : "bg-transparent text-[rgba(95,94,94,1)] hover:text-black"
                }`}
              onClick={() => setActiveNavTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeNavTab === "Tickets" ? (
          <div className="px-3 py-2 border border-black-10 rounded-xl mt-3">
            {/* Ticket List Heading */}
            <h4 className="text-lg font-semibold mb-2">Ticket List</h4>

            <div className="flex gap-3">
              {/* Left Column - Order ID Buttons */}
              <div className="w-full md:w-[30%] lg:w-1/6 mt-2">
                <div className="bg-[rgba(246,246,246,1)] p-3 border border-black-10 flex flex-col gap-2 rounded-xl h-full">
                  {uniqueOrderIds.map((orderId, index) => (
                    <button
                      key={index}
                      className={`rounded-lg px-0 py-2 text-sm w-full transition duration-300 ${selectedOrderId === orderId
                        ? "bg-white font-medium shadow-md"
                        : "bg-transparent"
                        }`}
                      onClick={() => setSelectedOrderId(orderId)}
                    >
                      Order ID: {orderId}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Ticket Info */}
              <div className="w-full md:max-w-3xl lg:w-5/6 pl-0">
                <div className="rounded-xl p-3 border border-black-10 mt-2">
                  {/* Order ID Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-black-10">
                    <h5 className="text-primary text-[1rem] font-medium">
                      ORDER ID: {selectedOrderId}
                    </h5>
                    <div className="text-[1rem] font-medium flex items-center gap-1">
                      <Icons.Mobile
                        strokeColor="rgba(246,155,14,1)"
                        strokeWidth="0.094rem"

                      />
                      9926490897
                    </div>
                  </div>

                  {/* Ticket Data */}
                  {ticketData.map((ticket, idx) => {
                    const currentTime = ticketDurations[idx];
                    const [min, sec] = ticket.duration.split(':').map(Number);
                    const totalTime = min * 60 + sec;

                    const percentage = (currentTime / totalTime) * 100;
                    const minutes = Math.floor(currentTime / 60);
                    const seconds = currentTime % 60;
                    return (
                      <div
                        key={idx}
                        className="border border-black-10 my-3 rounded-xl md:px-2 lg:px-4 py-5 shadow-sm"
                      >
                        <div className="flex lg:flex-row justify-between items-center">
                          {/* Ticket Details */}
                          <div>
                            <div className="flex items-start gap-3">
                              <div className="flex flex-col">
                                <div className="flex gap-2">
                                  <div
                                    className={`rounded-full ${ticket.status} w-[2.25rem] h-[2.25rem] flex justify-center items-center`}
                                  >
                                    {ticket.icon}
                                  </div>
                                  <div>
                                    <h5 className="text-[1rem] font-semibold">
                                      {ticket.title}
                                    </h5>
                                    <p className="text-sm font-medium text-[rgba(95,94,94,1)] mb-3">
                                      {ticket.time}
                                    </p>
                                  </div>
                                </div>
                                {/* Ticket Type Content */}
                                {ticket.title ===
                                  "Delivery Partner Complaints" ? (
                                  <div className="text-sm">
                                    <p>
                                      <span className="text-[rgba(95,94,94,1)]">
                                        Ticket ID -{" "}
                                      </span>
                                      <span className="font-medium">1234</span>
                                    </p>
                                    {rejectReason && (
                                      <div className="text-sm mt-1">
                                        <span className="font-medium">Message:</span>{' '}
                                        <span className="text-red-600">{rejectReason}</span>
                                      </div>
                                    )}
                                    {acceptReason && (
                                      <div className="text-sm mt-1">
                                        <span className="font-medium">Message:</span>{' '}
                                        <span className="text-[rgba(95,94,94,1)]">{acceptReason}</span>
                                      </div>
                                    )}

                                    {!acceptReason && !rejectReason && (
                                      <div className="flex gap-2 mt-3 text-base">
                                        <button
                                          onClick={() => setRejectModalShow(true)}
                                          className="bg-transparent text-red-500 px-4 py-1.5 border border-red-500 rounded-full text-sm hover:bg-red-500 hover:text-white transition-all duration-300">
                                          Reject
                                        </button>
                                        <button
                                          onClick={() => setAcceptModalShow(true)}
                                          className="hover:bg-green-500 hover:text-white border text-green-500 border-green-500 px-4 py-1.5 rounded-full text-sm transition-all duration-300">
                                          Accept
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex flex-wrap gap-3">
                                    {ticket.calls.map((call, i) => {
                                      let callsCount = ticket.calls.length;
                                      const key = `${idx}-${i}`;
                                      const response = callResponses[key];
                                     
                                      const perCallTime = totalTime / callsCount;

                                      let callRemaining = perCallTime * (callsCount - 1 - i);
                                      if (callRemaining < 0) callRemaining = 0;

                                      const callMin = Math.floor(perCallTime / 60);
                                      const callSec = Math.floor(perCallTime % 60);

                                      return (
                                        <div
                                          key={i}
                                          className="w-full md:w-[17.648rem] h-auto bg-[rgba(245,246,250,1)] shadow-sm px-3 py-2 rounded-lg relative"
                                        >
                                          {/* Countdown - Top right corner absolutely positioned */}
                                          <div className="absolute top-2 right-3 text-xs">
                                            <span className="text-xs text-[rgba(95,94,94,1)]">Countdown - </span>
                                            <span className="font-medium text-sm font-mono">
                                              {`${callMin}:${String(callSec).padStart(2, "0")}`}
                                            </span>

                                          </div>

                                          <div className="flex gap-2">
                                            {/* Checkbox and Icon */}
                                            <div className="flex flex-col gap-1">
                                              <input
                                                type="checkbox"
                                                checked={checked[idx][i]}
                                                onChange={() =>
                                                  openModal(idx, i)
                                                }
                                                className="w-[0.875rem] h-[0.875rem] outline-none cursor-pointer border border-[rgba(0,0,0,0.2)] rounded-sm checked:bg-sky-600"
                                              />
                                              <div className="flex items-center mt-3  gap-1">
                                                <div className="bg-[rgba(6,110,255,0.1)] w-6 h-6 rounded-full flex justify-center items-center">
                                                  <Icons.Mobile
                                                    width='0.83rem'
                                                    height='0.83rem'
                                                    strokeColor="rgba(6,110,255,1)"
                                                    strokeWidth="0.044rem"
                                                  />
                                                </div>
                                                <div className="font-medium text-sm">
                                                  {call.name}
                                                </div>

                                                {response && (
                                                  <div className="flex items-center">
                                                    <span className="font-medium pl-0.5 pr-1 pb-0.5">:</span>
                                                    <div className="text-sm text-[rgba(95,94,94,1)] ml-auto relative group">

                                                      <span className="inline-block max-w-[9rem] mt-1 sm:max-w-[12rem] truncate hover:cursor-pointer">
                                                        {response.length > 22 ? response.slice(0, 22) + '...' : response}
                                                      </span>
                                                      {response.length > 22 && (
                                                        <div className="relative group">
                                                          <div className="absolute z-10 bg-black text-white py-2 px-2.5 rounded-md text-xs invisible opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-7 whitespace-nowrap
                                                           before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black">
                                                            {response}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Circular Progress */}
                          <div className="flex flex-col lg:items-end md:items-center mt-5">
                            <span className="text-[rgba(95,94,94,1)] font-medium text-sm mt-2 mb-2">
                              Time left
                            </span>
                            <div className="w-[3.90rem]">
                              <CircularProgressbar
                                value={percentage}
                                text={`${minutes}:${String(seconds).padStart(2, "0")}`}
                                styles={buildStyles({
                                  pathColor: "#000145",
                                  textColor: "#333",
                                  trailColor: "#d6d6d6",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeNavTab === "Tables" ? (
          <div className="bg-white mt-3 py-4 px-0">
            <div className="mb-4 flex flex-row items-center justify-between">
              <Search />
              <div className="flex flex-row items-center gap-3">
                <CustomFilterDropdown
                  filterOptions={filterOptions}
                  value={selectedFilter}
                  handleOnChange={(value) => {
                    setSelectedFilter(value);
                  }}
                />
              </div>
            </div>
            <div className='shadow-md'>
              <CustomTable columns={columns} data={orderTableData} />
            </div>
            <PaginationRow />
          </div>
        ) : null}
      </div>
      {/* Call Response Modal */}
      {modal.show && (
        (() => {
          const key = `${modal.ticketIndex}-${modal.callIndex}`;
          const prevResponse = callResponses[key] || "";
          const isOtherIssue = !callReasons.includes(prevResponse);

          return (
            <Formik
              enableReinitialize
              initialValues={{
                reason: isOtherIssue && prevResponse ? "Other issue" : prevResponse,
                otherIssue: isOtherIssue ? prevResponse : "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <CommonModal
                  show={modal.show}
                  onHide={() =>
                    setModal({ show: false, ticketIndex: null, callIndex: null })
                  }
                  heading="Call Response Required"
                  subheading="The user did not answer the call. Please select a reason from the dropdown to proceed."
                  primaryButtonText="Apply"
                  primaryButtonColor="bg-green-500 text-white"
                  onPrimaryAction={async () => {
                    const reasonSelected = formik.values.reason;
                    await formik.setTouched({
                      reason: true,
                      otherIssue: reasonSelected === "Other issue",
                    });

                    const errors = await formik.validateForm();
                    const isValid = Object.keys(errors).length === 0;

                    if (isValid) {
                      await formik.submitForm();
                    }
                  }}
                  icon={
                    <Icons.Mobile
                      strokeColor="rgba(3,188,68,1)"
                      strokeWidth="0.094rem"
                      height="1.7rem"
                      width="1.7rem"
                    />
                  }
                  body={
                    <Form className="flex flex-col gap-3">
                      {callReasons.map((r) => (
                        <label key={r} className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="reason"
                            value={r}
                            className="cursor-pointer"
                          />
                          {r}
                        </label>
                      ))}
                      <ErrorMessage
                        name="reason"
                        component="div"
                        className="text-red-600 text-sm"
                      />

                      {formik.values.reason === "Other issue" && (
                        <>
                          <Field
                            as="textarea"
                            name="otherIssue"
                            rows={2}
                            placeholder="Enter issue"
                            className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                          />
                          <ErrorMessage
                            name="otherIssue"
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </>
                      )}
                    </Form>
                  }
                />
              )}
            </Formik>
          );
        })()
      )}
      {/* Accept Modal */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleAccept(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={acceptModalShow}
            onHide={() => setAcceptModalShow(false)}
            icon={<Icons.Approve />}
            heading="Confirm Acceptance"
            subheading="Please provide a reason for acceptance."
            body={
              <Form>
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Acceptance Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                    placeholder="Enter acceptance reason"
                    rows={2}
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 mt-1 text-sm">{errors.message}</div>
                  )}
                </div>
              </Form>
            }
            primaryButtonText="Accept"
            primaryButtonColor="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
      {/* Reject Modal with Formik */}
      <Formik
        initialValues={{ message: "" }}
        validationSchema={textareaSchema}
        onSubmit={(values) => handleReject(values.message)}
      >
        {({ handleSubmit, touched, errors }) => (
          <CommonModal
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            icon={<Icons.Cross2 strokeColor="rgba(255,77,79,1)" strokeWidth='0.125rem' />}
            heading="Confirm Rejection"
            subheading="Please provide a reason for rejection."
            body={
              <Form>
                <div className="mt-2">
                  <label className="block text-sm font-semibold mb-2">
                    Rejection Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="w-full border border-black-10 rounded p-3 text-sm outline-none resize-none hover:border-black-40"
                    placeholder="Enter rejection reason"
                    rows={2}
                  />
                  {touched.message && errors.message && (
                    <div className="text-red-600 mt-1 text-sm">{errors.message}</div>
                  )}
                </div>
              </Form>
            }
            primaryButtonText="Reject"
            primaryButtonColor="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
            onPrimaryAction={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
};

export default LiveActivityMonitoring;
