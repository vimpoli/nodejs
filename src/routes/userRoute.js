import express from "express";
import userController from "../controllers/userController.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

router.post("/", roleBasedAuth(ADMIN), userController.createUser);
router.get("/", roleBasedAuth(ADMIN), userController.getUsers);
router.post("/merchant", roleBasedAuth(ADMIN), userController.createMerchant);
router.get("/:id", roleBasedAuth(ADMIN), userController.getUserById);
router.put("/:id", userController.updateUser);
router.put("/:id/roles", roleBasedAuth(ADMIN), userController.updateUserRoles);
router.patch("/:id/profile-image", userController.updateProfilemage);
router.delete("/:id", roleBasedAuth(ADMIN), userController.deleteUser);

export default router;
