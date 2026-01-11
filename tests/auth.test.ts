import request from "supertest";
import { createApp } from "../src/app";
describe("auth-service", () => {
  const app = createApp();
  it("health works", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
