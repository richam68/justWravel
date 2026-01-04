import Booking from "../models/booking.model.js";

export const createBookingService = async (data) => {
  const booking = await Booking.create(data);
  return booking;
};

export const getAllBookingsService = async (query) => {
  const filter = {};

  if (query.bookingType) filter.bookingType = query.bookingType;
  if (query.bookingStatus) filter.bookingStatus = query.bookingStatus;

  return Booking.find(filter)
    .sort({ createdAt: -1 })
    .populate("customerId")
    .populate("travellers")
    .populate("tripId");
};

export const getBookingByReferenceService = async (bookingReference) => {
  return Booking.findOne({ bookingReference })
    .populate("customerId")
    .populate("travellers")
    .populate("tripId");
};
