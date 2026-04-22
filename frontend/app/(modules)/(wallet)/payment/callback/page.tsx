// payment/callback/page.tsx
"use client";
import { useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import toast from "react-hot-toast";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("Status") || searchParams.get("status");
  const message = searchParams.get("message");
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;

    if (status === "success" || status === "OK") {
      hasRedirected.current = true;
      router.replace(`/payment/success`);
    } else if (status === "processing") {
      hasRedirected.current = true;
      router.replace("/payment/processing");
    } else if (status === "failed") {
      hasRedirected.current = true;
      toast.error(message || "پرداخت ناموفق بود");
      router.replace("/payment/failed");
    } else if (status === "error") {
      hasRedirected.current = true;
      toast.error(message || "خطا در پردازش پرداخت");
      router.replace("/payment/error");
    } else {
      hasRedirected.current = true;
      toast.error("وضعیت نامشخص پرداخت");
      router.replace("/payment/error");
    }
  }, [status, message, router]);

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
