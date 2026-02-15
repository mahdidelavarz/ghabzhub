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
        { method: "POST" }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Verify OTP</h1>

        <input
          type="text"
          placeholder="Enter OTP Code"
          className="w-full border p-2 rounded"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}