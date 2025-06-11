import * as React from "react";

function CircleAlertOutline(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.668 20.001h2.667v2.667h-2.667v-2.667zm0-10.666h2.667v8h-2.667v-8zm1.333-6.667c-7.373 0-13.333 6-13.333 13.333A13.333 13.333 0 1016.001 2.668zm0 24a10.667 10.667 0 110-21.333 10.667 10.667 0 010 21.333z"
        fill="#F69B0E"
      />
    </svg>
  );
}

export default CircleAlertOutline;
