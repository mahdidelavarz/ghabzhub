import { ReactNode, SVGProps } from "react";

export type ServiceCategoryId = 'billAndMobile' | 'carAndCycle' | 'bank' | 'travel';

type ServiceItem = {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode | Promise<ReactNode>;
  to: string;
  disabled: boolean;
};

type Category = {
  id: ServiceCategoryId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode | Promise<ReactNode>;
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




