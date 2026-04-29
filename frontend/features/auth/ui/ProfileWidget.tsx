"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react";
import { useLogout } from "../hooks/useLogout";
import { useProfileQuery } from "../hooks/useProfileQuery";
import { useAuthStore } from "../store/authStore";
import { ProfileIcon } from "@/features/shared/icons/Icon";

export function ProfileWidget() {
  useProfileQuery();
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const logoutMutation = useLogout();

  const toggleMenu = () => setOpen((prev) => !prev);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    router.push("/auth/complete-profile");
    setOpen(false);
  };

  const handleLogoutClick = () => {
    logoutMutation.mutate();
    setOpen(false);
  };

  if (!user) {
    return (
      <a
        href="/auth/login"
        className="flex items-center gap-3 transition group duration-300 hover:scale-110 relative text-xs"
      >
        <ProfileIcon
          className="text-custom-blue rounded-lg p-1.25 bg-blue-200/70 w-10 h-10"
        />
        <span>ورود به حساب</span>
      </a>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className="flex items-center gap-3 cursor-pointer transition group duration-300 hover:scale-110 text-xs"
      >
        <ProfileIcon
          className="text-custom-blue rounded-lg p-1.25 bg-blue-200/70 w-10 h-10"
        />
        <span>{user.name || user.mobile_number}</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
          <button
            onClick={handleProfileClick}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            پروفایل
          </button>
          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
