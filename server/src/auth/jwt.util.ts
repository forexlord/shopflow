import jwt from "jsonwebtoken";
import type { UserRole } from "../users/user-role";

interface TokenPayload {
  userId: string;
  role: UserRole;
}

export function signAccessToken(userId: string, role: UserRole): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId, role } satisfies TokenPayload, secret, {
    expiresIn: "7d",
  });
}
