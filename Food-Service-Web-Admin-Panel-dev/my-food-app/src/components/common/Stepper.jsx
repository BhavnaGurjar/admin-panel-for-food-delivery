import { Icons } from "../../assets";
const Stepper = ({ steps, currentStep, onStepClick, stepCount }) => {
  return (
    <div className="flex flex-col gap-8 relative">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber <= stepCount;
        console.log (isCompleted);
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={index}
            className="flex items-center gap-2 relative cursor-pointer mt-4"
            onClick={() => onStepClick(stepNumber)}
          >
            <div
              className={`flex justify-center items-center font-medium rounded-full min-w-9 min-h-9 text-xs z-10 ${
                isCompleted
                  ? "bg-primary text-white"
                  : isActive
                  ? "bg-transparent text-primary border-2 border-primary"
                  : "bg-gray-100 text-black border-2 border-gray-300"
              }`}
            >
              {isCompleted ? (
                <Icons.Mark className="text-white" />
              ) : (
                String(stepNumber).padStart(2, "0")
              )}
            </div>
            <div
              className={`text-xs font-medium ${
                isCompleted || isActive
                  ? "text-primary"
                  : "text-[rgba(70,86,104,1)]"
              }`}
            >
              {step.label}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`w-0.5 h-10 absolute left-4 top-10 bottom-10 z-0 ${
                  isCompleted ? "bg-primary" : "bg-gray-400"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Stepper;
