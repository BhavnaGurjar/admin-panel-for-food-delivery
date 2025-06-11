const TicketCard = ({
  icon,
  title,
  time,
  ticketId,
  status,
  message,
  response,
}) => {
  const statusColors = {
    Success: "success",
    Cancelled: "danger",
    "Not Responded": "warning",
  };

  return (
    <div className="ticket-card border rounded-3 shadow-sm my-3 p-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div
            className={`rounded-circle flex justify-center items-center text-${statusColors[status]} bg-${statusColors[status]}-subtle ticket-icon-size`}
          >
            {icon}
          </div>
          <div>
            <h5 className="fw-medium m-0">{title}</h5>
            <p className="fs-7 fw-medium text-secondary mt-0">{time}</p>
          </div>
        </div>
        <button
          className={`btn btn-sm btn-${statusColors[status]} rounded-pill`}
        >
          {status}
        </button>
      </div>
      <p>
        <span className="text-secondary">Ticket Id :</span>
        <span className="fw-semibold">{ticketId}</span>
      </p>
      {message && <p className="text-danger my-1">{message}</p>}
      <p>
        <span className="fw-semibold">Call Response - </span>
        <span className="text-secondary">{response}</span>
      </p>
    </div>
  );
};

export default TicketCard;
