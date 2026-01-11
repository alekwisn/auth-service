import { ZodSchema } from "zod";
import { HttpError } from "./httpError";
export function validate<T>(schema: ZodSchema<T>, input: unknown): T {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid request", parsed.error.flatten());
  }
  return parsed.data;
}
