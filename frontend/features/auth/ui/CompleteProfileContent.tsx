"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorfulLogo, Logo } from "@/features/shared/ui/Logo";
import { useCompleteProfile } from "../hooks/useCompleteProfile";
import { useProfileQuery } from "../hooks/useProfileQuery";
import { useAuthStore } from "../store/authStore";
import {
  completeProfileSchema,
  CompleteProfileFormData,
} from "../schemas/authSchemas";

export default function CompleteProfileContent() {
  const { mutate: completeProfile, isPending, error } = useCompleteProfile();
  const user = useAuthStore((s) => s.user);
  const { data: profileData } = useProfileQuery();

  const mobileNumber = user?.mobile_number || profileData?.mobile_number || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      family_name: "",
    },
  });

  const onSubmit = (data: CompleteProfileFormData) => {
    const payload: CompleteProfileFormData & { mobile_number?: string } = {
      name: data.name.trim(),
      family_name: data.family_name.trim(),
    };

    if (mobileNumber) {
      payload.mobile_number = mobileNumber;
    }

    completeProfile(payload);
  };

  const errorMessage = (error as any)?.response?.data?.detail || "";

  return (
    <div className="auth-form-body pt-3 lg:pt-6">
      <ColorfulLogo />
      <h1 className="mt-4 text-2xl font-bold text-center text-white mb-8">
        تکمیل پروفایل
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <input
            className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
            placeholder="نام"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-200 text-xs mt-1 mr-2">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
            placeholder="نام خانوادگی"
            {...register("family_name")}
          />
          {errors.family_name && (
            <p className="text-red-200 text-xs mt-1 mr-2">
              {errors.family_name.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg
              ${
                isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
              }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              در حال ارسال...
            </span>
          ) : (
            "ثبت"
          )}
        </button>

        {(errorMessage || errors.name || errors.family_name) && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-100 text-sm py-2 px-4 rounded-lg text-center">
            {errorMessage || "لطفاً اطلاعات را صحیح وارد کنید"}
          </div>
        )}
      </form>
    </div>
  );
}
