import { orderCompletion } from "../../constants";

const Final = () => {
  const renderValue = (value) =>
    value ? (
      <span className="font-medium text-[0.938rem]">{value}</span>
    ) : (
      <span className="text-[rgba(34,13,3,1)] text-[0.938rem]">N/A</span>
    );

  return (
    <div className="lg:w-1/2 md:w-9/12 border border-black-10 rounded-md mx-2 my-3">
      <div className="p-2">
        <div className="tabs-row">
          <h6 className=" font-medium pb-1">
            Order Completion Status
          </h6>
        </div>
        <DataRow
          label="Final Status"
          value={renderValue(orderCompletion.finalStatus)}
        />
        <DataRow label="Time" value={renderValue(orderCompletion.time)} />
        <DataRow label="Stage" value={renderValue(orderCompletion.stage)} />
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex items-center pt-1">
    <p className="p-0 mb-0 pr-1 text-[rgba(95,94,94,1)] text-[0.938rem]">{label} :</p>
    <span className="p-0 mb-0">{value}</span>
  </div>
);

export default Final;
