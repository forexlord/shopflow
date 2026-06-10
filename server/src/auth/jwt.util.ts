import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}

export function signAccessToken(userId: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId } satisfies TokenPayload, secret, {
    expiresIn: "7d",
  });
}
