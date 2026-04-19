import CompleteProfileContent from "@/features/auth/ui/CompleteProfileContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "تکمیل پروفایل | قبضینو",
  description: "تکمیل اطلاعات پروفایل کاربری در قبضینو",
  openGraph: {
    title: "تکمیل پروفایل قبضینو",
    description: "اطلاعات خود را تکمیل کنید",
    type: "website",
  },
};

export default function Page() {
  return <CompleteProfileContent />;
}