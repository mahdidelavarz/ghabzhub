// src/features/shared/icons/LocalIcon.tsx
import Image from "next/image";

// Static imports — Next.js resolves .svg to URLs
import BillIcon from "./svg/bill.svg";
import CarIcon from "./svg/car.svg";
import BankIcon from "./svg/bank.svg";
import TravelIcon from "./svg/travel.svg";
import PhoneIcon from "./svg/phone.svg";
import GasIcon from "./svg/gas.svg";
import WaterIcon from "./svg/water.svg";
import ElectricityIcon from "./svg/electricity.svg";
import MobileIcon from "./svg/mobile.svg";
import ShahrdariIcon from "./svg/shahrdari.svg";
import TopUpChargeIcon from "./svg/topUpCharge.svg";
import TopUpInternetPackageIcon from "./svg/topUpInternetPackage.svg";
import RoamingIcon from "./svg/roaming.svg";
import PaperBillIcon from "./svg/paperBill.svg";
import TrafficFinesIcon from "./svg/trafficFines.svg";
import MotorTrafficFinesIcon from "./svg/motorTrafficFines.svg";
import FreewayIcon from "./svg/freeway.svg";
import AnnualTollIcon from "./svg/annualToll.svg";
import TrafficPlanIcon from "./svg/trafficPlan.svg";
import CarTaxIcon from "./svg/carTax.svg";
import MotorTaxIcon from "./svg/motorTax.svg";
import PlateNumberIcon from "./svg/plateNumber.svg";
import CarDocumentsIcon from "./svg/carDocuments.svg";
import NegativePointIcon from "./svg/negativePoint.svg";
import DrivingLicenseIcon from "./svg/drivingLicense.svg";
import VehicleAuthenticityIcon from "./svg/vehicleAuthenticity.svg";
import ThirdPartyInquiryIcon from "./svg/thirdPartyInquiry.svg";
import NajiServicePlateNumberHistoryInquiryIcon from "./svg/najiServicePlateNumberHistoryInquiry.svg";
import CardToCardIcon from "./svg/cardToCard.svg";
import PassportIcon from "./svg/passport.svg";
import HomeIcon from "./svg/home.svg";
import WalletIcon from "./svg/wallet.svg";
import ShoppingIcon from "./svg/shopping.svg";
import AppIcon from "./svg/app.svg";
import ProfileIcon from "./svg/profile.svg";
import SupportIcon from "./svg/support.svg";
import BlogIcon from "./svg/blog.svg";
import AccessTimeIcon from "./svg/accessTime.svg";
import CloseIcon from "./svg/close.svg";
import LogoutIcon from "./svg/logout.svg";
import ListIcon from "./svg/list.svg";
import ArrowDownIcon from "./svg/arrowDown.svg";
import CheckIcon from "./svg/check.svg";
import ErrorIcon from "./svg/error.svg";
import FlagIranIcon from "./svg/flag-iran.svg";
import InfoIcon from "./svg/info.svg";
import InstagramIcon from "./svg/instagram.svg";
import MinusIcon from "./svg/minus.svg";
import PlusIcon from "./svg/plus.svg";
import RefreshIcon from "./svg/refresh.svg";
import SuccessIcon from "./svg/success.svg";
import Svgexport74Icon from "./svg/svgexport-74.svg";
import Svgexport77Icon from "./svg/svgexport-77.svg";
import Svgexport79Icon from "./svg/svgexport-79.svg";
import TrashIcon from "./svg/trash.svg";
import UserProfileIcon from "./svg/userprofile.svg";
import WarningIcon from "./svg/warning.svg";

// Map icon names to image URLs
const iconUrls = {
  bill: BillIcon,
  car: CarIcon,
  bank: BankIcon,
  travel: TravelIcon,
  phone: PhoneIcon,
  gas: GasIcon,
  water: WaterIcon,
  electricity: ElectricityIcon,
  mobile: MobileIcon,
  shahrdari: ShahrdariIcon,
  topUpCharge: TopUpChargeIcon,
  topUpInternetPackage: TopUpInternetPackageIcon,
  roaming: RoamingIcon,
  paperBill: PaperBillIcon,
  trafficFines: TrafficFinesIcon,
  motorTrafficFines: MotorTrafficFinesIcon,
  freeway: FreewayIcon,
  annualToll: AnnualTollIcon,
  trafficPlan: TrafficPlanIcon,
  carTax: CarTaxIcon,
  motorTax: MotorTaxIcon,
  plateNumber: PlateNumberIcon,
  carDocuments: CarDocumentsIcon,
  negativePoint: NegativePointIcon,
  drivingLicense: DrivingLicenseIcon,
  vehicleAuthenticity: VehicleAuthenticityIcon,
  thirdPartyInquiry: ThirdPartyInquiryIcon,
  najiServicePlateNumberHistoryInquiry:
    NajiServicePlateNumberHistoryInquiryIcon,
  cardToCard: CardToCardIcon,
  passport: PassportIcon,
  home: HomeIcon,
  wallet: WalletIcon,
  shopping: ShoppingIcon,
  app: AppIcon,
  profile: ProfileIcon,
  support: SupportIcon,
  blog: BlogIcon,
  accessTime: AccessTimeIcon,
  close: CloseIcon,
  logout: LogoutIcon,
  list: ListIcon,
  ArrowDownIcon: ArrowDownIcon,
  Check: CheckIcon,
  Error: ErrorIcon,
  FlagIran: FlagIranIcon,
  InfoIcon: InfoIcon,
  Instagram: InstagramIcon,
  Minus: MinusIcon,
  Plus: PlusIcon,
  Refresh: RefreshIcon,
  Success: SuccessIcon,
  Svgexport74: Svgexport74Icon,
  Svgexport77: Svgexport77Icon,
  Svgexport79: Svgexport79Icon,
  Trash: TrashIcon,
  UserProfile: UserProfileIcon,
  Warning: WarningIcon,
} as const;

export type IconName = keyof typeof iconUrls;

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
};

export function LocalIcon({
  name,
  size = 24,
  className = "text-red-400",
  alt = "",
}: Props) {
  const src = iconUrls[name];

  if (!src) {
    console.warn(`LocalIcon: Icon "${name}" not found.`);
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
      unoptimized // SVGs don’t need optimization; avoids unnecessary processing
    />
  );
}
