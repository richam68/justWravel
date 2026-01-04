import express from "express";
import bookingRoute from "./booking.route.js";
import customerRoute from "./customer.route.js";
import tripRoute from "./trip.route.js";
import travellerRoute from "./traveller.route.js";

const router = express.Router();

router.use("/user-booking", bookingRoute);
router.use("/customers", customerRoute);
router.use("/trips", tripRoute);
router.use("/travellers", travellerRoute);

export default router;
