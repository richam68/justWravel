import apiClient from "./client";

export const createCustomer = async (payload) => {
  const { data } = await apiClient.post("/customers", payload);
  return data.data;
};

export const getCustomers = async () => {
  const { data } = await apiClient.get("/customers");
  return data.data;
};

export const getCustomerById = async (id) => {
  const { data } = await apiClient.get(`/customers/${id}`);
  return data.data;
};
