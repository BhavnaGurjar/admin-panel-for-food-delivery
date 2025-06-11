import { finalOutcome } from "../../constants/index";
import { SectionRow } from "../../Section";

const Final = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-semibold text-kilamanjaro">{value}</span>
    ) : (
      <span className="text-kilamanjaro opacity-75">N/A</span>
    );

  return (
    <div className="rounded-lg w-[48%] border border-black-10 p-4">
      <h6 className="text-primary border-b border-black-10 font-semibold mb-3">
        Final Order Outcome
      </h6>
      <div className="space-y-2">
        <SectionRow
          label="Order Undelivered?"
          value={renderValue(finalOutcome.orderUndelivered)}
        />
        <SectionRow
          label="Order Delivered?"
          value={renderValue(finalOutcome.orderDelivered)}
        />
      </div>
    </div>
  );
};

export default Final;
