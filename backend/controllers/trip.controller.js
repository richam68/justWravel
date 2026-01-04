import {
  createTripService,
  getAllTripsService,
  getTripByIdService,
} from "../services/trip.service.js";

export const createTripController = async (req, res, next) => {
  try {
    const trip = await createTripService(req.body);
    res.status(201).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTripsController = async (req, res, next) => {
  try {
    const trips = await getAllTripsService(req.query);
    res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

export const getTripByIdController = async (req, res, next) => {
  try {
    const trip = await getTripByIdService(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};
