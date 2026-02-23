"use client";

import { useState } from "react";
import { useCompleteProfile } from "@/features/auth/hooks/useCompleteProfile";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfileQuery } from "@/features/auth/hooks/useProfileQuery";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-xl font-bold text-center">تکمیل پروفایل</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="نام خانوادگی"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {isPending ? "در حال ارسال..." : "ثبت"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">
            خطا در ثبت اطلاعات
          </p>
        )}

        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
