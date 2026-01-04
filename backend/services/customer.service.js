import Customer from "../models/customer.model.js";

export const createCustomerService = async (data) => {
  const customer = await Customer.create(data);
  return customer;
};

export const getAllCustomersService = async () => {
  return Customer.find().sort({ createdAt: -1 }).populate("address");
};

export const getCustomerByIdService = async (id) => {
  return Customer.findById(id).populate("address");
};
