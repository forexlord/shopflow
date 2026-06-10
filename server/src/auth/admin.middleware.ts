import { NextFunction, Response } from "express";
import { isAdminRole } from "../users/user-role";
import { AuthRequest } from "./jwt.middleware";

export function adminMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (!isAdminRole(req.userRole)) {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
}
