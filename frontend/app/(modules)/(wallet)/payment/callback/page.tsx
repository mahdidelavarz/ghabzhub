"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";

import toast from "react-hot-toast";
import { usePNEResultQuery } from "@/features/modules/plateNumber/hooks/usePNEResult";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all parameters from the URL
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");

  const { nationalNumber, phoneNumber, clearPlateData, setOrderId } =
    usePlateStore();
  const {data , isLoading} = usePNEResultQuery();

  useEffect(() => {
    // Handle different statuses from backend
    switch (status) {
      case "success":
      case "processing":
      case "OK":
        // Payment successful
        if (orderId) {
          setOrderId(orderId);
          toast.success('استعلام با موفقیت انجام شد.')
          router.push('/plate-number/result')
        } else {
          toast.error("اطلاعات پرداخت کامل نیست");
          router.push("/payment/error");
        }
        break;

      case "failed":
        // Payment failed
        toast.error(message || "پرداخت ناموفق بود");
        router.push("/payment/failed");
        break;

      case "error":
        // Technical error
        toast.error(message || "خطا در پردازش پرداخت");
        router.push("/payment/error");
        break;

      default:
        // Unknown status
        toast.error("وضعیت نامشخص پرداخت");
        router.push("/payment/error");
    }
  }, [
    status,
    orderId,
    message,
    nationalNumber,
    phoneNumber,
    clearPlateData,
    setOrderId,
    router,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">
          {isLoading ? "در حال استعلام پلاک..." : "در حال پردازش..."}
        </h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">لطفاً چند لحظه صبر کنید...</p>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
