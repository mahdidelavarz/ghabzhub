import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resendOtpService } from "../services/authServices";



export const useResendOtp = () => {
  return useMutation({
    mutationFn: (mobile: string) => resendOtpService(mobile),
    onSuccess: () => {
      toast.success("کد تایید مجدداً ارسال شد");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail || "خطا در ارسال مجدد کد";
      toast.error(errorMessage);
    },
  });
};