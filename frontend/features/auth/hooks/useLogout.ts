// features/auth/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../services/authServices";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const clearPlateData = usePlateStore((s) => s.clearPlateData);
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout(); // This clears user, token, and localStorage
      clearPlateData(); // Clear plate data as well
      toast.success("از حساب کاربری خارج شدید");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      // Even if API fails, clear local data
      logout();
      clearPlateData();
      localStorage.removeItem("access_token");
      toast.error("خروج از حساب انجام شد اما خطایی رخ داد");
      router.push("/auth/login");
    },
  });
}