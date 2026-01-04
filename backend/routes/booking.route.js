import express from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByReferenceController,
} from "../controllers/booking.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { createBookingSchema } from "../validations/booking.validation.js";

const router = express.Router();

/* CREATE BOOKING */
router.post("/", validate(createBookingSchema), createBookingController);

/* GET ALL BOOKINGS (Admin) */
router.get("/", getAllBookingsController);

/* GET BOOKING BY REFERENCE */
router.get("/:bookingReference", getBookingByReferenceController);

export default router;
