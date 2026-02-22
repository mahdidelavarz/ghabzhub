// features/auth/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { logoutApi } from "../services/logout";

export function useLogout() {
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearUser();
      router.push("/login");
    },
  });
}