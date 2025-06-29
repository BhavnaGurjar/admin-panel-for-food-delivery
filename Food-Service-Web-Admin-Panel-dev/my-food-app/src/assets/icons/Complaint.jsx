import * as React from "react";

function Complaint(props) {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.313 9.891h.008m0-2.087V5.195M8.423 23.42h-2.9c-.336 0-.675-.048-.984-.18-1.007-.432-1.518-1.004-1.755-1.361a.563.563 0 01.03-.658c1.167-1.55 3.872-2.485 5.61-2.485m.004 4.684h2.9c.337 0 .674-.048.984-.18 1.007-.432 1.517-1.004 1.756-1.361a.562.562 0 00-.031-.658c-1.167-1.55-3.871-2.485-5.609-2.485M23.525 7.578c0 2.756-2.333 4.991-5.212 4.991a5.46 5.46 0 01-1.009-.094c-.24-.044-.358-.066-.442-.054-.084.013-.202.075-.438.202-.674.36-1.45.48-2.202.343.286-.352.48-.774.566-1.226.052-.276-.077-.545-.271-.742a4.864 4.864 0 01-1.417-3.42c0-2.757 2.334-4.992 5.213-4.992s5.212 2.235 5.212 4.992zm-12.203 5.726a2.892 2.892 0 01-4 2.669 2.89 2.89 0 01-1.568-3.776 2.89 2.89 0 012.674-1.782 2.892 2.892 0 012.894 2.889z"
        stroke="#F11F46"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Complaint;
