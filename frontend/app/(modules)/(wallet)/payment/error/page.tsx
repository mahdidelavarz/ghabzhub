"use client";
import { useRouter } from "next/navigation";
import FormButton from "@/features/shared/ui/FormButton";
import { LocalIcon } from "@/features/shared/icons/localIcon";

export default function ErrorPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/plate-number");
  };

  const handleRetry = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {/* <LocalIcon name="warning" className="w-10 h-10 text-orange-600" /> */}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          خطا در اتصال به درگاه پرداخت
        </h2>
        <p className="text-gray-600 mb-2">
          امکان اتصال به درگاه پرداخت وجود ندارد
        </p>
        <p className="text-sm text-gray-500 mb-6">
          لطفاً از اتصال اینترنت خود مطمئن شوید و مجدداً تلاش کنید
        </p>
        
        <div className="space-y-3">
          <FormButton
            label="تلاش مجدد"
            onClick={handleRetry}
            loading={false}
          />
          <button
            onClick={handleGoBack}
            className="w-full py-3 rounded-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}