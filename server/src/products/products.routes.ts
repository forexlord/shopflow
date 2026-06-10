import { Router } from "express";
import { HttpError } from "../common/errors/http-error";
import { adminMiddleware } from "../auth/admin.middleware";
import { jwtMiddleware } from "../auth/jwt.middleware";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { parseProductQuery } from "./product-query.parser";
import { toProductDto } from "./product.mapper";
import { productsService } from "./products.service";

const router = Router();

router.get("/categories", async (_req, res) => {
  try {
    const categories = await productsService.getCategories();
    res.json({ categories });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch categories";
    res.status(500).json({ message });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = parseProductQuery(req.query as Record<string, unknown>);
    const result = await productsService.findMany(query);
    res.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch products";
    res.status(500).json({ message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productsService.findById(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(toProductDto(product));
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch product";
    res.status(500).json({ message });
  }
});

router.post("/", jwtMiddleware, adminMiddleware, async (req, res) => {
  try {
    const dto: CreateProductDto = req.body;
    const product = await productsService.create(dto);
    res.status(201).json(toProductDto(product));
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    const message =
      err instanceof Error ? err.message : "Failed to create product";
    res.status(500).json({ message });
  }
});

router.patch("/:id", jwtMiddleware, adminMiddleware, async (req, res) => {
  try {
    const dto: UpdateProductDto = req.body;
    const product = await productsService.update(String(req.params.id), dto);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(toProductDto(product));
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    const message =
      err instanceof Error ? err.message : "Failed to update product";
    res.status(500).json({ message });
  }
});

router.delete("/:id", jwtMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await productsService.remove(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(toProductDto(product));
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete product";
    res.status(500).json({ message });
  }
});

export default router;
