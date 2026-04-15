
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PNEIdentifierPayload } from "../types/plateNumberTypes";
import { PNEIdentifierService } from "../services/plateNumberServices";



export const usePNEIdentifier = () => {
  return useMutation({
    mutationFn: (data: PNEIdentifierPayload) => PNEIdentifierService(data),
    onSuccess: (data) => {
      toast.success("استعلام با موفقیت انجام شد");
      // اینجا می‌توانید نتیجه را در Zustand ذخیره کنید یا مستقیماً ریدایرکت کنید
    },
    onError: () => {
      toast.error("خطا در انجام استعلام");
    },
  });
};
