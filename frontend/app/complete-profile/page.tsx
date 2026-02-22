// app/complete-profile/page.tsx
"use client";

import { useState } from "react";
import { useCompleteProfile } from "@/features/auth/hooks/useCompleteProfile";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function CompleteProfilePage() {
  const { mutate, isPending, error } = useCompleteProfile();
  const user = useAuthStore((s) => s.user);

  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");

  const submit = () => {
    if (!user?.mobile_number) return;

    mutate({
      name,
      family_name: familyName,
      mobile_number: user.mobile_number,
    });
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
          className="w-full bg-black text-white py-2 rounded"
        >
          {isPending ? "در حال ارسال..." : "ثبت"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">
            خطا در ثبت اطلاعات
          </p>
        )}
      </div>
    </div>
  );
}