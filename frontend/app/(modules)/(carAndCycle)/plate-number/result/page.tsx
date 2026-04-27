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
  
  const handleBackToHome = () => {
    router.push("/");
  };

  const handleTryAgain = () => {
    router.push("/plate-number");
  };

  // Parse the result data - handles both dictionary and array formats
  const parseResultData = (result: any) => {
    if (!result) return null;
    
    // If result is a string, parse it first
    let parsedData = typeof result === "string" ? JSON.parse(result) : result;
    
    // If parsedData is an array, return it directly
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
    
    // If parsedData has a body property that's an array
    if (parsedData?.body && Array.isArray(parsedData.body)) {
      return parsedData.body;
    }
    
    // If parsedData has a plateNum property (single plate object)
    if (parsedData?.plateNum) {
      return [parsedData];
    }
    
    // If parsedData has a status property (wrapper object)
    if (parsedData?.status) {
      // Try to extract plates from various possible locations
      if (parsedData.body && Array.isArray(parsedData.body)) {
        return parsedData.body;
      }
      if (parsedData.plates && Array.isArray(parsedData.plates)) {
        return parsedData.plates;
      }
      if (parsedData.results && Array.isArray(parsedData.results)) {
        return parsedData.results;
      }
      if (parsedData.data && Array.isArray(parsedData.data)) {
        return parsedData.data;
      }
    }
    
    return null;
  };
  
  // Extract plates from data
  const getPlatesArray = () => {
    if (!data) return [];
    
    // Try to get plates from data.result or directly from data
    const platesFromResult = data.result ? parseResultData(data.result) : null;
    if (platesFromResult && Array.isArray(platesFromResult)) {
      return platesFromResult;
    }
    
    // Check if data itself is an array
    if (Array.isArray(data)) {
      return data;
    }
    
    // Check if data has a body property that's an array
    if (data.body && Array.isArray(data.body)) {
      return data.body;
    }
    
    // Check if data has a plates property that's an array
    if (data.plates && Array.isArray(data.plates)) {
      return data.plates;
    }
    
    // Check if data is a single plate object
    if (data.plateNum) {
      return [data];
    }
    
    return [];
  };
  
  // Extract response status
  const getResponseStatus = () => {
    if (!data) return null;
    
    // Check in data.result
    if (data.result) {
      const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      if (parsed?.status) return parsed.status;
    }
    
    // Check directly in data
    return data?.status || null;
  };
  
  // Extract trackId
  const getTrackId = () => {
    return data?.trackId || null;
  };
  
  const plates = getPlatesArray();
  const responseStatus = getResponseStatus();
  const trackId = getTrackId();

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
            {(() => {
              const parsedError = data?.result ? 
                (typeof data.result === "string" ? JSON.parse(data.result) : data.result) : 
                null;
              return parsedError?.message || "متأسفانه استعلام پلاک‌ها انجام نشد";
            })()}
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
    if (!status) {
      return {
        color: "bg-gray-100 text-gray-700",
        icon: "?",
        text: "وضعیت نامشخص",
      };
    }
    
    // Handle different status IDs
    if (status.id === 8) {
      return {
        color: "bg-green-100 text-green-700",
        icon: "✓",
        text: status.description || "داراي مالک - نصب برروي وسيله",
      };
    } else if (status.id === 14) {
      return {
        color: "bg-blue-100 text-blue-700",
        icon: "✓",
        text: status.description || "داراي مالک - نصب برروي وسيله",
      };
    } else if (status.id === 256) {
      return {
        color: "bg-red-100 text-red-700",
        icon: "!",
        text: status.description || "غيرفعال به علت تغيير آدرس",
      };
    } else {
      return {
        color: "bg-yellow-100 text-yellow-700",
        icon: "!",
        text: status.description || "وضعیت نامشخص",
      };
    }
  };

  // Helper function to format plate number for display
  const formatPlateNumber = (plate: any) => {
    return plate.convertedPlateNum || plate.plateNum || "پلاک نامشخص";
  };

  return (
    <div className="min-h-200 min-w-80 md:min-w-120 lg:min-w-180 bg-gray-50 flex flex-col items-center justify-center p-4">
      <Logo className="absolute top-6 text-blue-600" />

      <div className="max-w-6xl md:min-w-md lg:min-w-lg xl:min-w-xl bg-white rounded-2xl shadow-lg p-6 mt-16">
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
          {hasResults && (
            <p className="text-sm text-gray-500 mt-2">
              تعداد {plates.length} پلاک یافت شد
            </p>
          )}
        </div>

        {!hasResults ? (
          <div className="text-center py-8 ">
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
          <div className="w-full space-y-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ">
            {plates.map((plate: any, index: number) => {
              const statusInfo = getStatusInfo(plate.plateStatus);

              return (
                <div
                  key={plate.plateId || index}
                  className="border border-gray-200 bg-gray-100 shadow-sm rounded-lg  hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col-reverse justify-between items-start gap-3 min-w-69 md:min-w-80 ">
                    <div className="w-full p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg text-blue-600">
                          {formatPlateNumber(plate)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        {plate.plateNum && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">شماره پلاک:</span>
                            <span className="text-gray-700">{plate.plateNum}</span>
                          </div>
                        )}
                        {plate.plateId && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">شناسه پلاک:</span>
                            <span className="text-gray-700">{plate.plateId}</span>
                          </div>
                        )}
                        {plate.detachDate && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">تاریخ جدا شدن:</span>
                            <span className="text-gray-700">
                              {new Date(plate.detachDate).toLocaleDateString("fa-IR")}
                            </span>
                          </div>
                        )}
                        {plate.numberingPlaceDesc && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">محل شماره‌گذاری:</span>
                            <span className="text-gray-700">{plate.numberingPlaceDesc}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`w-full flex justify-center rounded-b-xl ${statusInfo.color}`}>
                      <span className={`py-1 rounded-b-xl text-sm`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row gap-3">
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