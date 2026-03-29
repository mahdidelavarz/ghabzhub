"use client";

import { useMemo, useState } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { services } from "../types/services";
import { LocalIcon } from "../icons/localIcon";

export function NavMobile() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  const bottomNav = useMemo(
    () => [
      { label: "خانه", to: "/", icon: "home" as const },
      { label: "سوابق", to: "/history", icon: "wallet" as const },
      { label: "سبد قبض", to: "/shopping", icon: "shopping" as const },
      { label: "منو", to: "?o=1", icon: "app" as const, isMenu: true },
    ],
    [],
  );

  const moreLinks = useMemo(
    () => [
      { label: "کیف پول من", to: "/wallet", icon: "wallet" as const },
      { label: "تراکنش های کیف پول", to: "/wallet", icon: "bank" as const },
      { label: "قبض های پرداخت شده", to: "/bills", icon: "bill" as const },
      { label: "پشتیبانی", to: "/support", icon: "support" as const },
      { label: "بلاگ", to: "/blog", icon: "blog" as const },
      { label: "نسخه سازمانی", to: "/org", icon: "accessTime" as const },
      { label: "خروج از حساب کاربری", to: "/logout", icon: "logout" as const },
    ],
    [],
  );

  return (
    <>
      <nav className="lg:hidden block z-30 fixed bottom-0 bg-custom-white rounded-t-3xl shadow-2xl shadow-black/70 border border-slate-100 left-1/2 -translate-x-1/2 w-full">
        <ul className="grid grid-cols-4 p-2 cursor-pointer">
          {bottomNav.map((item) => (
            <li key={item.label}>
              {item.isMenu ? (
                <button
                  type="button"
                  onClick={() => setMenuIsOpen(true)}
                  className="flex items-center max-sm:flex-col justify-center gap-x-3 py-2 w-full"
                >
                  <LocalIcon
                    name={item.icon}
                    size={40}
                    className="text-neutral-700"
                  />
                  <span className="text-sm">{item.label}</span>
                </button>
              ) : (
                <a
                  href={item.to}
                  className="link flex items-center max-sm:flex-col justify-center gap-x-3 py-2"
                >
                  <LocalIcon
                    name={item.icon}
                    size={40}
                    className="text-neutral-700"
                  />
                  <span className="text-sm">{item.label}</span>
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
              <LocalIcon name="close" size={40} className="text-white" />
            </button>
          </div>
          <div className="grid place-items-center gap-4">
            <LocalIcon
              name="profile"
              size={120}
              className="bg-custom-blue/40 rounded-full p-2 shadow-2xl shadow-custom-blue text-white"
            />
            <div className="flex items-center w-full justify-between px-2 py-1">
              {user ? (
                <p className="text-custom-white text-xl font-bold">
                  {user.name || user.mobile_number }
                </p>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-3 transition group duration-300 hover:scale-110 relative text-white"
                >
                  <LocalIcon
                    name="bill"
                    //"acountCircle"
                    size={35}
                    className="rounded-lg p-[5px] bg-blue-200/70"
                  />
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
                  <LocalIcon
                    name={service.icon as any}
                    size={40}
                    // color="#f8fafc"
                    className="p-2 rounded-2xl"
                    // style={{ backgroundColor: service.color }}
                  />
                  <p className="text-lg">{service.label}</p>
                </div>

                <ul className="group-hover:grid grid-cols-6 gap-2 hidden mt-4">
                  {items.map((item) => (
                    <li
                      key={item.label}
                      className="p-2 bg-custom-whitesmoke rounded-2xl grid place-items-center text-center"
                    >
                      <LocalIcon
                        name={item.icon as any}
                        size={30}
                        // color={service.color}
                      />
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
              {item.icon === "logout" ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuIsOpen(false);
                    logoutMutation.mutate();
                  }}
                  className="flex items-center gap-3 w-full text-right"
                  disabled={logoutMutation.isPending}
                >
                  <LocalIcon
                    name={item.icon as any}
                    size={40}
                    className="p-2 rounded-2xl"
                  />
                  <p className="text-lg">{item.label}</p>
                </button>
              ) : (
                <a href={item.to} className="flex items-center gap-3">
                  <LocalIcon
                    name={item.icon as any}
                    size={40}
                    className="p-2 rounded-2xl"
                  />
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
