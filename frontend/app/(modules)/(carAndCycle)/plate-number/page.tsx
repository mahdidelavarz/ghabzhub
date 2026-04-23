"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalIcon } from "@/features/shared/icons/localIcon";
import GrayLine from "@/features/shared/ui/GrayLine";
import { ProtectedRoute } from "@/lib/protectedRoute";
import FormInput from "@/features/shared/ui/FormInput";
import FormButton from "@/features/shared/ui/FormButton";
import RulesModal from "@/features/modules/plateNumber/ui/RulesModal";
import { usePlateStore } from "@/features/modules/plateNumber/store/plateStore";
import {
  PlateFormData,
  plateFormSchema,
} from "@/features/modules/plateNumber/schemas/plateFormSchema";
import toast from "react-hot-toast";

function PlateNumberContent() {
  const [showModal, setShowModal] = useState(false);
  const setPlateData = usePlateStore((s) => s.setPlateData);
  const searchParams = useSearchParams();
  const statusRef = useRef(searchParams.get("status"));
  const status = statusRef.current;
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "noInfo" && hasShownToast.current == false) {
      toast.error("اطلاعات شما وارد نشده است!");
      hasShownToast.current = true;
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlateFormData>({
    resolver: zodResolver(plateFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: PlateFormData) => {
    // Save user data to store (only nationalNumber and phoneNumber)
    setPlateData({
      nationalNumber: data.nationalNumber,
      phoneNumber: data.phoneNumber,
    });
    // Show the modal
    setShowModal(true);
  };

  return (
    <ProtectedRoute>
      <RulesModal showModal={showModal} setShowModal={setShowModal} />

      <div className="w-full h-auto flex flex-col gap-5 lg:flex-row lg:p-20">
        <div className="w-full h-auto bg-white rounded-2xl shadow-md shadow-gray-100 lg:w-1/2 lg:p-6">
          <GrayLine className="md:hidden" />
          <div className="flex items-center px-3 gap-3 mt-5">
            <LocalIcon
              name="plateNumber"
              size={45}
              className="w-8 h-8 fill-amber-600 bg-fuchsia-200 rounded-lg"
            />
            <h2 className="font-semibold text-lg">استعلام پلاک فعال ماشین</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 flex flex-col gap-3 mt-3"
          >
            <p className="text-xs py-2 text-gray-500">
              برای مشاهده نتیجه، اطلاعات زیر را وارد کنید.
            </p>
            <div>
              <FormInput
                className="w-full"
                type="number"
                {...register("nationalNumber")}
                placeholder="کد ملی مالک خودرو"
                hasError={!!errors.nationalNumber}
              />
              {errors.nationalNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nationalNumber.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                className="w-full"
                type="number"
                {...register("phoneNumber")}
                placeholder="شماره موبایل"
                hasError={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <FormButton
              label="استعلام پلاک‌های فعال"
              loading={false}
              type="submit"
            />
          </form>
        </div>

        <div className="hidden lg:block w-full h-auto rounded-lg shadow-md shadow-slate-50 lg:w-1/2 lg:p-6">
          <h3 className="mb-4 font-semibold">
            چگونه متوجه شویم چند پلاک فعال داریم؟
          </h3>
          <p className="text-slate-400 leading-8">
            سامانه قبضینو امکان استعلام پلاک فعال با کد ملی را فراهم کرده تا
            کلیه کاربران بتوانند با وارد کردن کد ملی و شماره موبایل خود در کادر
            مقابل به لیست به‌روز پلاک‌های فعال و غیر فعال خود دسترسی پیدا کنند و
            جزئیاتی مانند تاریخ فک‌شدن، مرکز شماره‌گذاری، وضعیت و شماره سریال را
            مشاهده کنند.
          </p>
          <LocalIcon name="PlateBg" alt="plate" className="w-full" />
        </div>
      </div>
    </ProtectedRoute>
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
      <PlateNumberContent />
    </Suspense>
  );
}
