import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "./routes/auth.routes";
import { systemRoutes } from "./routes/system.routes";
import { notFoundMiddleware } from "./middleware/notfound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(authRoutes);
  app.use(systemRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
  return app;
}
