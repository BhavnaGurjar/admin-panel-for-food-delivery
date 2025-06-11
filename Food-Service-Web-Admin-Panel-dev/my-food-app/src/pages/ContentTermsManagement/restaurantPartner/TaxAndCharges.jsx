import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import {
  useAddTaxAndCommissionsMutation,
  useGetTaxAndCommissionsQuery,
  useUpdateTaxAndCommissionsMutation,
} from "../../../apis/contentAndTerms";
import * as Yup from "yup";

const taxAndChargesSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  listOfValues: Yup.array().min(1, "At least one value is required"),
});

const TaxAndCharges = () => {
  const { data: taxAndCommissionsData, refetch } =
    useGetTaxAndCommissionsQuery();
  const [updateTaxAndCommissions, { isLoading: isUpdating }] =
    useUpdateTaxAndCommissionsMutation();
  const [addTaxAndCommissions, { isLoading: isAdding }] =
    useAddTaxAndCommissionsMutation();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const editFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      listOfValues: [],
      newValue: "",
    },
    validationSchema: taxAndChargesSchema,
    onSubmit: async (formData) => {
      try {
        const { newValue, ...dataToSave } = formData;
        const payload = {
          body: dataToSave,
          id: activeSection.id,
        };
        await updateTaxAndCommissions(payload).unwrap();
        setShowEditModal(false);
        refetch();
      } catch (error) {
        console.error("Failed to update:", error);
      }
    },
  });

  const addFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      listOfValues: [],
      newValue: "",
    },
    validationSchema: taxAndChargesSchema,
    onSubmit: async (formData) => {
      try {
        const { newValue, ...dataToSave } = formData;
        await addTaxAndCommissions(dataToSave).unwrap();
        setShowAddModal(false);
        refetch();
        addFormik.resetForm();
      } catch (error) {
        console.error("Failed to add:", error);
      }
    },
  });

  const handleEditClick = (section) => {
    setActiveSection(section);
    editFormik.setValues({
      name: section.name || "",
      description: section.description || "",
      listOfValues: section.listOfValues || [],
      newValue: "",
    });
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    addFormik.resetForm();
    setShowAddModal(true);
  };

  const handleAddValue = (formik) => {
    const val = formik.values.newValue.trim();
    if (val) {
      formik.setFieldValue("listOfValues", [
        ...formik.values.listOfValues,
        val,
      ]);
      formik.setFieldValue("newValue", "");
    }
  };

  const handleRemoveValue = (formik, index) => {
    const updated = formik.values.listOfValues.filter((_, i) => i !== index);
    formik.setFieldValue("listOfValues", updated);
  };

  // Render value tags
  const renderValueTags = (formik, handleRemove) => (
    <div className="flex flex-wrap gap-2">
      {formik.values.listOfValues.map((val, idx) => (
        <div
          key={idx}
          className="px-3 py-1 rounded flex items-center"
          style={{
            backgroundColor: "#FFE8D9",
            color: "#000",
            fontWeight: 500,
          }}
        >
          <span>{val}</span>
          <RxCross2
            size={16}
            className="ms-2 cursor-pointer"
            onClick={() => handleRemove(formik, idx)}
          />
        </div>
      ))}
    </div>
  );

  // Render form fields (reused for both add and edit forms)
  const renderFormFields = (formik, isEdit = false) => (
    <Form onSubmit={formik.handleSubmit}>
      {/* Section Name */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter name"
          className={`form-control border rounded ${
            formik.touched.name && formik.errors.name ? "is-invalid" : ""
          }`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="invalid-feedback">{formik.errors.name}</div>
        )}
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          placeholder="Enter description"
          className={`form-control border rounded ${
            formik.touched.description && formik.errors.description
              ? "is-invalid"
              : ""
          }`}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="invalid-feedback">{formik.errors.description}</div>
        )}
      </Form.Group>

      {/* List of Values */}
      <Form.Group>
        <Form.Label className="fw-semibold">List of Values</Form.Label>
        <div className="flex mb-3">
          <Form.Control
            placeholder="Enter Value"
            name="newValue"
            className="border rounded me-2"
            value={formik.values.newValue}
            onChange={formik.handleChange}
          />
          <Button
            type="button"
            className="flex items-center gap-1 px-3"
            style={{
              backgroundColor: "#00003C",
              border: "none",
              height: "38px",
            }}
            onClick={() => handleAddValue(formik)}
          >
            <FiPlusCircle size={18} />
            <span style={{ fontWeight: 500, fontSize: "14px" }}>Add</span>
          </Button>
        </div>

        {renderValueTags(formik, handleRemoveValue)}

        {formik.touched.listOfValues && formik.errors.listOfValues && (
          <div className="text-danger mt-2">{formik.errors.listOfValues}</div>
        )}
      </Form.Group>
    </Form>
  );

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="mb-0 text-dark fw-bold">Tax, Commission & Charges</h4>
        <Button
          onClick={handleAddClick}
          variant="warning"
          className="rounded-pill flex items-center"
        >
          <FiPlusCircle className="me-2" />
          Add Section
        </Button>
      </div>

      {/* Sections */}
      <Row className="g-4">
        {taxAndCommissionsData?.data?.map((section) => (
          <Col md={6} key={section.id}>
            <Card className="border shadow-sm">
              <Card.Body>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span
                      className="bg-light rounded-circle flex items-center justify-center me-2"
                      style={{ width: "24px", height: "24px" }}
                    >
                      <IoMdInformationCircleOutline color="#1273EE" size={22} />
                    </span>
                    <h6 className="mb-0 text-muted">{section.name}</h6>
                  </div>
                  <Button
                    className="p-1 rounded-circle border-0"
                    style={{ backgroundColor: "#FD7E141A" }}
                    onClick={() => handleEditClick(section)}
                  >
                    <MdOutlineEdit size={20} color="#1273EE" />
                  </Button>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted">
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    disabled
                    value={section.description}
                    className="border"
                    style={{ resize: "none", overflowY: "auto" }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="small text-muted">
                    List of Values
                  </Form.Label>
                  <Form.Select disabled className="border">
                    {section.listOfValues?.map((val, idx) => (
                      <option key={idx}>{val}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Next Button */}
      <div className="flex justify-end mt-4">
        <Button variant="success" className="rounded-pill px-4">
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Edit {activeSection?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{renderFormFields(editFormik, true)}</Modal.Body>

        <Modal.Footer className="border-0">
          <div className="flex w-100 gap-2">
            <Button
              variant="light"
              className="border w-50 py-3"
              onClick={() => setShowEditModal(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={editFormik.handleSubmit}
              style={{ backgroundColor: "#1273EE", border: "none" }}
              className="w-50 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Add Tax & Charges</Modal.Title>
        </Modal.Header>

        <Modal.Body>{renderFormFields(addFormik)}</Modal.Body>

        <Modal.Footer className="border-0">
          <div className="flex w-100 gap-2">
            <Button
              variant="light"
              className="border w-50 py-3"
              onClick={() => setShowAddModal(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={addFormik.handleSubmit}
              style={{ backgroundColor: "#1273EE", border: "none" }}
              className="w-50 text-white"
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaxAndCharges;
