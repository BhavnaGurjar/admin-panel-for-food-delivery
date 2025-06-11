 
import { TbTruckReturn } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { PiPathBold } from "react-icons/pi";
import { MdMyLocation} from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import { Icons } from "../../../../assets";

export const callReasons = [
  "User didn't answer",
  "User's phone is switched off",
  "Call disconnected",
  "User refused to talk",
  "Wrong number",
  "Other issue",
];

 export const ticketData = [
    {
      title: "Incoming",
      time: "7:00 AM",
      status: "bg-yellow-100", // for dynamic status color
      icon: <Icons.Bell />,
      calls: [
        { name: "Call1",},
        { name: "Call2", },
      ],
duration: "4:00" 
    },
    {
      title: "Preparing",
      time: "7:00 AM",
      status: "bg-red-100", // for dynamic status color
      icon: <Icons.Utensils />,
      calls: [
        { name: "Call1", },
      ],
    duration: "4:00" 
    },
    {
      title: "Ready",
      time: "7:00 AM",
      status: "bg-green-100", // for dynamic status color
      icon: <Icons.Checked />,
      calls: [
        { name: "Call1", },
      ],
    duration: "4:00" 
    },
    {
      title: "Delivery Partner Complaints",
      time: "7:00 AM",
      status: "bg-red-100", // for dynamic status color
      icon: <Icons.Complaints />,
      calls: [
        { name: "Call1", },
      ],
   duration: "4:00" 
    },
    {
      title: "Resolve Return",
      time: "7:00 AM",
      status: "bg-green-100", // for dynamic status color
      icon: <Icons.Checked />,
      calls: [
        { name: "Call1", },
      ],
    duration: "4:00" 
    },
    {
      title: "Pickedup",
      time: "7:00 AM",
      status: "bg-sky-100", // for dynamic status color
      icon: <Icons.Truck />,
      calls: [
        { name: "Call1", },
      ],
     duration: "4:00" 
    },
  ];

 export const tickets = [
    {
      icon: <TbTruckReturn size={22} />,
      title: "Return",
      time: "7.00 AM",
      ticketId: "12345",
      status: "Success",
      message: "OTP Verification Pending",
      response: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      icon: <MdMyLocation size={22} />,
      title: "Drop Location",
      time: "7.00 AM",
      ticketId: "12349",
      status: "Cancelled",
      message: "OTP Verification Pending",
      response: "Drop Order Successfully",
    },
    {
      icon: <LuTruck size={22} />,
      title: "Pickup Location",
      time: "7.00 AM",
      ticketId: "12347",
      status: "Not Responded",
      message: "OTP Verification Pending",
      response: "OTP Verified Successfully",
    },
    {
      icon: <RiCustomerServiceLine size={22} />,
      title: "Customer Complaint",
      time: "7.00 AM",
      ticketId: "12349",
      status: "Success",
      message: "Customer Unresponsive",
      response: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      icon: <PiPathBold size={22} />,
      title: "On the Way",
      time: "7.00 AM",
      ticketId: "12348",
      status: "Success",
      message: "Unresponsive Partner",
      response: "Call Received By User",
    },
    {
      icon: <FaRegBell size={22} />,
      title: "Incoming",
      time: "7.00 AM",
      ticketId: "12347",
      status: "Not Responded",
      message: "Emergency Partner Unavailable",
      response: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  export const orderTableData = [
      {
        orderId: "4556",
        customer: "Ritesh...",
        restaurant: "Ritesh...",
        curStatus: "New",
        orderTime: "5.00 PM",
        timeliness: "On time",
        amount: "₹500",
        payment: "Paid",
        deliveryPartner: "Ritesh...",
        finalStatus: "Delivered",
      },
      {
        orderId: "4556",
        customer: "Ritesh...",
        restaurant: "Ritesh...",
        curStatus: "In Preparation",
        orderTime: "5.00 PM",
        timeliness: "Delayed",
        amount: "₹500",
        payment: "Pending",
        deliveryPartner: "Ritesh...",
        finalStatus: "Undelivered",
      },
      {
        orderId: "4556",
        customer: "Ritesh...",
        restaurant: "Ritesh...",
        curStatus: "New",
        orderTime: "5.00 PM",
        timeliness: "On time",
        amount: "₹500",
        payment: "Paid",
        deliveryPartner: "Ritesh...",
        finalStatus: "Delivered",
      },
      {
        orderId: "4556",
        customer: "Ritesh...",
        restaurant: "Ritesh...",
        curStatus: "Ready Pickup",
        orderTime: "5.00 PM",
        timeliness: "SLA Breached",
        amount: "₹500",
        payment: "Pending",
        deliveryPartner: "Ritesh...",
        finalStatus: "Undelivered",
      },
    ];
    export const stages = [
        {
          name: "Incoming",
          icon: <Icons.Bell />,
          color: "bg-yellow-100",
          total: 2,
          subStages: [
            { name: "Awating", count: 2 },
            { name: "SLA breach", count: 2 },
          ],
        },
        {
          name: "Preparing",
          icon: <Icons.Utensils />,
          color: "bg-red-100",
          total: 10,
          subStages: [
            { name: "Accepted", count: 10 },
            { name: "SLA breach", count: 10 },
          ],
        },
        {
          name: "Ready",
          icon: <Icons.Checked />,
          color: "bg-green-100",
          total: 1,
          subStages: [
            { name: "Order Ready", count: 1 },
            {
              name: "OTP Verification",
              subStages: [
                { name: "Within SLA", count: 0 },
                { name: "SLA breach", count: 0 },
              ],
            },
          ],
        },
        {
          name: "Pickedup",
          icon: <Icons.Truck />,
          color: "bg-sky-100",
          total: 12,
          subStages: [
            { name: "On the Way", count: 1 },
            { name: "Reached drop", count: 1 },
           
                {
                  name: "Return",
                  subStages: [
                    { name: "Within SLA", count: 1 },
                    { name: "SLA breach", count: 1 },
                
              ],
            },
          ],
        },
        {
          name: "Final Status",
          icon: <Icons.Checked />,
          color: "bg-green-100",
          total: 0,
          subStages: [
            { name: "Rejected", count: 0 },
            {
              name: "Auto Cancelled",
              subStages: [
                { name: "Incoming", count: 0 },
                { name: "Preparing", count: 0 },
                { name: "Ready", count: 0 },
              ],
            },
            { name: "Not Delivered", count: 0 },
          ],
        },
      ];

      export  const columns = [
          { title: "Order Id", dataIndex: "orderId", type: "text" },
          { title: "Customer", dataIndex: "customer", type: "text" },
          { title: "Restaurant", dataIndex: "restaurant", type: "text" },
          {
            title: "Cur. Status",
            dataIndex: "curStatus",
            type: "custom",
            render: (value) => (
              <div
                className={`rounded flex items-center  justify-center  font-medium text-[0.75rem] ${value === "New"
                  ? "bg-[rgba(3,188,68,0.1)] text-[rgba(3,188,68,1)] border-[0.063rem] border-[rgba(3,188,68,1)] w-[3.625rem] h-[1.625rem]"
                  : value === "In Preparation"
                    ? "bg-[rgba(255,253,211,1)] text-[rgba(250,173,20,1)] border-[0.063rem] border-[rgba(250,173,20,1)] w-2[6.375rem] h-[1.625rem]"
                    : value === "Ready Pickup"
                      ? "bg-[rgba(253,126,20,0.1)] text-[rgba(253,126,20,1)] border-[0.063rem] border-[rgba(253,126,20,1)] w-[6.125rem] h-[1.625rem]"
                      : ""
                  }`}
              >
                {value}
              </div>
            ),
          },
          { title: "Order Time", dataIndex: "orderTime", type: "text" },
          {
            title: "Timeliness",
            dataIndex: "timeliness",
            type: "custom",
            render: (value) => (
              <div
                className={`rounded text-center px-2 py-1 font-medium text-xs ${value === "On time"
                  ? "bg-[rgba(3,188,68,0.1)] text-[rgba(3,188,68,1)] border-[0.063rem] border-[rgba(3,188,68,1)] w-[4.188rem] h-[1.625rem]"
                  : value === "Delayed"
                    ? "bg-[rgba(255,253,211,1)] text-[rgba(250,173,20,1)] border-[0.063rem] border-[rgba(250,173,20,1)] w-[4.125rem] h-[1.625rem]"
                    : value === "SLA Breached"
                      ? "bg-[rgba(255,77,79,0.1)] text-[rgba(255,77,79,1)] border-[0.063rem] border-[rgba(255,77,79,1)] w-[6.188rem] h-[1.625rem]"
                      : ""
                  }`}
              >
                {value}
              </div>
            ),
          },
          { title: "Amount", dataIndex: "amount", type: "text" },
          { title: "Delivery Part.", dataIndex: "deliveryPartner", type: "text" },
          {
            title: "Final Status",
            dataIndex: "finalStatus",
            type: "custom",
            render: (value) => (
              <div
                className={`rounded text-center px-2 py-1 font-medium text-xs ${value === "Delivered"
                  ? "bg-[rgba(3,188,68,0.1)] text-[rgba(3,188,68,1)] border-[rgba(3,188,68,1)] w-[4.563rem] border-[0.063rem] h-[1.625rem]"
                  : "bg-[rgba(255,77,79,0.1)] text-[rgba(255,77,79,1)] border-[0.063rem] border-[rgba(255,77,79,1)] w-[5.563rem] h-[1.625rem]"
                  }`}
              >
                {value}
              </div>
            ),
          },
          {
            title: "Action",
            dataIndex: "action",
            type: "custom",
            render: () => (
              <button className="flex justify-center items-center p-1 border border-transparent hover:border-[rgba(209,213,219,1)] hover:bg-[rgba(243,244,246,1)] rounded-md w-16">
                <Icons.Eye />
                <span className="pl-1"> View</span>
              </button>
            ),
          },
        ];