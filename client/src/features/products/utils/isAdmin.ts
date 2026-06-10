import type { User } from "../../../types/auth.types";

export const ADMIN_EMAIL = "admin@shopflow.com";

export function isAdmin(user: User | null | undefined): boolean {
  return user?.email === ADMIN_EMAIL;
}
