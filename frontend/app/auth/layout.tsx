import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghabzhub - auth",
  description: "authentication in ghabzhub",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-dvh bg-linear-to-br from-blue-700 via-blue-500 to-blue-400 flex items-center justify-center px-3">
      {children}
    </div>
  );
}
