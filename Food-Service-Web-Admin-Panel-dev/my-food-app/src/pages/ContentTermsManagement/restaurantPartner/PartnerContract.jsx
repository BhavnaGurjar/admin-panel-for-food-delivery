import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

const PartnerContract = () => {
  const [sectionType, setSectionType] = useState("paragraph");

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h5 className="mb-0 fw-bold">Partner Contract / New</h5>
        <button
          className="btn text-white py-2 px-4"
          style={{ backgroundColor: "#FF6B35", borderRadius: "8px" }}
        >
          Logs
        </button>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          {/* VEG and Version row */}
          <div className="flex items-center mb-4">
            <div className="dropdown me-4">
              <button
                className="btn btn-outline-success dropdown-toggle flex items-center"
                type="button"
                style={{ borderRadius: "20px", padding: "4px 12px" }}
              >
                <span
                  className="me-1"
                  style={{ color: "#03BC44", fontSize: "18px" }}
                >
                  ●
                </span>
                <span className="me-1">VEG</span>
                <IoChevronDown size={16} />
              </button>
            </div>

            <span className="me-2">Version</span>

            <button
              className="btn me-4"
              style={{
                backgroundColor: "#FFF2EC",
                color: "#FF6B35",
                borderRadius: "20px",
                padding: "4px 12px",
                border: "none",
              }}
            >
              v0.1 (current)
            </button>

            <div className="dropdown ms-auto">
              <button
                className="btn dropdown-toggle flex items-center"
                type="button"
                style={{
                  backgroundColor: "#FFF8E1",
                  color: "#F9A825",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  border: "none",
                }}
              >
                <span className="me-1">📍</span>
                <span className="me-1">khategaon</span>
                <IoChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Commission Details */}
          <div className="mb-4">
            <div className="mb-3">
              <span style={{ color: "#FF6B35" }}>● Commission Details</span>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Platform Commission Rate</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00"
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    style={{ width: "60px" }}
                  >
                    <IoChevronDown size={16} />
                  </button>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  GST on Platform's Commission
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00"
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    style={{ width: "60px" }}
                  >
                    <IoChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Other Taxes & Charges */}
          <div className="mb-4">
            <div className="mb-3">
              <span style={{ color: "#FF6B35" }}>● Other Taxes & Charges</span>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Convenience Fee Rate</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00"
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    style={{ width: "60px" }}
                  >
                    <IoChevronDown size={16} />
                  </button>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  TDS (Tax Deducted at Source)
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00"
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    style={{ width: "60px" }}
                  >
                    <IoChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GST Info */}
          <div className="mb-4">
            <div className="mb-3">
              <span style={{ color: "#FF6B35" }}>● GST Info</span>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">GST charged from customer</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00"
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    style={{ width: "60px" }}
                  >
                    <IoChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center mb-3 p-2"
              style={{
                backgroundColor: "#FF6B35",
                color: "white",
                borderRadius: "4px",
              }}
            >
              <span className="fw-medium">Key Points</span>
              <button
                className="btn btn-light rounded-circle p-0 flex items-center justify-center"
                style={{ width: "24px", height: "24px" }}
              >
                <FiPlus color="#FF6B35" size={16} />
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Heading</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter heading"
              />
            </div>

            <div className="flex mb-3">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sectionType"
                  id="paragraph"
                  checked={sectionType === "paragraph"}
                  onChange={() => setSectionType("paragraph")}
                />
                <label className="form-check-label" htmlFor="paragraph">
                  Paragraph
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sectionType"
                  id="bullet"
                  checked={sectionType === "bullet"}
                  onChange={() => setSectionType("bullet")}
                />
                <label className="form-check-label" htmlFor="bullet">
                  Bullet Points
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Enter description"
              ></textarea>
            </div>

            <div className="text-end">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#FF6B35", borderRadius: "4px" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="text-end">
        <button
          className="btn text-white px-4 py-2"
          style={{ backgroundColor: "#FF6B35", borderRadius: "50px" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PartnerContract;
