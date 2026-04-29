"use client"
import { ProfileWidget } from "@/features/auth/ui/ProfileWidget";
import { NavMobile } from "./NavMobile";
import { Logo } from "./Logo";
import { NavDesktop } from "./NavDesktop";
import { CardToCardIcon, ShoppingIcon } from "../icons/Icon";

export function NavBar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <NavMobile />
      <nav className=" top-0 left-0 w-full shadow-sm hidden md:block relative z-50 bg-custom-white">
        <div className="container w-11/12 mx-auto ">
          <div className="py-5">
            <div className="flex justify-between items-center">
              <Logo className="text-lg" />
              <NavDesktop />
              <div className="flex items-center gap-5 ">
                <ProfileWidget />
                <a
                  href="/shopping"
                  className="flex items-center gap-3 transition group duration-300 hover:scale-110 relative text-xs"
                >
                  <ShoppingIcon
                    className="rounded-lg p-[5px] bg-blue-200/70"
                  />
                  <span>سبد قبض</span>
                </a>
                <a
                  href="/history"
                  className="flex items-center gap-3 transition group duration-300 hover:scale-110 relative text-xs"
                >
                  <CardToCardIcon
                    className="rounded-lg text-custom-blue bg-custom-blue/20 p-[5px] bg-blue-200/70"
                  />
                  <span>سوابق پرداخت</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
