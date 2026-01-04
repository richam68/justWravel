import mongoose from "mongoose";

// Traveller Schema: individual travellers associated with a booking
const travellerSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false, // Made optional so travellers can be created before booking
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: Date,
    nationality: String,

    passportNumber: String,
    passportExpiry: Date,
    visaStatus: String,

    mealPreference: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "jain", "kosher", "halal"],
      default: "any",
    },

    seatPreference: {
      type: String,
      enum: ["window", "aisle", "middle", "any"],
      default: "any",
    },

    specialAssistance: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Traveller = mongoose.model("Traveller", travellerSchema);
export default Traveller;
