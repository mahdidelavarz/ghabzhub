"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API } from "@/config/api";

export default function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const extractMessage = (data: any) => {
    if (!data) return "Something went wrong";

    if (typeof data.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data.detail)) {
      return data.detail.map((err: any) => err.msg).join(", ");
    }

    return "Verification failed";
  };

  const handleVerify = async () => {
    if (!mobile) {
      setMessage("Mobile number missing");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API.AUTH.VERIFY_OTP}?mobile_number=${mobile}&code=${code}`,
        { method: "POST" },
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.detail === "Account verified") {
        router.push("/login");
      } else {
        setMessage(extractMessage(data));
      }
    } catch {
      setLoading(false);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 via-blue-400 to-blue-300 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md py-8 px-3 lg:px-8 border border-white/20">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          تایید کد ارسال‌شده
        </h1>

        <div className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="کد تایید را وارد کنید"
              className="w-full bg-white/90 text-gray-800 placeholder-gray-500 border-0 rounded-xl px-4 py-3 text-center text-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg
          ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
          }`}
          >
            {loading ? (
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
                در حال تایید...
              </span>
            ) : (
              "تایید"
            )}
          </button>

          {message && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-100 text-sm py-2 px-4 rounded-lg text-center">
              {message}
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-blue-100 text-sm">
              کد را دریافت نکردید؟{" "}
              <span
                className="font-semibold hover:text-white cursor-pointer transition-colors"
                // onClick={handleResend}
              >
                ارسال مجدد
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
