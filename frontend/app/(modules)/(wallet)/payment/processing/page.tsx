"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentUrl = searchParams.get("payment_url");

  useEffect(() => {
    // Redirect to payment gateway after 2 seconds
    const timer = setTimeout(() => {
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        router.push("/payment/error");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentUrl, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          در حال اتصال به درگاه پرداخت...
        </h2>
        <p className="text-gray-600">
          لطفاً چند لحظه صبر کنید
        </p>
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}