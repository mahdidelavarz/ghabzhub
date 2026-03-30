"use client";

import { useState } from "react";
import { useCompleteProfile } from "@/features/auth/hooks/useCompleteProfile";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfileQuery } from "@/features/auth/hooks/useProfileQuery";
import { Logo } from "@/features/shared/ui/Logo";

export default function CompleteProfilePage() {
  const { mutate, isPending, error } = useCompleteProfile();
  const user = useAuthStore((s) => s.user);
  const { data: profileData } = useProfileQuery();

  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [message, setMessage] = useState("");

  const mobileNumber = user?.mobile_number || profileData?.mobile_number || "";

  const submit = () => {
    setMessage("");

    if (!name.trim() || !familyName.trim()) {
      setMessage("نام و نام خانوادگی را وارد کنید.");
      return;
    }

    const payload: {
      name: string;
      family_name: string;
      mobile_number?: string;
    } = {
      name: name.trim(),
      family_name: familyName.trim(),
    };

    if (mobileNumber) {
      payload.mobile_number = mobileNumber;
    }

    mutate(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-blue-400 to-blue-300 p-4">
      <Logo className="absolute text-5xl top-40 text-blue-200"/>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md py-8 px-3 lg:px-8 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white mb-8">تکمیل پروفایل</h1>

        <div className="space-y-5">
          <div className="relative">
            <input
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              placeholder="نام خانوادگی"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={isPending}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg
              ${isPending 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]'
              }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                در حال ارسال...
              </span>
            ) : (
              'ثبت'
            )}
          </button>

          {(error || message) && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-100 text-sm py-2 px-4 rounded-lg text-center">
              {error ? 'خطا در ثبت اطلاعات' : message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
