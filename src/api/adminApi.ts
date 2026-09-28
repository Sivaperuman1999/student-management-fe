import { apiClient } from "../lib/apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminResponse {
  id: string;
  email: string;
  name?: string;
}

export interface LoginResponse {
  accessToken: string;
  admin: AdminResponse;
}

const ADMIN_ENDPOINTS = {
  LOGIN: "/admin/login",
  LOGOUT: "/admin/logout",
  PROFILE: "/admin/profile",
} as const;

export const adminApi = {
  login: (data: LoginPayload) =>
    apiClient.post<LoginResponse>(ADMIN_ENDPOINTS.LOGIN, data),

  logout: () =>
    apiClient.post(ADMIN_ENDPOINTS.LOGOUT),

  getProfile: () =>
    apiClient.get<AdminResponse>(ADMIN_ENDPOINTS.PROFILE),

  updateProfile: (data: Partial<AdminResponse>) =>
    apiClient.put<AdminResponse>(ADMIN_ENDPOINTS.PROFILE, data),
};