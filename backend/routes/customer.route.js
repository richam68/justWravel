import express from "express";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
} from "../controllers/customer.controller.js";

const router = express.Router();

/* CREATE CUSTOMER */
router.post("/", createCustomerController);

/* GET ALL CUSTOMERS */
router.get("/", getAllCustomersController);

/* GET CUSTOMER BY ID */
router.get("/:id", getCustomerByIdController);

export default router;
