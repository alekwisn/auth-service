import { Router } from "express";
import * as controller from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
export const authRoutes = Router();
authRoutes.post("/auth/register", controller.register);
authRoutes.post("/auth/login", controller.login);
authRoutes.get("/me", requireAuth, controller.me);
