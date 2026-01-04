import {
  createBookingService,
  getAllBookingsService,
  getBookingByReferenceService,
} from "../services/booking.service.js";

export const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.body);
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsController = async (req, res, next) => {
  try {
    const bookings = await getAllBookingsService(req.query);
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingByReferenceController = async (req, res, next) => {
  try {
    const booking = await getBookingByReferenceService(
      req.params.bookingReference
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
