export const USER_ROLES = ["admin", "shopper"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export function isAdminRole(role: string | undefined): role is "admin" {
  return role === "admin";
}
