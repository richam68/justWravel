import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
    // required: [true, "Street address is required"],
  },
  city: {
    type: String,
    trim: true,
    // required: [true, "City is required"],
  },
  state: {
    type: String,
    trim: true,
    // required: [true, "State is required"],
  },
  postalCode: {
    type: String,
    trim: true,
    // required: [true, "Postal code is required"],
  },
  country: {
    type: String,
    trim: true,
    // required: [true, "Country is required"],
  },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
