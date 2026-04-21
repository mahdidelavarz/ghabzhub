// features/auth/store/authStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  family_name: string;
  mobile_number: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  setInitialized: () => void;
  logout: () => void;
  isTokenValid: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      
      setUser: (user) => set({ user, isLoading: false }),
      
      setToken: (token) => {
        set({ token });
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", token);
        }
      },
      
      clearUser: () => set({ user: null, token: null, isLoading: true }),
      
      setInitialized: () => set({ isLoading: false }),
      
      logout: () => {
        set({ user: null, token: null, isLoading: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
      },
      
      isTokenValid: () => {
        const { token } = get();
        if (!token) return false;
        
        try {
          // Decode JWT token to check expiration
          const decoded = JSON.parse(atob(token.split('.')[1]));
          const expiryTime = decoded.exp * 1000; // Convert to milliseconds
          return Date.now() < expiryTime;
        } catch (error) {
          console.error("Error decoding token:", error);
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setInitialized();
        }
      },
    },
  ),
);