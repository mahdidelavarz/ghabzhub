// features/auth/hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginService } from "../services/authServices";
import { LoginPayload } from "../types/authTypes";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginService(data),
    onSuccess: (data, variables) => {
      // Store token in both localStorage and store
      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token);
      
      // Set user in store
      const user = data.user;
      setUser({
        id: user?.id ?? 0,
        name: user?.name ?? "",
        family_name: user?.family_name ?? "",
        mobile_number: user?.mobile_number ?? user?.mobile ?? variables.mobile_number,
      });
      
      // Invalidate profile query
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      
      toast.success("ورود با موفقیت انجام شد");
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail || "شماره موبایل یا رمز عبور اشتباه است";
      toast.error(errorMessage);
    },
  });
};