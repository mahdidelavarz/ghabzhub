// features/modules/plateNumber/results/page.tsx
"use client";


import { Logo } from "@/features/shared/ui/Logo";
import { usePNEResultQuery } from "@/features/modules/plateNumber/hooks/usePNEResult";

export default function PlateResultsPage() {
  const { data } = usePNEResultQuery();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Logo className="absolute top-6 text-blue-600" />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 mt-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">استعلام با موفقیت انجام شد</h2>
        <p className="text-slate-500 mb-6">
          لیست پلاک‌های فعال شما در اینجا نمایش داده می‌شود.
        </p>
        {data}
      </div>
    </div>
  );
}
