// order details
export const orderData = {
  orderId: 'ORD12345678',
  date: '2024-02-02',
  time: '14:30:00',
  customer: {
      name: 'Amit Sharma',
      contact: '123456789',
  },
  restaurant: {
      name: 'Balaji Restro',
      contact: '123456789',
  }
};

// otp
export const otpDetails = {
otpAttempts: [
  { attempt: 1, time: "3:00", otp: "1234", verified: "YES" },
  { attempt: 2, time: "3:00", otp: "5678", verified: "NO" },
]
};

// basic info
export const basicInfoData = {
  customer: {
      name: "Amit Sharma",
      contact: "123456789",
      location: "Near City Mall, Mumbai"
  },
  restaurant: {
      name: null,
      contact: "123456789"
  },
  delivery: {
      name: "Ram",
      contact: "123456789",
      vehicleType: "Petrol",
      fee: "00"
  },
  cancellation: {
      reason: "xyz"
  },
  order: {
      id: "ORD123456789",
      placedAt: "2024-02-02 14:30:00",
      type: null,
      paymentStatus: "Paid",
      amount: "400",
      applied: null,
      discountType: null,
      duration: "34 min",
      finalAmount: null,
      finalStatus: "Undelivered",
      timeLine: null,
  },
  specialIntruction: {
      intruction: null,
      ticketHandled: null,
  },
  reassignmentDetails: {
  reassign: 50,
  reassignmentType: "Normal",
  reassignmentCount: 10,
}
};

// delivery penalties
export const refunds = {
  initiated: null,
  type: null,
  percentage: null,
  assignedManager: null,
  refundStatus: null,
   refundDate: null,
  
};
export const penaltyDetails = {
  applied: null,
  type: null,
  amount: null,
  deducted: null,
  deductedDate: null,
  percentage: null,
};
export const orderStatus = {
  status: 'Accepted',
  time: null,
  orderCancelled: null,
};
export const serviceLevel = {
  preparationTime: null,
  breach: null,
  time: null,
  timeLeft: null,
  totalTime: null,
};
export const callAttempts = {
  response1: null,
  response2: null,
};
export const orderCompletion = {
  finalStatus: null,
  time: null,
  stage: null,
};
export const progress = {
  pickUp: null,
  reachedDrop: null,
};
export const ticket = {
  raised: null,
  drop: null,
 };
export const finalstatus  = {
  delivered: null,
  orderCancel: null,
};
export const preparationDetails = {
  time: null,
  timeLeft: null,
  markedready: null,
 
};
export const slaCompliance  = {
  breach: null,
  timer: null,
};
export const orderStatus2 = {
  callResponse: null,
  orderCancelled: null,
};
export const orderReadiness = {
  markedReady: null,
  resDelayed: null,
};
export const deliveryPartnerArrival = {
  arrival: null,
  delayed: null,
};
export const otpProcess = {
  generated: null,
  time: null,
  otp: null,
  verified: null,
  verifiedTime: null,
  verifiedDelay: null,
};
export const slaCompliance2  = {
  breach: null,
  time: null,
};
export const orderStatus3 = {
  callResponse: null,
  orderCancelled: null,
};

//ticket handle
export const ticketData = [
  {
    metaId: 'return',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'pending',
    description: 'OTP Verification Pending',
    responseMessage: 'OTP Verification Successfully'
  },
  {
    metaId: 'restaurant',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'accepted',
    description: 'Reached Pickup Location',
    responseMessage: 'Lorem ipsum dolor sit amet consectetur.'
  },
  {
    metaId: 'drop1',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'accepted',
    description: 'OTP Verification Pending',
    responseMessage: 'Drop Order Successfully'
  },
  {
    metaId: 'drop2',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'success',
    description: 'Unresponsive Partner',
    responseMessage: 'Drop Order Successfully'
  },
  {
    metaId: 'pickup',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'success',
    description: 'OTP Verification Pending',
    responseMessage: 'OTP Verification Successfully'
  },
  {
    metaId: 'customer',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'accepted',
    description: 'Customer Unresponsive',
    responseMessage: 'Lorem ipsum dolor sit.'
  },
  {
    metaId: 'onTheWay',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'success',
    description: 'Unresponsive Partner',
    responseMessage: 'Call received by user'
  },
  {
    metaId: 'incoming',
    time: '7.00 AM',
    ticketId: '123450',
    status: 'rejected',
    description: 'Emergency Partner Unavailable',
    responseMessage: 'Lorem ipsum dolor sit amet consectetur.'
  }
];

