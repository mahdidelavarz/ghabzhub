"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import { usePNEIdentifier } from "@/features/modules/plateNumber/hooks/usePlateNumber";
import toast from "react-hot-toast";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id"); // Get order_id from the response
  const { nationalNumber, phoneNumber, clearPlateData, setOrderId } = usePlateStore();
  const { mutate: submitPayment, isPending } = usePNEIdentifier();

  useEffect(() => {
    if (status === "processing" && orderId) {
      // Save the order_id to the store
      setOrderId(orderId);
      
      // Now call the PNE identifier service with the order_id
      submitPayment(
        {
          nationalIdentifier: Number(nationalNumber),
          mobileNumber: Number(phoneNumber),
        },
        {
          onSuccess: (result) => {
            clearPlateData();
            toast.success("استعلام با موفقیت انجام شد");
            router.push("/plate/results");
          },
          onError: () => {
            toast.error("خطا در انجام استعلام");
            router.push("/plate-number");
          },
        }
      );
    } else if (status === "failed") {
      toast.error("پرداخت ناموفق بود");
      router.push("/plate-number");
    } else {
      toast.error("خطا در پردازش پرداخت");
      router.push("/plate-number");
    }
  }, [status, orderId, submitPayment, nationalNumber, phoneNumber, clearPlateData, setOrderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">
          {isPending ? "در حال استعلام پلاک..." : "در حال پردازش..."}
        </h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}