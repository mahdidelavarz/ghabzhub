import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RegisterPayload } from "../types/authTypes";
import { registerService } from "../services/authServices";



export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerService(data),
    onSuccess: (data) => {
      if (data.requires_verification) {
        toast.success("ثبت نام موفق بود. کد تایید ارسال شد");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.detail || "خطا در ثبت نام";
      toast.error(errorMessage);
    },
  });
};