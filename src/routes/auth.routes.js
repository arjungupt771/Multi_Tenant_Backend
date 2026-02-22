// src/routes/auth.routes.js
import express from "express";
import { signup } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import tenantMiddleware from "../middlewares/tenant.middleware.js";



const router = express.Router();

router.post("/signup", signup);
router.use(authMiddleware);
router.use(tenantMiddleware);


export default router;
