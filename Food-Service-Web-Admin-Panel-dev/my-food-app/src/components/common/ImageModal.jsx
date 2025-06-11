import { Icons } from "../../assets";

const ImageModal = ({ show, onHide, imageUrl, heading }) => {
  if (!show) return null;

  return (
    <div
      className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 p-4"
      onClick={onHide}
    >
      <div
        className="relative bg-[rgba(249,250,251,1)] py-4 px-5 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
     <div className="flex justify-between align-center mb-4 ">
   {/* Optional Heading */}
        {heading && (
          <div className="text-lg font-semibold text-gray-800">
            {heading}
          </div>
        )}
        <button
          onClick={onHide}
          className="text-gray-800 hover:text-red-500 text-xl"
        >
          <Icons.Cross2 />
        </button>
     </div>

        {/* Image Container */}
        <div className="w-[23.125rem] h-[23.125rem] overflow-hidden flex items-center justify-center">
 <img
  src={imageUrl}
  alt="Modal"
  className="w-full h-auto rounded object-contain"
/>
</div>
      </div>
    </div>
  );
};

export default ImageModal;
