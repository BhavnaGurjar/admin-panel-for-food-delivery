import { IoClose } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import "./style.css";

const CustomModal = ({
  show,
  onClose,
  title,
  icon,
  buttonText,
  onButtonClick,
  children,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered size="md" backdrop="static">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded p-1">
            {icon && icon}
          </div>
          <IoClose
            size={26}
            color={`#717680`}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h6 className="fs-5 fw-semibold">{title}</h6>
        <div>{children}</div>
        <div className="flex gap-3 items-center justify-between mt-3">
          <button
            className="col rounded py-2 fs-7 outline-0 gray-border bg-transparent"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="col rounded py-2 fs-7 outline-0 border-0 bg-danger text-white"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
