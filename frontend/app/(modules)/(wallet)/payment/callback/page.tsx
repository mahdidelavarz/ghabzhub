"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import toast from "react-hot-toast";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get parameters from the URL (注意: 后端返回的是 Status 大写 S)
  const status = searchParams.get("Status") || searchParams.get("status");
  const message = searchParams.get("message");
  const orderIdParam = searchParams.get("order_id");

  const { setOrderId } = usePlateStore();

  useEffect(() => {
    console.log("Payment callback received:", {
      status,
      orderIdParam,
      message,
    });

   
    if (status === "processing" || status === "success" || status === "OK") {
     
      if (orderIdParam) {
        setOrderId(orderIdParam);
        router.replace(`/payment/success?order_id=${orderIdParam}`);
      } else {
        toast.error("اطلاعات پرداخت کامل نیست");
        router.replace("/payment/error");
      }
    } else if (status === "failed") {
      // Payment failed
      toast.error(message || "پرداخت ناموفق بود");
      router.replace("/payment/failed");
    } else if (status === "error") {
      // Technical error
      toast.error(message || "خطا در پردازش پرداخت");
      router.replace("/payment/error");
    } else {
      // Unknown status
      toast.error("وضعیت نامشخص پرداخت");
      router.replace("/payment/error");
    }
  }, [status, orderIdParam, message, setOrderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          در حال پردازش پرداخت...
        </h2>
        <p className="text-gray-600">لطفاً چند لحظه صبر کنید</p>
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
