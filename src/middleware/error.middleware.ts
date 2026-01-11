import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const e = err instanceof HttpError ? err : new HttpError(500, "Internal server error");
  res.status(e.status).json({ error: e.message, ...(e.details ? { details: e.details } : {}) });
}
