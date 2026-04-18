import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPaymentUrlService } from "../services/plateNumberServices";

export const useGetPaymentUrl = () => {
  return useMutation({
    mutationFn: () => getPaymentUrlService(),
    onSuccess: (data) => {
      toast.success("درگاه پرداخت با موفقیت ایجاد شد");
    },
    onError: () => {
      toast.error("خطا در ایجاد درگاه پرداخت");
    },
  });
};