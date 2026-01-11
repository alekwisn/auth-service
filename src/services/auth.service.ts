import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { config } from "../config";
import { HttpError } from "../utils/httpError";

export async function register(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new HttpError(409, "Email already in use");

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

  const user = await prisma.user.create({
    data: { email, passwordHash, role: "user" },
    select: { id: true, email: true, role: true, createdAt: true }
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new HttpError(401, "Invalid credentials");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new HttpError(401, "Invalid credentials");

  const token = jwt.sign(
    { role: user.role },
    config.jwtSecret,
    { subject: user.id, expiresIn: config.jwtExpiresIn }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}
