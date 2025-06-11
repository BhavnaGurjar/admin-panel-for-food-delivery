import React from "react";

const Hearder = ({ strokeColor = "black" }) => {
  return (
    <div>
      <svg
        width="32"
        height="32"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 25.5H28.5M7.5 18H28.5M16.5 10.5H28.5"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Hearder;
