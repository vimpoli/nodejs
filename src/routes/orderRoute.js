import express from "express";
import orderController from "../controllers/orderController.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN, MERCHANT } from "../constants/roles.js";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", roleBasedAuth(ADMIN), orderController.getOrders);
router.get("/user", orderController.getOrdersbyUser);
router.get(
  "/merchant",
  roleBasedAuth(MERCHANT),
  orderController.getOrdersOfMerchant
);
router.get("/:id", roleBasedAuth(ADMIN), orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.post("/:id/payment/khalti", orderController.orderPaymentViaKhalti);
router.post("/:id/payment/stripe", orderController.orderPaymentViaStripe);
router.put("/:id/confirm-payment", orderController.confirmOrderPayment);

export default router;
