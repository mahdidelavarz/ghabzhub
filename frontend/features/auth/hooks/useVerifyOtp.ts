import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyOtpService } from "../services/authServices";



export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ mobile, code }: { mobile: string; code: string }) => 
      verifyOtpService(mobile, code),
    onSuccess: (data) => {
      if (data.detail === "Account verified") {
        toast.success("حساب کاربری با موفقیت تایید شد");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail || "خطا در تایید کد";
      toast.error(errorMessage);
    },
  });
};