"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/features/shared/ui/Logo";
import { usePNEResultQuery } from "@/features/modules/plateNumber/hooks/usePNEResult";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import FormButton from "@/features/shared/ui/FormButton";

export default function PlateResultsPage() {
  const router = useRouter();
  const { orderId } = usePlateStore();
  const { data, isLoading, error } = usePNEResultQuery(orderId);
  
  console.log(data, "result");
  
  const handleBackToHome = () => {
    router.push("/");
  };

  const handleTryAgain = () => {
    router.push("/plate-number");
  };

  // Parse the result data
  const parsedResult = data?.result 
    ? (typeof data.result === "string" ? JSON.parse(data.result) : data.result)
    : null;
  
  // Extract status from response
  const responseStatus = parsedResult?.status || data?.status;
  const plates = Array.isArray(parsedResult?.body)
    ? parsedResult.body
    : parsedResult?.plateNum
      ? [parsedResult]
      : [];
  const trackId = data?.trackId;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Logo className="absolute top-6 text-blue-600" />
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            در حال دریافت اطلاعات پلاک‌ها...
          </h2>
          <p className="text-gray-600">لطفاً چند لحظه صبر کنید</p>
        </div>
      </div>
    );
  }

  // Handle error state
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

  // Handle processing status
  if (responseStatus === "processing" || responseStatus === "pending") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Logo className="absolute top-6 text-blue-600" />
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            در حال پردازش استعلام
          </h2>
          <p className="text-gray-600 mb-4">
            استعلام پلاک‌ها در حال انجام است
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 text-blue-600 hover:text-blue-700 text-sm"
          >
            بررسی مجدد وضعیت
          </button>
        </div>
      </div>
    );
  }

  // Handle failed status
  if (responseStatus === "failed" || responseStatus === "error") {
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
            استعلام با شکست مواجه شد
          </h2>
          <p className="text-gray-600 mb-6">
            {parsedResult?.message || "متأسفانه استعلام پلاک‌ها انجام نشد"}
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

  // Handle success status with results
  const hasResults = plates.length > 0;

  const getStatusInfo = (status: { id: number; description: string }) => {
    switch (status.id) {
      case 8:
        return {
          color: "bg-green-100 text-green-700",
          icon: "✓",
          text: status.description || "داراي مالک - نصب برروي وسيله",
        };
      default:
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: "!",
          text: status.description || "وضعیت نامشخص",
        };
    }
  };

  return (
    <div className="min-h-200 min-w-80 md:min-w-120 lg:min-w-180 bg-gray-50 flex flex-col items-center justify-center p-4">
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
            <p className="text-xs text-gray-400 mt-1">کد پیگیری: {trackId}</p>
          )}
        </div>

        {!hasResults ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
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
                  <div className="min-w-70 flex flex-col justify-between items-start mb-3 gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg text-blue-600">
                          {plate.convertedPlateNum ||
                            plate.plateNum ||
                            "پلاک نامشخص"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">شماره پلاک:</span>
                          <span className="text-gray-700">
                            {plate.plateNum}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">شناسه پلاک:</span>
                          <span className="text-gray-700">{plate.plateId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={statusInfo.color}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
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