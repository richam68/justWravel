import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: null,
  tripId: null,
  travellerIds: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setTripId: (state, action) => {
      state.tripId = action.payload;
    },
    addTravellerId: (state, action) => {
      if (!state.travellerIds.includes(action.payload)) {
        state.travellerIds.push(action.payload);
      }
    },
    clearBookingData: (state) => {
      state.customerId = null;
      state.tripId = null;
      state.travellerIds = [];
    },
  },
});

export const { setCustomerId, setTripId, addTravellerId, clearBookingData } =
  bookingSlice.actions;

export default bookingSlice.reducer;
