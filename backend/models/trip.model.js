import mongoose from "mongoose";

// Itinerary Subdocument Schema
// Each itinerary entry represents a day's plan in the trip
// No separate model is created for itinerary since it's embedded within Trip
const itinerarySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
  },
  { _id: false }
);

// Trip Schema: predefined travel packages or custom trips
//MASTER DATA
const tripSchema = new mongoose.Schema({
  //Core Trip Info
  //TravelName: Manali Adventure
  tripName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  tripType: {
    type: String,
    enum: ["package", "custom"],
    default: "package",
  },

  destination: {
    country: String,
    state: String,
    city: String,
  },

  duration: {
    days: Number,
    nights: Number,
  },
  startLocation: String,
  //Travel Details
  transportMode: {
    type: String,
    enum: ["flight", "train", "bus", "self"],
  },

  accommodationType: {
    type: String,
    enum: ["hotel", "homestay", "resort"],
  },

  //each day's plan
  itinerary: [itinerarySchema],

  //Pricing Details with clear breakdown
  pricing: {
    basePrice: {
      type: Number,
      required: true,
    },
    tax: Number,
    gst: Number,
    discount: Number,
    finalPrice: {
      type: Number,
      required: true,
    },
  },

  currency: {
    type: String,
    default: "INR",
  },

  //Availability
  availableFrom: Date,
  availableTill: Date,

  maxCapacity: Number,
  availableSeats: Number,

  //Status & Control
  //for admin to manage trip visibility
  status: {
    type: String,
    enum: ["draft", "active", "inactive", "expired"],
    default: "draft",
    index: true,
  },

  //Indicates if the trip was generated via custom trip booking
  isCustomGenerated: {
    type: Boolean,
    default: false,
  },
});

/* =========================
   Indexes
========================= */
tripSchema.index({ tripName: 1 });
tripSchema.index({ status: 1 });
tripSchema.index({ "destination.city": 1 });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
