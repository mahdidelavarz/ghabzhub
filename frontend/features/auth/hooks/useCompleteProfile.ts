import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { completeProfileService } from "../services/authServices";
import { CompleteProfilePayload } from "../types/authTypes";
import { useAuthStore } from "../store/authStore";

export const useCompleteProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: CompleteProfilePayload) => completeProfileService(data),
    onSuccess: (data) => {
      if (data?.id && data?.mobile_number) {
        setUser(data);
      }
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("پروفایل با موفقیت تکمیل شد");
      router.push("/");
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail;
      let message = "ثبت پروفایل ناموفق بود";
      
      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail.map((e: any) => e.msg).filter(Boolean).join(", ");
      }
      
      toast.error(message);
    },
  });
};