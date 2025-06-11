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
      location: "Near City Mall, Mumbai",
      Instruction: "Extra spicy food"
  },
  restaurant: {
      name: 'Spice Hub',
      contact: "123456789"
  },
  orderAssignment: {
      reassignment: null,
      reassignmentCount: "2",
      contact: "123456789",
      name: null,
      type: null,
  },
  additionalInformation: {
    ticketHandle: null,
    ReasonforCancellation: null,
  },
  order: {
      id: "ORD123456789",
      placedAt: "2024-02-02 14:30:00",
      currentOrderStatus: null,
      paymentStatus: "Paid",
      amount: "400",
      currentStatus: "xyz",
      timeline: "Order Placed : 14:30 end : 14:32",
      duration: "34 min",
      ticketHandled: "",
      finalStatus: "Undelivered"
  },
  orderAmount: {
    orderType: null,
    paymentStatus:null,
    orderAmount:null,
    discountApplied: null,
    discountType: null,
    finalPayAmount: null,
  },
  orderTimeLine: {
    orderTimeline: null,
    orderDiscount:null,
  }
};

export const refundDetails = {
  refundApplied:null,
  refundType:null,
  refundPer:null,
  refundAmount:null,
  refundStatus:null,
  refundDate:null,
};
export const couponsDetails = {
  couponsGenerated:null,
  couponsType:null,
  couponsTimeline:null,
  couponsUsed:null,
  couponsUsage:null,
};

// drop location
export const journeyDetails = {
  orderPickupStatus: null,
  outForDelivery: null,
  dropDistance: null,
  onTheWay: null,
  timestamp: null,
  unresponsive: null,
  orderCancelled: null,
};
export const dropVerification = {
  reachedDrop: null,
  deliveryPartnerLocation: null,
  otpGenerated: null,
  otp: null,
  slaTimer: null,
  withinSla: null,
  slaBreach: null,
  callResponse: null,
  otpVerifiedTime: null,
  otpRegenerated: null,
  otpRegeneratedCount: null,
}; 
export const returnFlow = {
  ticketRaised: null,
  ticketStatus: null,
  backToRestaurant: null,
  reachedReturn: null,
  partnerLocation: null,
  otpGenerated: null,
  returnOtp: null,
  slaTimer: null,
  withinSla: null,
  slaBreach: null,
  callResponse: null,
  returnOtpVerifiedTime: null,
  returnOtpRegenerated: null,
  returnOtpRegeneratedCount: null,
  orderReturned: null,
};

// final
export const finalOutcome = {
  orderUndelivered: null,
  orderDelivered: null,
};
//restaurant preparation
export const restaurantPreparation= {
  acceptedPreparing: null,
  preparationTime: null,
  restaurantPartnerReady: null,
  restaurantPartnerDelayed: null,
};

//deliveryPartnerAssignment
export const deliveryPartnerAssignment= {
  dpAssignment: null,
  dpType: null,
  dpID: null,
  dpContact: null,
  dpReachedPickup: null,
  dpDelayed: null,
  dpLiveLocation: null,
  dpReassigned: null,
};

export const slaOrderCancellationData = {
  slaBreach: null,
  orderCancelled: null,
};
export const orderReadiness = {
  orderReady: null,
  otpGeneratedTime: null,
};
export const otpVerification = {
  otpRegeneratedCounts: null,   
  otpVerifiedTime: null,
  otpVerified: null,
  otpRegenerated: null,
};
export const transitStatus = {
  pickUp: null,   
  ontheWay: null,
  timestamp: null,
};
export const issuesOrderCancel = {
  ticketRaised: null,   
  ticketStatus: null,
  orderCancelled: null,
};

export const orderFinalization = {
  complaintTicketRaised: null,   
  complaintTicketStatus: null,
  orderCancelled: null,
  orderDelivered: null,
};
export const slaCompliance = {
  withinSLA: null,   
  slaTimer: null,
  slaBreach: null,
  callResponse: null,
};
export const locationTracking = {
  reachedDrop: null,   
  liveLocation: null,
};
export const otpVerification2 = {
  otpGenerated: null,   
  otp: null,
  otpVerified: null,
  otpRegeneratedCounts: null,
  otpRegenerated: null,
};

export const orderCompletion = {
  finalStatus: null,   
  time: null,
  Stage: null,
};




export const orderCancellationData = {
  orderCancelled: null,
};

// pickupLocation
export const deliveryPartnerData = {
  reachedPickup: null,
  deliveryPartnerDelayed: null,
  restaurantPartnerMarkedReady: null,
  restaurantPartnerDelayed: null,
};
export const otpVerificationData = {
  otpGeneratedTime: null,
  otp: null,
  otpVerified: null,
  otpVerifiedTime: null,
  otpRegeneratedCounts: null,
};
export const slaTrackingData = {
  withinSLA: null,
  slaBreach: null,
  slaTimer: null,
  callResponse: null,
  orderCancelled: null,
};

// incoming
export const orderPlacement = {
  orderPlaced: null,
  orderStatus: null,
  actionTime: null,
};
export const cancellationWindow = {
  cancellationWindow: null,
  awaitingPeriod: null,
  orderCancelled: null,
};
export const slaTracking = {
  withinSLA: null,
  slaBreach: null,
};

//ticket handle
export const ticketData = [
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

