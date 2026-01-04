import apiClient from "./client";

export const createBooking = async (payload) => {
  const { data } = await apiClient.post("/user-booking", payload);
  return data.data;
};

export const getBookings = async (params = {}) => {
  const { data } = await apiClient.get("/user-booking", { params });
  return data.data;
};

export const getBookingByReference = async (bookingReference) => {
  const { data } = await apiClient.get(`/user-booking/${bookingReference}`);
  return data.data;
};
