import React, { useState } from "react";
import { Button, Card, Table, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const ItemTags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: "Margherita Pizza", createdAt: "2025-04-10", status: true },
    { id: 2, name: "Margherita Pizza", createdAt: "2025-04-10", status: true },
    { id: 3, name: "Margherita Pizza", createdAt: "2025-04-10", status: false },
    { id: 4, name: "Margherita Pizza", createdAt: "2025-04-10", status: true },
  ]);

  const toggleStatus = (id) => {
    setTags((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat))
    );
  };

  return (
    <div className="p-4">
      <h4 className="mb-4 text-dark fw-bold">Item Tags</h4>

      <Card className="border rounded" style={{ borderColor: "#0000001A" }}>
        <Card.Body>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-3">
            <h5 className="fw-bold mb-0">Item list</h5>
            <div className="flex gap-2">
              <Button
                variant="dark"
                className="flex items-center py-3 px-4"
                style={{ borderRadius: "15px" }}
              >
                <FiFilter className="me-1" /> Filters
              </Button>
              <Button
                className="py-3 px-4"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                Logs
              </Button>
            </div>
          </div>

          <div
            className="border px-4"
            style={{ borderColor: "#0000001A", borderRadius: "15px" }}
          >
            {/* Custom Grid Header */}
            <div style={{ color: "#5F5E5E" }} className="flex pt-4 px-3 mb-3">
              <div className="col-4">Category Name</div>
              <div className="col-3">Created At</div>
              <div className="col-3">Status</div>
              <div className="col-2 text-center">Action</div>
            </div>

            {/* List Items */}
            {tags.map((cat, index) => (
              <div
                key={cat.id}
                className={`flex flex-row items-center py-2 px-3 bg-white ${
                  index === tags.length - 1 ? "rounded-bottom" : ""
                }`}
                style={{
                  borderBottom: "1px solid #0000001A",
                }}
              >
                <div className="col-12 col-md-4 mb-2 fw-semibold mb-md-0">
                  {cat.name}
                </div>
                <div className="col-12 col-md-3 fw-semibold mb-2 mb-md-0">
                  {cat.createdAt}
                </div>
                <div className="col-12 col-md-3 mb-2 mb-md-0">
                  <span
                    className={`px-2 py-1`}
                    style={{
                      backgroundColor: cat.status ? "#03BC4433" : "#F11F461A",
                      borderRadius: "100px",
                      padding: "0.25rem 0.5rem",
                      color: cat.status ? "#03BC44" : "#F11F46",
                    }}
                  >
                    {cat.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="col-12 col-md-2 flex justify-md-center items-center gap-3">
                  <Button
                    style={{
                      backgroundColor: "#F11F461A",
                      opacity: cat.status ? "0.5" : "1",
                    }}
                    className="rounded-circle p-2 border-0"
                  >
                    <RiDeleteBin6Line color="#F11F46" size={18} />
                  </Button>

                  <Button
                    style={{ backgroundColor: "#0001450D" }}
                    className="rounded-circle p-2 border-0"
                  >
                    <MdOutlineEdit color="#6c63ff" size={18} />
                  </Button>
                  <Form.Check
                    style={{ transform: "scale(1.5)" }}
                    size={32}
                    type="switch"
                    id={`switch-${cat.id}`}
                    checked={cat.status}
                    onChange={() => toggleStatus(cat.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Add Button */}
          <div className="flex justify-end mt-3">
            <Button
              className="px-5 py-2"
              style={{
                backgroundColor: "#1273EE",
                border: "none",
                borderRadius: "14px",
              }}
            >
              Add
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div className="flex justify-end mt-4">
        <Button
          className="rounded-pill px-4"
          style={{ backgroundColor: "#00C853", border: "none" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ItemTags;
