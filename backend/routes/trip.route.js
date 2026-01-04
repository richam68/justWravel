import express from "express";
import {
  createTripController,
  getAllTripsController,
  getTripByIdController,
} from "../controllers/trip.controller.js";

const router = express.Router();

/* CREATE TRIP */
router.post("/", createTripController);

/* GET ALL TRIPS */
router.get("/", getAllTripsController);

/* GET TRIP BY ID */
router.get("/:id", getTripByIdController);

export default router;
