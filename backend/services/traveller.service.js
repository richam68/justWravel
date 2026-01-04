import Traveller from "../models/traveller.model.js";

export const createTravellerService = async (data) => {
  const traveller = await Traveller.create(data);
  return traveller;
};

export const getAllTravellersService = async (query) => {
  const filter = {};

  if (query.bookingId) filter.bookingId = query.bookingId;

  return Traveller.find(filter).sort({ createdAt: -1 });
};

export const getTravellerByIdService = async (id) => {
  return Traveller.findById(id);
};
