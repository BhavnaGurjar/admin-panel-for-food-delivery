import { Icons } from "../../assets";

const CommonModal = ({
  show,
  onHide,
  icon,
  iconColor = "black",
  heading,
  subheading,
  body,
  primaryButtonText,
  primaryButtonColor,
  secondaryButtonText = "Cancel",
  onPrimaryAction,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[25rem] rounded-lg shadow relative p-6">
        {/* Header with Icon and Close Button */}
        <div className="flex items-start justify-between">
          {/* Icon */}
          {icon && (
            <div
              className="w-12 h-12 rounded-lg border border-black-10 flex items-center justify-center"
              style={{ color: iconColor }}
            >
              {icon}
            </div>
          )}
          {/* Close Button */}
          <button
            onClick={onHide}
            className="text-gray-500 hover:text-gray-800"
          >
            <Icons.Cross2 />
          </button>
        </div>

        {/* Heading and Subheading */}
        <div className="mt-2">
          <h5 className="text-lg font-semibold">{heading}</h5>
          <p className="text-gray-500">{subheading}</p>
        </div>

        {/* Body Content */}
        <div className="mt-4 w-full">{body}</div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onHide}
            className="w-full py-2 px-4 border border-black-10 rounded hover:bg-black-10"
          >
            {secondaryButtonText}
          </button>
          <button
            onClick={onPrimaryAction}
            className={`w-full py-2 px-4 rounded ${primaryButtonColor}`}
            type="submit"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
