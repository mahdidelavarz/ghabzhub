"use client";
import { LocalIcon } from "@/features/shared/icons/localIcon";
import GrayLine from "@/features/shared/ui/GrayLine";
import { ProtectedRoute } from "@/lib/protectedRoute";
import FormInput from "../../../../features/shared/ui/FormInput";
import { useState } from "react";
import FormButton from "@/features/shared/ui/FormButton";
import Image from "next/image";
import RulesModal from "@/features/modules/plateNumber/ui/RulesModal";

function PlateNumberPage() {
  const [nationalNumber, setNationalNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <ProtectedRoute>
      <RulesModal showModal={showModal} setShowModal={setShowModal} />
      <div className="w-full h-auto flex flex-col gap-5 lg:flex-row lg:p-20 ">
        <div className="w-full h-auto  bg-white rounded-2xl shadow-md shadow-gray-100 lg:w-1/2 lg:p-6">
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
              onClick={() => setShowModal(true)}
              loading={false}
            />
          </div>
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
          <Image
            src="../../../../assets/imgs/plate-number-inquiry.svg"
            width={40}
            height={20}
            alt="plate"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default PlateNumberPage;
