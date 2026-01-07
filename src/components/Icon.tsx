import { Icon as IconifyIcon } from '@iconify/react';

// Map icon names to Iconify icon identifiers (using Material Design Icons)
const iconMap: Record<string, string> = {
  bill: 'mdi:receipt-text',
  car: 'mdi:car',
  bank: 'mdi:bank',
  travel: 'mdi:airplane',
  phone: 'mdi:phone',
  gas: 'mdi:gas-station',
  water: 'mdi:water',
  electricity: 'mdi:lightning-bolt',
  mobile: 'mdi:cellphone',
  shahrdari: 'mdi:city-variant',
  topUpCharge: 'mdi:battery-charging',
  topUpInternetPackage: 'mdi:wifi',
  roaming: 'mdi:earth',
  paperBill: 'mdi:file-document',
  trafficFines: 'mdi:traffic-light',
  motorTrafficFines: 'mdi:motorcycle',
  freeway: 'mdi:highway',
  annualToll: 'mdi:road',
  trafficPlan: 'mdi:map',
  carTax: 'mdi:car-multiple',
  motorTax: 'mdi:moped',
  plateNumber: 'mdi:numeric',
  carDocuments: 'mdi:file-document-multiple',
  negativePoint: 'mdi:minus-circle',
  drivingLicense: 'mdi:card-account-details',
  vehicleAuthenticity: 'mdi:shield-check',
  thirdPartyInquiry: 'mdi:shield-search',
  najiServicePlateNumberHistoryInquiry: 'mdi:history',
  cardToCard: 'mdi:credit-card-multiple',
  passport: 'mdi:passport',
  home: 'mdi:home',
  wallet: 'mdi:wallet',
  shopping: 'mdi:cart',
  app: 'mdi:apps',
  profile: 'mdi:account',
  support: 'mdi:help-circle',
  blog: 'mdi:blogger',
  accessTime: 'mdi:clock',
  close: 'mdi:close',
  logout: 'mdi:logout',
  list: 'mdi:format-list-bulleted',
};

export type IconName = keyof typeof iconMap;

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
};

export function Icon({ name, size = 20, className = '', style, color }: Props) {
  const iconifyIcon = iconMap[name];
  
  if (!iconifyIcon) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconifyIcon
      icon={iconifyIcon}
      width={size}
      height={size}
      className={className}
      style={{
        color: color || style?.color,
        ...style,
      }}
    />
  );
}
