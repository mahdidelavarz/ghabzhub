"use client";
import { useEffect, useState, useRef } from "react";

import { Logo } from "./Logo";
import { LocalIcon } from "../icons/localIcon";
import { services } from "../data/data";

export function Header() {
  const [scrollOnTarget, setScrollOnTarget] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
              setIsScrolling(true);
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
              scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
              }, 150);
            }

            if (!isScrolling || Math.abs(currentScrollY - 80) > 30) {
              setScrollOnTarget(currentScrollY > 80);
            }
          } else {
            setScrollOnTarget(currentScrollY > 150);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isScrolling]);

  const offsetClass = scrollOnTarget
    ? typeof window !== 'undefined' && window.innerWidth < 768
      ? "-translate-y-35"
      : "-translate-y-30 md:-translate-y-15"
    : "";

  // Don't render on server to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto z-10 mb-18 md:mb-0 md:my-18 sticky top-0 left-0">
        <div className="px-6 pt-7 header rounded-b-[50px] text-center">
          <div className="md:hidden inline-block mb-3 text-4xl text-custom-white">
            <Logo />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto z-10 mb-18 md:mb-0 md:my-18 sticky top-0 left-0 transition duration-300 ${offsetClass}`}
    >
      <div className="px-6 pt-7 header rounded-b-[50px] text-center">
        <div className="md:hidden inline-block mb-3 text-4xl text-custom-white">
          <Logo />
        </div>
        <h1
          className={`text-custom-white md:text-2xl font-bold ${scrollOnTarget ? "opacity-0 invisible" : ""}`}
        >
          <span className="hidden md:inline-block mb-3 text-4xl text-custom-white">
            <Logo className="ml-10" />
          </span>
          سامانه پرداخت قبض <span className="text-2xl">هوشمند</span>
        </h1>
        <h2
          className={`text-custom-white md:text-2xl text-lg font-bold transition duration-700 ${
            scrollOnTarget ? "opacity-0 invisible" : ""
          }`}
        >
          تجمیع و تسهیل در پرداخت قبوض
        </h2>

        <div className="md:w-7/12 w-12/12 mx-auto rounded-[25px] translate-y-1/2 grid grid-cols-4 md:gap-6 gap-1">
          {services.categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="hover:scale-110 transition py-2 px- grid place-items-center md:w-24 md:h-24 w-full cursor-pointer rounded-[25px] bg-custom-white shadow-2xl shadow-custom-neutral/20"
              suppressHydrationWarning
            >
              <LocalIcon
                name={category.icon as any}
                size={45}
                className="w-9.5 h-9.5"
                color={category.color}
              />
              <span
                className={`text-[10px] font-semibold text-nowrap ${scrollOnTarget && "hidden"}`}
                suppressHydrationWarning
              >
                {category.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}