import VerifyOtpContent from "@/features/auth/ui/VerifyOtpContent";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}