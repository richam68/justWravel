import Trip from "../models/trip.model.js";

export const createTripService = async (data) => {
  const trip = await Trip.create(data);
  return trip;
};

export const getAllTripsService = async (query) => {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.tripType) filter.tripType = query.tripType;
  if (query.city) filter["destination.city"] = query.city;

  return Trip.find(filter).sort({ createdAt: -1 });
};

export const getTripByIdService = async (id) => {
  return Trip.findById(id);
};
