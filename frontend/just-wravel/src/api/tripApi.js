import apiClient from "./client";

export const createTrip = async (payload) => {
  const { data } = await apiClient.post("/trips", payload);
  return data.data;
};

export const getTrips = async (params = {}) => {
  const { data } = await apiClient.get("/trips", { params });
  return data.data;
};

export const getTripById = async (id) => {
  const { data } = await apiClient.get(`/trips/${id}`);
  return data.data;
};
