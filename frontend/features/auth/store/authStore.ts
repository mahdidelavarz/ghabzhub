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
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setInitialized: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      clearUser: () => set({ user: null, isLoading: true }),
      setInitialized: () => set({ isLoading: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setInitialized();
        }
      },
    },
  ),
);
