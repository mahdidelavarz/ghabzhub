"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/features/shared/ui/Logo";
import { useRegister } from "../hooks/useRegister";
import { registerSchema, RegisterFormData } from "../schemas/authSchemas";

export default function RegisterContent() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data, {
      onSuccess: (response) => {
        if (response.requires_verification) {
          router.push(`/verify-otp?mobile=${data.mobile_number}`);
        }
      },
    });
  };

  const errorMessage = (error as any)?.response?.data?.detail || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-blue-400 to-blue-300 p-4">
      <Logo className="absolute text-5xl top-40 text-blue-200" />
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md py-8 px-3 lg:px-8 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          ثبت نام
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="شماره موبایل"
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              {...registerField("mobile_number")}
            />
            {errors.mobile_number && (
              <p className="text-red-200 text-xs mt-1 mr-2">
                {errors.mobile_number.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              {...registerField("password")}
            />
            {errors.password && (
              <p className="text-red-200 text-xs mt-1 mr-2">
                {errors.password.message}
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
                در حال ثبت نام...
              </span>
            ) : (
              "ثبت نام"
            )}
          </button>

          {(errorMessage || errors.mobile_number || errors.password) && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-100 text-sm py-2 px-4 rounded-lg text-center">
              {errorMessage || "لطفاً اطلاعات را صحیح وارد کنید"}
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-blue-100 text-sm">
              اگر حساب کاربری دارید،{" "}
              <span
                className="font-semibold hover:text-white cursor-pointer transition-colors"
                onClick={() => router.push("/login")}
              >
                اینجا وارد شوید
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}