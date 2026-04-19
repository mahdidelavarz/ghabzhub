// features/auth/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../services/authServices";


export function useLogout() {
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearUser();
      localStorage.removeItem("access_token");
      toast.success("از حساب کاربری خارج شدید");
      router.push("/login");
    },
    onError: () => {
      toast.error("خروج از حساب ناموفق بود");
    },
  });
}
