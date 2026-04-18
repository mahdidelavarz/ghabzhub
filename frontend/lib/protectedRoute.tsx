"use client";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (!isClient || isLoading) return;

  //   if (!user) {
  //     toast.error('لطفا ابتدا وارد شوید!')
  //     router.push("/login");
  //   }
  // }, [user, isLoading, isClient, router]);

  // if (!isClient || isLoading || !user) {
  //   return null;
  // }

  return <>{children}</>;
};
