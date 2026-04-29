"use client";

import { Suspense, useMemo, useState } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";

import { services } from "../data/data";
import { usePathname } from "next/navigation";
import {
  AccessTimeIcon,
  AppIcon,
  BankIcon,
  BillIcon,
  BlogIcon,
  CloseIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  ShoppingIcon,
  SupportIcon,
  WalletIcon,
} from "../icons/Icon";

function NavMobileComponent() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();
  const pathname = usePathname();

  const bottomNav = useMemo(
    () => [
      { label: "خانه", to: "/", icon: HomeIcon, color: "#3b82f6" },
      {
        label: "سوابق",
        to: "/history",
        icon: WalletIcon,
        color: "#10b981",
      },
      {
        label: "سبد قبض",
        to: "/shopping",
        icon: ShoppingIcon,
        color: "#f59e0b",
      },
      {
        label: "منو",
        to: "?o=1",
        icon: AppIcon,
        isMenu: true,
        color: "#8b5cf6",
      },
    ],
    [],
  );

  const moreLinks = useMemo(
    () => [
      {
        label: "کیف پول من",
        to: "/wallet",
        icon: WalletIcon,
        color: "#10b981",
      },
      {
        label: "تراکنش های کیف پول",
        to: "/wallet",
        icon: BankIcon,
        color: "#ef4444",
      },
      {
        label: "قبض های پرداخت شده",
        to: "/bills",
        icon: BillIcon,
        color: "#3b82f6",
      },
      {
        label: "پشتیبانی",
        to: "/support",
        icon: SupportIcon,
        color: "#8b5cf6",
      },
      { label: "بلاگ", to: "/blog", icon: BlogIcon, color: "#ec4899" },
      {
        label: "نسخه سازمانی",
        to: "/org",
        icon: AccessTimeIcon,
        color: "#06b6d4",
      },
      {
        label: "خروج از حساب کاربری",
        to: "/logout",
        icon: LogoutIcon,
        color: "#ef4444",
      },
    ],
    [],
  );
  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <>
      <nav className="md:hidden block z-30 fixed bottom-0 bg-custom-white rounded-t-3xl shadow-2xl shadow-black/70 border border-slate-100 left-1/2 -translate-x-1/2 w-full">
        <ul className="grid grid-cols-4 p-2 cursor-pointer">
          {bottomNav.map((item) => (
            <li key={item.label}>
              {item.isMenu ? (
                <button
                  type="button"
                  onClick={() => setMenuIsOpen(true)}
                  className="flex items-center max-sm:flex-col justify-center gap-x-3 py-2 w-full"
                >
                  <item.icon className="text-neutral-500" color={item.color} />
                  <span className="text-sm text-neutral-500">{item.label}</span>
                </button>
              ) : (
                <a
                  href={item.to}
                  className="link flex items-center max-sm:flex-col justify-center gap-x-3 py-2"
                >
                  <item.icon
                    className={
                      isActive(item.to) ? "text-blue-600" : "text-neutral-500"
                    }
                    color={isActive(item.to) ? item.color : undefined}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: isActive(item.to) ? item.color : "#737373",
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`fixed lg:hidden pb-28 z-20 top-0 left-0 w-full opacity-0 transition h-screen overflow-y-auto bg-custom-white translate-x-full ${
          menuIsOpen ? "opacity-100 !translate-x-0" : ""
        }`}
      >
        <div className="menu-header">
          <div className="flex justify-end">
            <button type="button" onClick={() => setMenuIsOpen(false)}>
              <CloseIcon className="text-white" />
            </button>
          </div>
          <div className="grid place-items-center gap-4">
            <ProfileIcon className="bg-custom-blue/40 rounded-full p-2 shadow-2xl shadow-custom-blue text-white" />
            <div className="flex items-center w-full justify-between px-2 py-1">
              {user ? (
                <p className="text-custom-white text-xl font-bold">
                  {user.name || user.mobile_number}
                </p>
              ) : (
                <a
                  href="/auth/login"
                  className="flex items-center gap-3 transition group duration-300 hover:scale-110 relative text-white"
                >
                  <BillIcon className="rounded-lg p-[5px] bg-blue-200/70" />
                  <span>ورود به حساب</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <ul className="mt-3">
          {services.categories.map((service) => {
            const items = services[service.id];
            return (
              <li
                key={service.id}
                className="p-3 transition group hover:scale-95"
              >
                <div className="flex items-center gap-3">
                  <service.icon
                    color={service.color}
                    className="p-2 rounded-2xl"
                  />
                  <p className="text-lg">{service.label}</p>
                </div>

                <ul className="group-hover:grid grid-cols-6 gap-2 hidden mt-4">
                  {items.map((item) => (
                    <li
                      key={item.label}
                      className="p-2 bg-custom-whitesmoke rounded-2xl grid place-items-center text-center"
                    >
                      <item.icon color={service.color} />
                      <p className="text-xs">{item.label}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <br />
        <hr />
        <br />
        <ul className="mt-3">
          {moreLinks.map((item) => (
            <li
              key={item.label}
              className="p-3 transition group hover:scale-95"
            >
              {item.icon === LogoutIcon ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuIsOpen(false);
                    logoutMutation.mutate();
                  }}
                  className="flex items-center gap-3 w-full text-right"
                  disabled={logoutMutation.isPending}
                >
                  <item.icon className="p-2 rounded-2xl" color={item.color} />
                  <p className="text-lg">{item.label}</p>
                </button>
              ) : (
                <a href={item.to} className="flex items-center gap-3">
                  <item.icon className="p-2 rounded-2xl" color={item.color} />
                  <p className="text-lg">{item.label}</p>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function NavMobile() {
  return (
    <Suspense
      fallback={
        <div className="md:hidden block z-30 fixed bottom-0 bg-custom-white rounded-t-3xl shadow-2xl shadow-black/70 border border-slate-100 left-1/2 -translate-x-1/2 w-full h-16">
          {/* Skeleton loader matching the nav height */}
        </div>
      }
    >
      <NavMobileComponent />
    </Suspense>
  );
}
