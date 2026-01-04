import express from "express";
import {
  createTravellerController,
  getAllTravellersController,
  getTravellerByIdController,
} from "../controllers/traveller.controller.js";

const router = express.Router();

/* CREATE TRAVELLER */
router.post("/", createTravellerController);

/* GET ALL TRAVELLERS */
router.get("/", getAllTravellersController);

/* GET TRAVELLER BY ID */
router.get("/:id", getTravellerByIdController);

export default router;
