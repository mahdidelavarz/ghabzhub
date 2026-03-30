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

export type Services = {
  categories: Category[];
  billAndMobile: ServiceItem[];
  carAndCycle: ServiceItem[];
  bank: ServiceItem[];
  travel: ServiceItem[];
  dictionary: Record<string, string>;
};




