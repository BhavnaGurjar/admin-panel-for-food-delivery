import * as React from "react";

function InReview(props) {
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
        d="M16 12a4 4 0 110 8 4 4 0 010-8zm0-6c6.666 0 12.36 4.147 14.666 10-2.306 5.853-8 10-14.666 10-6.667 0-12.36-4.147-14.667-10C3.64 10.147 9.333 6 16 6zM4.24 16a13.095 13.095 0 0023.52 0 13.095 13.095 0 00-23.52 0z"
        fill="#228B22"
      />
    </svg>
  );
}

export default InReview;
