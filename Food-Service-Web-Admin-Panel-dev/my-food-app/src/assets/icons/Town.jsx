import * as React from "react";

function Town(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={3}
        width={28}
        height={26}
      >
        <path
          d="M26.694 14.668v13.333H5.36V14.668"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.895 9.185c-1.02 2.64.947 5.482 3.779 5.482 2.209 0 4.012-1.791 4.012-4a4 4 0 004 4h.679a4 4 0 004-4c0 2.209 1.804 4 4.013 4 2.832 0 4.8-2.844 3.78-5.486L26.156 4H5.896L3.896 9.185z"
          fill="#555"
          stroke="#fff"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#a)">
        <path d="M0 0h32v32H0V0z" fill="#4739D8" />
      </g>
    </svg>
  );
}

export default Town;
