'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_URL;

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
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // required if backend sets httpOnly cookie
        body: JSON.stringify({
          mobile_number: mobile,
          password,
        }),
      });

      setLoading(false);

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setMessage(data.detail || 'Login failed');
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