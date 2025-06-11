import { Icons } from "../../assets"; 

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col gap-5 relative font-satoshi">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-2 relative cursor-pointer"
        >
          <div
            className={`flex justify-center items-center rounded-full w-[35px] h-[35px] text-xs z-10 ${
              currentStep > index + 1
                ? "bg-primary text-white"
                : currentStep === index + 1
                ? "bg-transparent text-primary border-2 border-primary"
                : "bg-gray-100 text-secondary border-2 border-gray-300"
            }`}
          >
            {currentStep > index + 1 ? (
              <Icons.Mark className="text-white" />
            ) : (
              String(index + 1).padStart(2, "0")
            )}
          </div>
          <div
            className={`text-xs ${
              currentStep >= index + 1 ? "text-primary" : "text-gray-500"
            }`}
          >
            {step.label}
          </div>
          {/* Line between steps */}
          {index !== steps.length - 1 && (
            <div
              className={`w-0.5 h-[35px] absolute left-4 top-[38px] z-0 ${
                currentStep > index + 1 ? "bg-primary" : "bg-gray-400"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;