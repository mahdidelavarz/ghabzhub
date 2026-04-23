import LoginContent from "@/features/auth/ui/LoginContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "ورود | قبضینو",
  description: "ورود به حساب کاربری قبضینو برای استعلام پلاک فعال خودرو",
  openGraph: {
    title: "ورود به قبضینو",
    description: "به حساب کاربری خود وارد شوید",
    type: "website",
  },
};

export default function Page() {
  return <LoginContent />;
}