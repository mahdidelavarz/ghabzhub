// lib/protectedRoute.tsx
"use client";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, isTokenValid, logout } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;

    // Check if user exists AND token is valid
    if (!user || !isTokenValid()) {
      if (user && !isTokenValid()) {
        toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
        logout(); // Clear invalid data
      } else if (!user) {
        toast.error("لطفا ابتدا وارد شوید!");
      }
      router.push("/login");
    }
  }, [user, isLoading, isClient, router, isTokenValid, logout]);

  if (!isClient || isLoading || !user || !isTokenValid()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};