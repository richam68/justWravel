import mongoose from "mongoose";
import { generateBookingReference } from "../utils/generateBookingReference.js";

//Booking Info
const bookingSchema = new mongoose.Schema(
  {
    //Unique booking identifier that is used to identify a booking across systems.
    // It is typically generated at the time of booking and is used for reference in all communications and transactions related to that booking.
    bookingReference: {
      type: String,
      unique: true,
      required: false, // Auto-generated in pre-save hook
      index: true, // making search faster
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "on-hold"],
      default: "pending",
      index: true,
    },

    bookingSource: {
      type: String,
      enum: ["website", "mobile", "agent", "admin"],
      default: "website",
    },

    bookingType: {
      type: String,
      enum: ["package", "hotel", "flight", "bus", "custom"],
      required: true,
    },

    //In case of Custom Trip Details
    customDetails: {
      tripName: String,
      destination: String,
      numberOfDays: Number,
      numberOfNights: Number,
      startDate: Date,
      endDate: Date,

      transportMode: {
        type: String,
        enum: ["flight", "train", "bus", "self"],
      },

      accommodationType: {
        type: String,
        enum: ["hotel", "homestay", "resort"],
      },

      budgetRange: {
        min: Number,
        max: Number,
      },
    },

    //Relations
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    travellers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Traveller",
        required: true,
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: function () {
        return this.bookingType !== "custom";
      },
    },
    //Travel Dates
    departureDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    numberOfDays: Number,
    numberOfNights: Number,

    //Pricing & Payment
    currency: {
      type: String,
      default: "INR",
    },

    priceBreakup: {
      baseFare: Number,
      taxes: Number,
      discount: Number,
      convenienceFee: Number,
      gst: Number,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    amountPaid: {
      type: Number,
      default: 0,
    },

    amountDue: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "partial", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "wallet", "cash"],
    },

    paymentGateway: String,
    transactionId: String,

    //Cancellation & Refund
    cancellation: {
      isCancelled: {
        type: Boolean,
        default: false,
      },
      cancelledAt: Date,
      cancelledBy: {
        type: String,
        enum: ["user", "admin", "vendor"],
      },
      cancellationReason: String,
      refundAmount: Number,
      refundStatus: {
        type: String,
        enum: ["pending", "processed", "failed"],
      },
    },

    //Internal Tracking
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      customerNote: String,
      internalNote: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Indexes (Performance)
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ customerId: 1, createdAt: -1 });
bookingSchema.index({ bookingStatus: 1, paymentStatus: 1 });

//Auto-generate booking reference
// before saving a new booking
bookingSchema.pre("save", function () {
  if (!this.bookingReference) {
    this.bookingReference = generateBookingReference();
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
