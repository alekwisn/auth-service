import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
export const systemRoutes = Router();
systemRoutes.get("/health", (_req, res) => res.json({ ok: true }));
systemRoutes.get("/admin/health", requireAuth, requireRole("admin"), (_req, res) => {
  res.json({ ok: true, scope: "admin" });
});
