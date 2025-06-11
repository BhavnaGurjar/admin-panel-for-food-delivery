import { useState } from "react";
import { useFormik } from "formik";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";

export default function SlaManagement() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [editingSection, setEditingSection] = useState("none");

  const formik = useFormik({
    initialValues: {
      awaitingTime: "",
      slaBreachTime: "",
      firstWait: "",
      firstCall: "",
      secondWait: "",
      secondCall: "",
      thirdWait: "",
      slaBreachPercentage: "",
    },
    onSubmit: (values) => {
      console.log("Form Data:", values);
      setEditingSection("none");
    },
  });

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleSave = (section) => {
    setEditingSection("none");
    console.log(`Saving ${section} section:`, formik.values);
  };

  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-3">
        <h4>SLA ( Service level agreement )</h4>
        <button className="btn btn-warning text-white py-2 px-4">Logs</button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="px-3 py-3"
          style={{ backgroundColor: "#F6F6F6", borderRadius: "50px" }}
        >
          <button
            className={`py-3 border-0 px-4 fs-6 ${
              activeTab === "incoming" ? "btn-warning text-white" : ""
            }`}
            style={{ borderRadius: "50px" }}
            onClick={() => setActiveTab("incoming")}
          >
            Incoming
          </button>
          <button
            className={`py-3 border-0 px-4 fs-6 ${
              activeTab === "preparing" ? "btn-warning text-white" : ""
            }`}
            style={{ borderRadius: "50px" }}
            onClick={() => setActiveTab("preparing")}
          >
            Preparing
          </button>
        </div>
        <div className="badge fs-6 bg-primary ms-auto py-3 flex items-center justify-center">
          Total : 0 min
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {activeTab === "incoming" ? (
          <>
            <div className="card mb-4">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center flex-row">
                    <i className="text-warning circle-icon me-2">
                      <AiOutlineInfoCircle size={22} />
                    </i>
                    <h5 className="mb-0 fw-bold">Awaiting time</h5>
                  </div>
                  <Button
                    className="p-1 rounded-circle border-0"
                    style={{ backgroundColor: "#FD7E141A" }}
                    onClick={() => handleEdit(section)}
                  >
                    <MdOutlineEdit size={20} color="#1273EE" />
                  </Button>
                </div>
                <div
                  className="mt-2 position-relative"
                  style={{ width: "12rem" }}
                >
                  <span
                    className="position-absolute"
                    style={{ top: 6.5, left: 10 }}
                  >
                    <FaRegClock />
                  </span>
                  <input
                    style={{ borderRadius: 10, paddingInlineStart: 30 }}
                    type="text"
                    name="awaitingTime"
                    placeholder="hh/mm/ss"
                    className="form-control"
                    value={formik.values.awaitingTime}
                    onChange={formik.handleChange}
                  />
                </div>
                {editingSection === "awaiting" && (
                  <button
                    type="button"
                    onClick={() => handleSave("awaiting")}
                    className="btn btn-warning text-white mt-3"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center flex-row">
                    <i className="text-warning circle-icon me-2">
                      <AiOutlineInfoCircle size={22} />
                    </i>
                    <h5 className="mb-0 fw-bold">SLA breach time </h5>
                  </div>
                  <Button
                    className="p-1 rounded-circle border-0"
                    style={{ backgroundColor: "#FD7E141A" }}
                    onClick={() => handleEdit(section)}
                  >
                    <MdOutlineEdit size={20} color="#1273EE" />
                  </Button>
                </div>
                <div
                  className="mt-2 position-relative"
                  style={{ width: "12rem" }}
                >
                  <span
                    className="position-absolute"
                    style={{ top: 6.5, left: 10 }}
                  >
                    <FaRegClock />
                  </span>
                  <input
                    style={{ borderRadius: 10, paddingInlineStart: 30 }}
                    type="text"
                    name="awaitingTime"
                    placeholder="hh/mm/ss"
                    className="form-control"
                    value={formik.values.awaitingTime}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="flex flex-column gap-2 mt-2">
                  {[
                    { label: "1st Wait", name: "firstWait" },
                    { label: "1st Call", name: "firstCall" },
                    { label: "2nd Wait", name: "secondWait" },
                    { label: "2nd Call", name: "secondCall" },
                    { label: "3rd Wait", name: "thirdWait" },
                  ].map((item, idx) => (
                    <div
                      className="flex flex-row items-center justify-between"
                      key={idx}
                    >
                      <label className="form-label">{item.label}:</label>
                      <div
                        className="mt-2 position-relative"
                        style={{ width: "12rem" }}
                      >
                        <span
                          className="position-absolute"
                          style={{ top: 6.5, left: 10 }}
                        >
                          <FaRegClock />
                        </span>
                        <input
                          style={{ borderRadius: 10, paddingInlineStart: 30 }}
                          type="text"
                          name="awaitingTime"
                          placeholder="hh/mm/ss"
                          className="form-control"
                          value={formik.values.awaitingTime}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {editingSection === "breach" && (
                  <button
                    type="button"
                    onClick={() => handleSave("breach")}
                    className="btn btn-warning text-white mt-3"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="card mb-4">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center flex-row">
                  <i className="text-warning circle-icon me-2">
                    <AiOutlineInfoCircle size={22} />
                  </i>
                  <h5 className="mb-0 fw-bold">
                    SLA breach percentage of preparation time{" "}
                  </h5>
                </div>
                <Button
                  className="p-1 rounded-circle border-0"
                  style={{ backgroundColor: "#FD7E141A" }}
                  onClick={() => handleEdit(section)}
                >
                  <MdOutlineEdit size={20} color="#1273EE" />
                </Button>
              </div>{" "}
              <div
                className="mt-2 position-relative"
                style={{ width: "12rem" }}
              >
                <span
                  className="position-absolute"
                  style={{ top: 6.5, left: 10 }}
                >
                  <FaRegClock />
                </span>
                <input
                  style={{ borderRadius: 10, paddingInlineStart: 30 }}
                  type="text"
                  name="awaitingTime"
                  placeholder="hh/mm/ss"
                  className="form-control"
                  value={formik.values.awaitingTime}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-end">
          <button type="submit" className="btn btn-success">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
