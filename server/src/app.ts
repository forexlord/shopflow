import cors from "cors";
import express, { Application } from "express";
import authRoutes from "./auth/auth.routes";
import productsRoutes from "./products/products.routes";

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productsRoutes);

  return app;
}
