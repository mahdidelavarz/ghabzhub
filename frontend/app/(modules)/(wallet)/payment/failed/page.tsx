"use client";
import { useRouter } from "next/navigation";
import FormButton from "@/features/shared/ui/FormButton";
import { LocalIcon } from "@/features/shared/icons/localIcon";

export default function FailedPage() {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push("/plate-number");
  };

  const handleContactSupport = () => {
    router.push("/support");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {/* <LocalIcon name="error" className="w-10 h-10 text-red-600" /> */}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          پرداخت ناموفق بود
        </h2>
        <p className="text-gray-600 mb-2">
          متأسفانه پرداخت شما با مشکل مواجه شد
        </p>
        <p className="text-sm text-gray-500 mb-6">
          لطفاً مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید
        </p>
        
        <div className="space-y-3">
          <FormButton
            label="تلاش مجدد"
            onClick={handleTryAgain}
            loading={false}
          />
          <button
            onClick={handleContactSupport}
            className="w-full py-3 rounded-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            تماس با پشتیبانی
          </button>
        </div>
      </div>
    </div>
  );
}