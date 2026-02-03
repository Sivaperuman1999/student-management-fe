import { create } from "zustand";
import { adminApi } from "../api/index";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isLoggingIn: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoggingIn: false,

  initializeAuth: () => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("authUser");
    
    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        set({ authUser: user });
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authUser");
      }
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await adminApi.login(data);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("authUser", JSON.stringify(res.admin));
      set({ authUser: res.admin });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    set({ authUser: null });
  },
}));
