import { Icon as IconifyIcon } from "@iconify/react";
import { SVGProps } from "react";

// Map icon names to Iconify icon identifiers (using Material Design Icons)
const iconMap: Record<string, string> = {
  bill: "mdi:receipt-text",
  car: "mdi:car",
  bank: "mdi:bank",
  travel: "mdi:airplane",
  phone: "mdi:phone",
  gas: "mdi:gas-station",
  water: "mdi:water",
  electricity: "mdi:lightning-bolt",
  mobile: "mdi:cellphone",
  shahrdari: "mdi:city-variant",
  topUpCharge: "mdi:battery-charging",
  topUpInternetPackage: "mdi:wifi",
  roaming: "mdi:earth",
  paperBill: "mdi:file-document",
  trafficFines: "mdi:traffic-light",
  motorTrafficFines: "mdi:motorcycle",
  freeway: "mdi:highway",
  annualToll: "mdi:road",
  trafficPlan: "mdi:map",
  carTax: "mdi:car-multiple",
  motorTax: "mdi:moped",
  plateNumber: "mdi:numeric",
  carDocuments: "mdi:file-document-multiple",
  negativePoint: "mdi:minus-circle",
  drivingLicense: "mdi:card-account-details",
  vehicleAuthenticity: "mdi:shield-check",
  thirdPartyInquiry: "mdi:shield-search",
  najiServicePlateNumberHistoryInquiry: "mdi:history",
  cardToCard: "mdi:credit-card-multiple",
  passport: "mdi:passport",
  home: "mdi:home",
  wallet: "mdi:wallet",
  shopping: "mdi:cart",
  app: "mdi:apps",
  profile: "mdi:account",
  support: "mdi:help-circle",
  blog: "mdi:blogger",
  accessTime: "mdi:clock",
  close: "mdi:close",
  logout: "mdi:logout",
  list: "mdi:format-list-bulleted",
  account_circle: "mdi:account-circle",
};

export type IconName = keyof typeof iconMap;

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
};

export function Icon({ name, size = 20, className = "", style, color }: Props) {
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
//! example of svg component
// export function SolarBellBroken(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={24}
//       height={24}
//       viewBox="0 0 24 24"
//       {...props}
//     >
//       <path
//         fill="none"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeWidth={1.5}
//         d="M9.107 2.674A6.5 6.5 0 0 1 12 2c3.727 0 6.75 3.136 6.75 7.005v.705a4.4 4.4 0 0 0 .692 2.375l1.108 1.724c1.011 1.575.239 3.716-1.52 4.214a25.8 25.8 0 0 1-14.06 0c-1.759-.498-2.531-2.639-1.52-4.213l1.108-1.725A4.4 4.4 0 0 0 5.25 9.71v-.705c0-1.074.233-2.092.65-3.002M7.5 19c.655 1.748 2.422 3 4.5 3q.367 0 .72-.05M16.5 19a4.5 4.5 0 0 1-1.302 1.84"
//       ></path>
//     </svg>
//   );
// }

export function PlateNumberIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M10 3.86h9.1a2.95 2.95 0 0 1 2.95 2.94v1.33h-8.8A6.3 6.3 0 0 0 10 3.85m-3.05.4a5 5 0 1 0 0 10 5 5 0 0 0 0-10m2.7 3.97-2.86 2.86q-.17.16-.41.17c-.24 0-.3-.06-.41-.17L4.43 9.54c-.22-.22-.22-.6 0-.81s.59-.22.8 0l1.14 1.13L8.83 7.4a.6.6 0 0 1 .8 0c.23.22.23.59 0 .8z"></path>
      <path d="M13.4 9.48A6.36 6.36 0 0 1 3.94 15v2.2a2.94 2.94 0 0 0 2.94 2.94h12.28c1.6 0 2.89-1.29 2.89-2.89V9.47zm-1.52 8.67c-.3 0-.5-.23-.5-.52s.2-.52.5-.52.5.23.5.52-.21.52-.5.52m2.38-.07h-.83V14.4h.83zm3.19 0-.7-1.32h-.46v1.32h-.83V14.4h1.32c.78 0 1.42.27 1.42 1.15 0 .54-.26.88-.66 1.06l.83 1.47zm2.38.07c-.3 0-.5-.23-.5-.52s.2-.52.5-.52.5.23.5.52-.21.52-.5.52"></path>
      <path d="M16.72 15.06h-.43v1.03h.43q.66 0 .67-.55c0-.55-.23-.49-.67-.49z"></path>
    </svg>
  );
}
