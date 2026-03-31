"use client";
import { LocalIcon } from "@/features/shared/icons/localIcon";
import GrayLine from "@/features/shared/ui/GrayLine";
import { ProtectedRoute } from "@/lib/protectedRoute";
import FormInput from "../../../../features/shared/ui/FormInput";
import { useState } from "react";
import FormButton from "@/features/shared/ui/FormButton";

function PlateNumberPage() {
  const [nationalNumber, setNationalNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <ProtectedRoute>
      <div className="w-full h-100  bg-white rounded-lg shadow-md shadow-slate-50">
        <GrayLine className="md:hidden" />
        <div className="flex items-center px-3 gap-3 mt-5">
          <LocalIcon
            name="plateNumber"
            size={45}
            className="w-8 h-8 fill-amber-600 bg-fuchsia-200 rounded-lg"
          />
          <h2 className="font-semibold text-lg"> استعلام پلاک فعال ماشین</h2>
        </div>
        <div className="p-3 flex flex-col gap-3 mt-3">
          <p className="text-xs py-2 text-gray-500">
            برای مشاهده نتیجه، اطلاعات زیر را وارد کنید.
          </p>
          <FormInput
            type="number"
            value={nationalNumber}
            onChange={(num) => setNationalNumber(num)}
            placeholder="کد ملی مالک خودرو"
          />
          <FormInput
            type="number"
            value={phoneNumber}
            onChange={(num) => setPhoneNumber(num)}
            placeholder=" شماره موبایل"
          />
          <FormButton
            label="استعلام پلاک‌های فعال"
            onClick={() => console.log("clicked")}
            loading={false}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default PlateNumberPage;
