import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

router.post("/", auth, orderController.createOrder);
router.get("/", orderController.getOrders);
router.delete("/:id", auth, roleBasedAuth(ADMIN), orderController.deleteOrder);

export default router;