const HeaderCard = ({ count, heading, icon }) => {
  return (
    <div className="bg-white flex justify-between items-center px-3 py-4 rounded-xl shadow-sm h-32">
      <div className="flex flex-col justify-center items-start gap-2">
        <h2 className="font-satoshi font-bold text-[1.75rem]">{count}</h2>
        <p className="opacity-50 font-satoshi font-medium text-[1rem]">
          {heading}
        </p>
      </div>
      <div>
        <div className="h-14 w-14 rounded-full flex justify-center items-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
