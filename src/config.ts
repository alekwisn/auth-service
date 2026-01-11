import "dotenv/config";
export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 12),
};
if (!config.databaseUrl) throw new Error("DATABASE_URL is required");
if (!config.jwtSecret) throw new Error("JWT_SECRET is required");
