'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '../../config/api';  // ✅ named import

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(API.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile_number: mobile,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        router.push('/');
      } else {
        const msg =
          typeof data.detail === 'string'
            ? data.detail
            : Array.isArray(data.detail)
            ? data.detail.map((e: any) => e.msg).join(', ')
            : 'Login failed';
        setMessage(msg);
      }
    } catch {
      setLoading(false);
      setMessage('مشکلی پیش آمد');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-xl font-bold text-center">ورود به حساب کاربری</h1>

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
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}

        {/* ✅ Link to register */}
        <p
          className="text-sm text-center text-blue-500 cursor-pointer hover:underline"
          onClick={() => router.push('/register')}
        >
          اگر ثبت نام نکرده‌اید، اینجا کلیک کنید
        </p>
      </div>
    </div>
  );
}