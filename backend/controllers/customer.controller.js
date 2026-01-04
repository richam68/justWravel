import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
} from "../services/customer.service.js";

export const createCustomerController = async (req, res, next) => {
  try {
    const customer = await createCustomerService(req.body);
    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCustomersController = async (req, res, next) => {
  try {
    const customers = await getAllCustomersService();
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerByIdController = async (req, res, next) => {
  try {
    const customer = await getCustomerByIdService(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
