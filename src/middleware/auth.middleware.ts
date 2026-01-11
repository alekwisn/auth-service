import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { HttpError } from "../utils/httpError";
type TokenPayload = { sub: string; role: "user" | "admin"; iat?: number; exp?: number; };
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("Authorization");
  if (!header?.startsWith("Bearer ")) return next(new HttpError(401, "Missing Authorization header"));
  const token = header.slice("Bearer ".length).trim();
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as TokenPayload;
    req.auth = { userId: decoded.sub, role: decoded.role };
    return next();
  } catch { return next(new HttpError(401, "Invalid or expired token")); }
}
