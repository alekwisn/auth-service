import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "../utils/validate";
import * as auth from "../services/auth.service";
import { prisma } from "../prisma";
import { HttpError } from "../utils/httpError";

const RegisterSchema = z.object({ email: z.string().email(), password: z.string().min(8).max(128) });
const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(8).max(128) });

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const body = validate(RegisterSchema, req.body);
    const user = await auth.register(body.email.toLowerCase(), body.password);
    res.status(201).json({ user });
  } catch (e) { next(e); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const body = validate(LoginSchema, req.body);
    const result = await auth.login(body.email.toLowerCase(), body.password);
    res.status(200).json(result);
  } catch (e) { next(e); }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.auth) throw new HttpError(401, "Unauthorized");
    const user = await prisma.user.findUnique({
      where: { id: req.auth.userId },
      select: { id: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new HttpError(404, "User not found");
    res.json({ user });
  } catch (e) { next(e); }
}
