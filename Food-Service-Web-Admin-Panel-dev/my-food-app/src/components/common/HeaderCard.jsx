const HeaderCard = ({ count, heading, icon }) => {
  return (
    <div className="bg-white px-3 py-4 rounded-xl shadow-sm h-32">
      <div className="flex flex-col">
      <div className="flex justify-between">
          <h2 className="font-poppins font-semibold text-[1.75rem]">{count}</h2>
         <div className="h-14 w-14 rounded-full flex justify-center items-center">
          {icon}
        </div>
      </div>
        <p className="opacity-50 font-poppins text-[0.95rem]">
          {heading}
        </p>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default HeaderCard;
