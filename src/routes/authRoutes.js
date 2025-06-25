// src/routes/authRoutes.js
import { Router } from "express";
const router = Router();
import { authController } from "../controller/authController.js";


router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
