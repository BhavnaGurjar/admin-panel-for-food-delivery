import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

const RefundAndPenalty = () => {
  const [refundValues, setRefundValues] = useState({
    returnedToRestaurant: "95%",
    notDeliveredPartner1: "95%",
    notDeliveredPartner2: "95%",
  });

  const [penaltyValues, setPenaltyValues] = useState({
    orderRejected: "-8%",
    autoCancelled: "-12%",
  });

  const handleRefundChange = (field, value) => {
    setRefundValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePenaltyChange = (field, value) => {
    setPenaltyValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="mb-0">Refund & Penalty policies</h4>
        <button
          className="btn text-white py-2 px-4"
          style={{ backgroundColor: "#FF6B35", borderRadius: "8px" }}
        >
          Logs
        </button>
      </div>

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="flex justify-between items-center mb-3">
            <h5 className="mb-0 fw-bold">Refund</h5>
            <button
              className="p-1 rounded-circle border-0"
              style={{ backgroundColor: "#FFF2EC" }}
            >
              <MdOutlineEdit size={20} color="#FF6B35" />
            </button>
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <i className="text-warning circle-icon me-2">
                <AiOutlineInfoCircle size={22} />
              </i>

              <span>Order returned back to restaurant</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={refundValues.returnedToRestaurant}
              onChange={(e) =>
                handleRefundChange("returnedToRestaurant", e.target.value)
              }
              style={{ maxWidth: "160px", borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <i className="text-warning circle-icon me-2">
                <AiOutlineInfoCircle size={22} />
              </i>
              <span>Order not delivered by delivery partner</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={refundValues.notDeliveredPartner1}
              onChange={(e) =>
                handleRefundChange("notDeliveredPartner1", e.target.value)
              }
              style={{ maxWidth: "160px", borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <i className="text-warning circle-icon me-2">
                <AiOutlineInfoCircle size={22} />
              </i>
              <span>Order not delivered by delivery partner</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={refundValues.notDeliveredPartner2}
              onChange={(e) =>
                handleRefundChange("notDeliveredPartner2", e.target.value)
              }
              style={{ maxWidth: "160px", borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="flex justify-between items-center mb-3">
            <h5 className="mb-0 fw-bold">Penalty</h5>
            <button
              className="p-1 rounded-circle border-0"
              style={{ backgroundColor: "#FFF2EC" }}
            >
              <MdOutlineEdit size={20} color="#FF6B35" />
            </button>
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <i className="text-warning circle-icon me-2">
                <AiOutlineInfoCircle size={22} />
              </i>
              <span>Order rejected and not delivered</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={penaltyValues.orderRejected}
              onChange={(e) =>
                handlePenaltyChange("orderRejected", e.target.value)
              }
              style={{ maxWidth: "160px", borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <i className="text-warning circle-icon me-2">
                <AiOutlineInfoCircle size={22} />
              </i>
              <span>
                Order auto cancelled & not delivered (Incoming, Preparing,
                Ready):
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              value={penaltyValues.autoCancelled}
              onChange={(e) =>
                handlePenaltyChange("autoCancelled", e.target.value)
              }
              style={{ maxWidth: "160px", borderRadius: "8px" }}
            />
          </div>
        </div>
      </div>

      <div className="text-end">
        <button
          type="button"
          className="btn text-white py-2 px-4"
          style={{ backgroundColor: "#00C853", borderRadius: "8px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RefundAndPenalty;
