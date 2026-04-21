// success/page.tsx - If you keep it, make it just a confirmation page
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    // Auto redirect to results after 3 seconds
    const timer = setTimeout(() => {
      if (orderId) {
        router.push(`/plate-number/result?order_id=${orderId}`);
      } else {
        router.push("/plate-number");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          پرداخت با موفقیت انجام شد
        </h2>
        <p className="text-gray-600 mb-6">
          در حال هدایت به صفحه نتایج استعلام...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}