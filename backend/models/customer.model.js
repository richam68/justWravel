import mongoose from "mongoose";
import validator from "validator";

// Customer Schema: person who books & pays for tickets: Booker
const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: { validator: validator.isEmail, message: "Invalid email" },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    //using address schema reference
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
