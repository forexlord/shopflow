import { Router } from "express";
import { HttpError } from "../common/errors/http-error";
import { AuthRequest, jwtMiddleware } from "../auth/jwt.middleware";
import { cartService } from "./cart.service";

const router = Router();

router.use(jwtMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const items = await cartService.getByUserId(String(req.userId));
    res.json({ items });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch cart";
    res.status(500).json({ message });
  }
});

router.put("/", async (req: AuthRequest, res) => {
  try {
    const items = await cartService.replaceItems(
      String(req.userId),
      req.body?.items
    );
    res.json({ items });
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    const message =
      err instanceof Error ? err.message : "Failed to update cart";
    res.status(500).json({ message });
  }
});

router.delete("/", async (req: AuthRequest, res) => {
  try {
    await cartService.clear(String(req.userId));
    res.json({ items: [] });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to clear cart";
    res.status(500).json({ message });
  }
});

export default router;
