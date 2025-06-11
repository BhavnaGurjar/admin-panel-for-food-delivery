import { MdMyLocation } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { PiPathBold } from "react-icons/pi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";


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
export const ticketMeta = [
      {
        id: 'return',
        title: 'Return',
        iconType: 'return',
        responseLabel: 'Call Response'
      },
  
      {
        id: 'drop1',
        title: 'Drop Location',
        iconType: 'drop',
        responseLabel: 'Call Response'
      },
      {
        id: 'drop2',
        title: 'Drop Location',
        iconType: 'drop',
        responseLabel: 'Call Response'
      },
      {
        id: 'pickup',
        title: 'Pickup Location',
        iconType: 'pickup',
        responseLabel: 'Call Response'
      },
      {
        id: 'onTheWay',
        title: 'On the Way',
        iconType: 'onTheWay',
        responseLabel: 'Call Response'
      },
      {
        id: 'incoming',
        title: 'Incoming',
        iconType: 'incoming',
        responseLabel: 'Message'
      }
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