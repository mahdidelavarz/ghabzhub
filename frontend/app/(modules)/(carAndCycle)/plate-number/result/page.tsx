// features/modules/plateNumber/results/page.tsx
"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/features/shared/ui/Logo";
import { usePNEResultQuery } from "@/features/modules/plateNumber/hooks/usePNEResult";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import FormButton from "@/features/shared/ui/FormButton";

function PlateResultsContent() {
  const router = useRouter();
  const { orderId } = usePlateStore();
  const { data, isLoading, error } = usePNEResultQuery(orderId);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleTryAgain = () => {
    router.push("/plate-number");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Logo className="absolute top-6 text-blue-600" />
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            در حال دریافت اطلاعات پلاک‌ها...
          </h2>
          <p className="text-gray-600">
            لطفاً چند لحظه صبر کنید
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Logo className="absolute top-6 text-blue-600" />
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            خطا در دریافت اطلاعات
          </h2>
          <p className="text-gray-600 mb-6">
            متأسفانه امکان دریافت اطلاعات پلاک‌ها وجود ندارد
          </p>
          <FormButton
            label="تلاش مجدد"
            onClick={handleTryAgain}
            loading={false}
          />
        </div>
      </div>
    );
  }

  // Check if data exists and has results
  const plates = data?.result?.body || [];
  const hasResults = plates.length > 0;
  const trackId = data?.trackId;

  // Helper function to get status color and text
  const getStatusInfo = (status: { id: number; description: string }) => {
    switch (status.id) {
      case 8:
        return {
          color: "bg-green-100 text-green-700",
          icon: "✓",
          text: status.description || "داراي مالک - نصب برروي وسيله"
        };
      default:
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: "!",
          text: status.description || "وضعیت نامشخص"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Logo className="absolute top-6 text-blue-600" />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 mt-16">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            نتیجه استعلام پلاک
          </h2>
          {trackId && (
            <p className="text-xs text-gray-400 mt-1">
              کد پیگیری: {trackId}
            </p>
          )}
        </div>

        {!hasResults ? (
          <div className="text-center py-8">
            <p className="text-gray-500">هیچ پلاکی برای این کد ملی یافت نشد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {plates.map((plate: any, index: number) => {
              const statusInfo = getStatusInfo(plate.plateStatus);
              
              return (
                <div
                  key={plate.plateId || index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg text-blue-600">
                          {plate.convertedPlateNum || plate.plateNum || "پلاک نامشخص"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">شماره پلاک:</span>
                          <span className="text-gray-700">{plate.plateNum}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">شناسه پلاک:</span>
                          <span className="text-gray-700">{plate.plateId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                      >
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
          <div className="flex-1">
            <FormButton
              label="بازگشت به صفحه اصلی"
              onClick={handleBackToHome}
              loading={false}
            />
          </div>
          <div className="flex-1">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-xl font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              استعلام مجدد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlateResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <Logo className="absolute top-6 text-blue-600" />
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      }
    >
      <PlateResultsContent />
    </Suspense>
  );
}