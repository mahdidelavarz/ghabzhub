export type ServiceCategoryId = 'billAndMobile' | 'carAndCycle' | 'bank' | 'travel';

type ServiceItem = {
  label: string;
  icon: string;
  to: string;
  disabled: boolean;
};

type Category = {
  id: ServiceCategoryId;
  label: string;
  icon: string;
  color: string;
};

type Services = {
  categories: Category[];
  billAndMobile: ServiceItem[];
  carAndCycle: ServiceItem[];
  bank: ServiceItem[];
  travel: ServiceItem[];
  dictionary: Record<string, string>;
};

export const services: Services = {
  categories: [
    { id: 'billAndMobile', label: 'قبض و موبایل', icon: 'bill', color: '#0078d7' },
    { id: 'carAndCycle', label: 'خودرو و موتور', icon: 'car', color: '#35c759' },
    { id: 'bank', label: 'خدمات بانکی', icon: 'bank', color: '#ffa94d' },
    { id: 'travel', label: 'خدمات سفر', icon: 'bill', color: '#00bfa6' },
  ],
  billAndMobile: [
    {
      label: 'تلفن',
      icon: 'phone',
      to: '/phone',
      disabled: true,
    },
    {
      label: 'گاز',
      icon: 'gas',
      to: '/gas',
      disabled: true,
    },
    {
      label: 'آب',
      icon: 'water',
      to: '/water',
      disabled: true,
    },
    {
      label: 'برق',
      icon: 'electricity',
      to: '/water',
      disabled: true,
    },
    {
      label: 'موبایل',
      icon: 'mobile',
      to: '/mobile',
      disabled: false,
    },
    {
      label: 'عوارض ملک',
      icon: 'shahrdari',
      to: '/shahrdari',
      disabled: true,
    },
    {
      label: 'شارژ',
      icon: 'topUpCharge',
      to: '/to-up-charge',
      disabled: true,
    },
    {
      label: 'اینترنت',
      icon: 'topUpInternetPackage',
      to: '/to-up-internet-package',
      disabled: true,
    },
    {
      label: 'بسته رومینگ',
      icon: 'roaming',
      to: '/roaming',
      disabled: true,
    },
    {
      label: 'TD-LTE',
      icon: 'mobile',
      to: '/td-lte',
      disabled: true,
    },
    {
      label: 'سایر قبوض',
      icon: 'paperBill',
      to: '/td-lte',
      disabled: true,
    },
  ],
  carAndCycle: [
    {
      label: 'خلافی خودرو',
      icon: 'trafficFines',
      to: '/traffic-fines',
      disabled: true,
    },
    {
      label: 'خلافی موتور',
      icon: 'motorTrafficFines',
      to: '/motor-traffic-fines',
      disabled: true,
    },
    {
      label: 'عوارض راه',
      icon: 'freeway',
      to: '/freeway',
      disabled: true,
    },
    {
      label: 'عوارض سالیانه',
      icon: 'annualToll',
      to: '/annual-toll',
      disabled: true,
    },
    // {
    //   label: 'عوارض سالیانه',
    //   icon: 'trafficPlan',
    //   to: '/traffic-plan',
    //   disabled: true,
    // },
    {
      label: 'مالیات خوردو',
      icon: 'carTax',
      to: '/car-tax',
      disabled: true,
    },
    {
      label: 'مالیات موتور',
      icon: 'motorTax',
      to: '/motor-tax',
      disabled: true,
    },
    {
      label: 'پلاک های فعال',
      icon: 'plateNumber',
      to: '/plate-number',
      disabled: true,
    },
    // {
    //   label: 'پلاک های فعال',
    //   icon: 'plateNumber',
    //   to: '/plate-number',
    //   disabled: true,
    // },
    {
      label: 'مدارک خودرو',
      icon: 'carDocuments',
      to: '/car-documents',
      disabled: true,
    },
    {
      label: 'نمره منفی',
      icon: 'negativePoint',
      to: '/negative-point',
      disabled: true,
    },
    {
      label: 'وضعیت گواهینامه',
      icon: 'drivingLicense',
      to: '/driving-license',
      disabled: true,
    },
    {
      label: 'استعلام سوابق خودرو',
      icon: 'vehicleAuthenticity',
      to: '/vehicle-authenticity',
      disabled: true,
    },
    {
      label: 'استعلام بیمه',
      icon: 'thirdPartyInquiry',
      to: '/third-party-inquiry',
      disabled: true,
    },
    {
      label: 'تاریخچه پلاک',
      icon: 'najiServicePlateNumberHistoryInquiry',
      to: '/naji-service-plate-number-history-inquiry',
      disabled: true,
    },
  ],
  bank: [
    {
      label: 'کارت به کارت',
      icon: 'cardToCard',
      to: '/card-to-card',
      disabled: true,
    },
  ],
  travel: [
    {
      label: 'خدمات سفر',
      icon: 'passport',
      to: '/passport',
      disabled: true,
    },
  ],
  dictionary: {
    mobile: 'قبض موبایل همراه',
  },
};


