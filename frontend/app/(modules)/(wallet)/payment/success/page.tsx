"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";

import FormButton from "@/features/shared/ui/FormButton";
import { usePNEResultQuery } from "@/features/modules/plateNumber/hooks/usePNEResult";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { nationalNumber, phoneNumber, clearPlateData, setOrderId } =
    usePlateStore();
  const { data, isLoading } = usePNEResultQuery();

  useEffect(() => {
    if (data) {
      setOrderId(orderId || "");
    }
  }, [orderId]);

  const handleViewResults = () => {
    router.push("/plate-number/results");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {/* <LocalIcon name="success" className="w-10 h-10 text-green-600" /> */}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          پرداخت با موفقیت انجام شد
        </h2>
        <p className="text-gray-600 mb-6">
          اطلاعات استعلام شما در حال پردازش است
        </p>

        {isLoading ? (
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <FormButton
              label="مشاهده نتایج استعلام"
              onClick={handleViewResults}
              loading={false}
            />
            <button
              onClick={handleBackToHome}
              className="w-full py-3 rounded-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
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
      <SuccessContent />
    </Suspense>
  );
}
