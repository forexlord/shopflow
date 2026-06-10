import type { LoginCredentials, LoginResponse } from "../types/auth.types";
import { apiClient } from "./client";

export function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
}
