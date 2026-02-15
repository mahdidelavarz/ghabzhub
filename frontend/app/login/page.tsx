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
        // removed credentials
        body: JSON.stringify({
          mobile_number: mobile,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.access_token) {
        // store JWT in localStorage
        localStorage.setItem('access_token', data.access_token);
        router.push('/');
      } else {
        // handle string or structured error safely
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
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
}