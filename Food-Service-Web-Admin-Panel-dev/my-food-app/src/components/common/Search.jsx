import { Icons } from "../../assets";
import { useState } from "react";

const Search = ({ setSearchTerm }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center rounded-md border border-[rgba(0,0,0,0.2)] relative w-[18.75rem] pl-2 pr-1 focus-within:border-sky-600">
      <Icons.SearchIcon className="text-gray-500 cursor-pointer" />
      <input
        className="pl-2 py-2 w-full text-[0.9rem] outline-none"
        placeholder="Search here..."
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
