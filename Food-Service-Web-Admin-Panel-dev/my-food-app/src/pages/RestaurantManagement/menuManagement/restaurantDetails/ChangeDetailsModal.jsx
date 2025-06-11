import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const ChangeDetailsModal = ({ showModal, setShowModal, selectedCard }) => {
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    // Initialize the selectedFields state with the first field when the modal opens
    if (selectedCard && selectedCard.changes.length > 0) {
      setSelectedFields([selectedCard.changes[0].field]);
    } else {
      setSelectedFields([]);
    }
  }, [selectedCard]);

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field) // Deselect
        : [...prev, field] // Select
    );
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Changes ({selectedCard?.changes.length || 0})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCard && (
          <>
            <Table className="table-borderless align-middle">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Old</th>
                  <th>New</th>
                </tr>
              </thead>
              <tbody>
                {selectedCard.changes.map((change, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        label={change.field}
                        onChange={() => handleCheckboxChange(change.field)}
                        checked={selectedFields.includes(change.field)}
                      />
                    </td>
                    <td>{selectedFields.includes(change.field) && change.oldValue}</td>
                    <td>{selectedFields.includes(change.field) && change.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger">Reject</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeDetailsModal;
