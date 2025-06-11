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
      type: "Online Payment",
      paymentStatus: "Paid",
      amount: "400",
      currentStatus: "xyz",
      timeline: "Order Placed : 14:30 end : 14:32",
      duration: "34 min",
      ticketHandled: "",
      finalStatus: "Undelivered"
  },
  reassignment: {
      name: "Amit Sharma",
      count: "123456789",
      type: "Near City Mall,Mumbai"
  }
};

// delivery penalties
export const deliveryFeeDetails = {
  fee: 50,
  type: "Normal",
  tip: 10,
  payableFee: 10,
  paidStatus: "yes",
  paidTime: "18:00:00",
  paidDate: "2025-02-21"
};
export const penaltyDetails = {
  applied: "yes",
  type: "Unresponsive",
  amount: 10,
  deducted: "Yes",
  deductedDate: "2025-02-21"
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

// onWay
export const orderAcceptanceData = {
  acceptedOnTheWay: null,
  withinSLA: null,
  slaBreach: null,
  timestampStatus: null,
};
export const communicationResponseData = {
  callResponse: null,
};
export const pickupDetailsData = {
  reachedPickupTime: null,
  locationWhenReachedPickup: null,
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
export const assignmentDetailsData = {
  requestSentTime: null,
  assignedPartnerId: null,
  partnerType: null,
  partnerResponse: null,
  responseTime: null,
  autoReassignmentTriggered: null,
  reassignmentCount: null,
  sla50Breached: null,
  slaFullyBreached: null,
  emergencyAssigned: null,
  emergencyRequestTime: null,
  emergencyPartnerId: null,
  emergencyAcceptanceTime: null,
};
export const escalationData = {
  escalatedToDM: null,
  escalationTime: null,
  dmExtendsReassignment: null,
  dmExtensionCount: null,
  finalMessage: null,
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

