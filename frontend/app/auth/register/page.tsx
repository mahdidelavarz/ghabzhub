import RegisterContent from "@/features/auth/ui/RegisterContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "ثبت نام | قبضینو",
  description: "ثبت نام در سامانه قبضینو برای استعلام پلاک فعال خودرو",
};

export default function Page() {
  return <RegisterContent />;
}