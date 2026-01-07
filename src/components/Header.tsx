import { useEffect, useState } from 'react';
import { services } from '../services';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function Header() {
  const [scrollOnTarget, setScrollOnTarget] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollOnTarget(window.scrollY > 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const offsetClass = scrollOnTarget ? '-translate-y-12' : '';

  return (
    <div
      className={`container mx-auto z-10 my-18 sticky top-0 left-0 transition duration-500 ${offsetClass}`}
    >
      <div className="px-6 pt-7 header rounded-b-[50px] text-center">
        <div className="md:hidden inline-block mb-3 text-4xl text-custom-white">
          <Logo />
        </div>
        <h1 className="text-custom-white md:text-2xl font-bold">
          <span className="hidden md:inline-block mb-3 text-4xl text-custom-white">
            <Logo />
          </span>
          سامانه پرداخت قبض <span className="text-2xl">هوشمند</span>
        </h1>
        <h2
          className={`text-custom-white md:text-2xl text-lg font-bold transition duration-700 ${
            scrollOnTarget ? 'opacity-0' : ''
          }`}
        >
          تجمیع و تسهیل در پرداخت قبوض
        </h2>

        <div className="md:w-7/12 w-10/12 mx-auto rounded-[25px] translate-y-1/2 grid grid-cols-4 md:gap-6 gap-2">
          {services.categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="hover:scale-110 transition py-2 px-1 grid place-items-center md:w-24 md:h-24 w-full cursor-pointer rounded-[25px] bg-custom-white shadow-2xl shadow-custom-neutral/20"
            >
              <Icon
                name={category.icon as any}
                size={45}
                className="w-[45px] h-[45px]"
                color={category.color}
              />
              <span className="text-xs">{category.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


