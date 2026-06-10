import { Router } from "express";
import { jwtMiddleware } from "../auth/jwt.middleware";
import { productsService } from "./products.service";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await productsService.findAll();
    res.json(products);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch products";
    res.status(500).json({ message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productsService.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch product";
    res.status(500).json({ message });
  }
});

router.post("/", jwtMiddleware, async (_req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

router.patch("/:id", jwtMiddleware, async (_req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

router.delete("/:id", jwtMiddleware, async (_req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

export default router;
