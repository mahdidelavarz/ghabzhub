"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import { usePNEIdentifier } from "@/features/modules/plateNumber/hooks/usePlateNumber";
import FormButton from "@/features/shared/ui/FormButton";
import { LocalIcon } from "@/features/shared/icons/localIcon";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { nationalNumber, phoneNumber, clearPlateData, setOrderId } = usePlateStore();
  const { mutate: submitPayment, isPending } = usePNEIdentifier();

  useEffect(() => {
    if (orderId) {
      setOrderId(orderId);
      
      // Call the PNE identifier service with the order_id
      submitPayment(
        {
          nationalIdentifier: Number(nationalNumber),
          mobileNumber: Number(phoneNumber),
        },
        {
          onSuccess: (result) => {
            clearPlateData();
          },
          onError: () => {
            // Error will be handled by the hook
          },
        }
      );
    }
  }, [orderId, submitPayment, nationalNumber, phoneNumber, clearPlateData, setOrderId]);

  const handleViewResults = () => {
    router.push("/plate/results");
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
        
        {isPending ? (
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}