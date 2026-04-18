import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PNEIdentifierPayload } from "../types/plateNumberTypes";
import { PNEIdentifierService } from "../services/plateNumberServices";
import { usePlateStore } from "../store/plateStore";

export const usePNEIdentifier = () => {
  const orderId = usePlateStore((s) => s.orderId);
  
  return useMutation({
    mutationFn: (data: PNEIdentifierPayload) => {
      if (!orderId) {
        throw new Error("Order ID not found");
      }
      return PNEIdentifierService(data, orderId);
    },
    onSuccess: (data) => {
      toast.success("استعلام با موفقیت انجام شد");
    },
    onError: (error) => {
      console.error(error);
      toast.error("خطا در انجام استعلام");
    },
  });
};