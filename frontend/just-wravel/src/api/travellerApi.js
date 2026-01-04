import apiClient from "./client";

export const createTraveller = async (payload) => {
  const { data } = await apiClient.post("/travellers", payload);
  return data.data;
};

export const getTravellers = async (params = {}) => {
  const { data } = await apiClient.get("/travellers", { params });
  return data.data;
};

export const getTravellerById = async (id) => {
  const { data } = await apiClient.get(`/travellers/${id}`);
  return data.data;
};
