"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/config/api";

export default function RegisterPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(API.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_number: mobile,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.requires_verification) {
        router.push(`/verify-otp?mobile=${mobile}`);
      } else {
        setMessage(data.detail || "Registration failed");
      }
    } catch {
      setLoading(false);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">ثبت نام</h1>

        <input
          type="text"
          placeholder="شماره موبایل"
          className="w-full border p-2 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمز عبور"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
