import { Router } from "express";
import { authService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const dto: LoginDto = req.body;
    const result = await authService.login(dto);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    res.status(501).json({ message });
  }
});

export default router;
