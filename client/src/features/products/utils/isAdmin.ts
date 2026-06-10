import type { User } from "../../../types/auth.types";

export function isAdmin(user: User | null | undefined): boolean {
  return user?.role === "admin";
}
