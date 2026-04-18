import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPriceService } from "../services/plateNumberServices";

export const useGetPrice = () => {
  return useMutation({
    mutationFn: () => getPriceService(),
    onError: () => {
      toast.error("خطا در دریافت مبلغ استعلام");
    },
  });
};