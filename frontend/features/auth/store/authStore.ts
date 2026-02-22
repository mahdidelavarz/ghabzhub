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
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);