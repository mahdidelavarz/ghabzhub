import { BillingList } from './BillingList';
import { Icon } from './Icon';
import { useState } from 'react';

type NavItem = {
  label: string;
  to: string;
  icon?: 'bill' | 'car' | 'bank' | 'travel' | 'list';
  hasChildren?: boolean;
};

const navItems: NavItem[] = [
  {
    label: 'خدمات پرداخت',
    to: '#services',
    icon: 'list',
    hasChildren: true,
  },
  { label: 'نسخه شرکت ها', to: '/' },
  { label: 'بلاگ', to: '/blog' },
  { label: 'پشتیبانی', to: '/support' },
];

export function NavDesktop() {
  const [serviceModal, setServiceModal] = useState(false);

  return (
    <>
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="text-sm flex cursor-pointer items-center gap-3 transition hover:scale-95 group hover:text-custom-blue"
            onClick={(e) => {
              if (item.hasChildren) {
                e.preventDefault();
                setServiceModal(true);
              }
            }}
          >
            <a href={item.to}>{item.label}</a>
            {item.icon && (
              <Icon
                name={item.icon}
                size={25}
                className="text-neutral-600 group-hover:text-custom-blue"
              />
            )}
          </li>
        ))}
      </ul>

      {serviceModal && (
        <div className="modal fixed top-0 left-0 w-full h-screen overflow-y-auto py-4 z-10 bg-custom-neutral/20">
          <div className="modal-dialog w-full h-full grid place-items-center">
            <div className="modal-content bg-custom-white border max-h-[95vh] overflow-y-auto border-slate-100 rounded-[25px] w-5/12">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">خدمات پرداخت</p>
                  <button onClick={() => setServiceModal(false)}>
                    <Icon name="close" size={20} />
                  </button>
                </div>
                <BillingList
                  cssStyles="grid grid-cols-4 gap-y-7 max-md:grid-cols-4 mt-9"
                  titles={[
                    'خدمات قبض و موبایل',
                    'خدمات خودرو و موتور',
                    'خدمات بانکی',
                    'خدمات سفر',
                  ]}
                  lists={['billAndMobile', 'carAndCycle', 'bank', 'travel']}
                  colors={['#0078d7', '#35c759', '#ffa94d', '#00bfa6']}
                  icons={['bill', 'car', 'bank', 'travel']}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


