import {
  createTravellerService,
  getAllTravellersService,
  getTravellerByIdService,
} from "../services/traveller.service.js";

export const createTravellerController = async (req, res, next) => {
  try {
    const traveller = await createTravellerService(req.body);
    res.status(201).json({
      success: true,
      data: traveller,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTravellersController = async (req, res, next) => {
  try {
    const travellers = await getAllTravellersService(req.query);
    res.status(200).json({
      success: true,
      data: travellers,
    });
  } catch (error) {
    next(error);
  }
};

export const getTravellerByIdController = async (req, res, next) => {
  try {
    const traveller = await getTravellerByIdService(req.params.id);

    if (!traveller) {
      return res.status(404).json({
        success: false,
        message: "Traveller not found",
      });
    }

    res.status(200).json({
      success: true,
      data: traveller,
    });
  } catch (error) {
    next(error);
  }
};
