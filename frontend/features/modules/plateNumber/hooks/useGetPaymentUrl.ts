import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPaymentUrlService } from "../services/plateNumberServices";
import { usePlateStore } from "../store/plateStore";

export const useGetPaymentUrl = () => {
  const setOrderId = usePlateStore((s) => s.setOrderId);
  
  return useMutation({
    mutationFn: (nationalCode: string) => getPaymentUrlService(nationalCode),
    onSuccess: (data) => {
      if (data.order_id) {
        console.log(data , 'data for orderId')
        setOrderId(data.order_id.toString());
      }
      toast.success("درگاه پرداخت با موفقیت ایجاد شد");
    },
    onError: () => {
      toast.error("خطا در ایجاد درگاه پرداخت");
    },
  });
};