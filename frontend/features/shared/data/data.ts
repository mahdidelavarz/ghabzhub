import { AnnualTollIcon, BankIcon, BillIcon, CarDocumentsIcon, CardToCardIcon, CarIcon, CarTaxIcon, DrivingLicenseIcon, ElectricityIcon, FreewayIcon, GasIcon, MobileIcon, MotorTaxIcon, MotorTrafficFinesIcon, NajiServicePlateNumberHistoryInquiryIcon, NegativePointIcon, PaperBillIcon, PassportIcon, PhoneIcon, PlateNumberIcon, RoamingIcon, ShahrdariIcon, ThirdPartyInquiryIcon, TopUpChargeIcon, TopUpInternetPackageIcon, TrafficFinesIcon, TravelIcon, VehicleAuthenticityIcon, WaterIcon } from "../icons/Icon";
import { Services } from "../types/services";

export const services: Services = {
  categories: [
    {
      id: "billAndMobile",
      label: "قبض و موبایل",
      icon: BillIcon,
      color: "#0078d7",
    },
    {
      id: "carAndCycle",
      label: "خودرو و موتور",
      icon: CarIcon,
      color: "#35c759",
    },
    { id: "bank", label: "خدمات بانکی", icon: BankIcon, color: "#ffa94d" },
    { id: "travel", label: "خدمات سفر", icon: TravelIcon, color: "#00bfa6" },
  ],
  billAndMobile: [
    {
      label: "تلفن",
      icon: PhoneIcon,
      to: "/phone",
      disabled: true,
    },
    {
      label: "گاز",
      icon: GasIcon,
      to: "/gas",
      disabled: true,
    },
    {
      label: "آب",
      icon: WaterIcon,
      to: "/water",
      disabled: true,
    },
    {
      label: "برق",
      icon: ElectricityIcon,
      to: "/water",
      disabled: true,
    },
    {
      label: "موبایل",
      icon: MobileIcon,
      to: "/mobile",
      disabled: true,
    },
    {
      label: "عوارض ملک",
      icon: ShahrdariIcon,
      to: "/shahrdari",
      disabled: true,
    },
    {
      label: "شارژ",
      icon: TopUpChargeIcon,
      to: "/to-up-charge",
      disabled: true,
    },
    {
      label: "اینترنت",
      icon: TopUpInternetPackageIcon,
      to: "/to-up-internet-package",
      disabled: true,
    },
    {
      label: "بسته رومینگ",
      icon: RoamingIcon,
      to: "/roaming",
      disabled: true,
    },
    {
      label: "TD-LTE",
      icon: MobileIcon,
      to: "/td-lte",
      disabled: true,
    },
    {
      label: "سایر قبوض",
      icon: PaperBillIcon,
      to: "/td-lte",
      disabled: true,
    },
  ],
  carAndCycle: [
    {
      label: "خلافی خودرو",
      icon: TrafficFinesIcon,
      to: "/traffic-fines",
      disabled: true,
    },
    {
      label: "خلافی موتور",
      icon: MotorTrafficFinesIcon,
      to: "/motor-traffic-fines",
      disabled: true,
    },
    {
      label: "عوارض راه",
      icon: FreewayIcon,
      to: "/freeway",
      disabled: true,
    },
    {
      label: "عوارض سالیانه",
      icon: AnnualTollIcon,
      to: "/annual-toll",
      disabled: true,
    },
    {
      label: "مالیات خوردو",
      icon: CarTaxIcon,
      to: "/car-tax",
      disabled: true,
    },
    {
      label: "مالیات موتور",
      icon: MotorTaxIcon,
      to: "/motor-tax",
      disabled: true,
    },
    {
      label: "پلاک های فعال",
      icon: PlateNumberIcon,
      to: "/plate-number",
      disabled: false,
    },
    {
      label: "مدارک خودرو",
      icon: CarDocumentsIcon,
      to: "/car-documents",
      disabled: true,
    },
    {
      label: "نمره منفی",
      icon: NegativePointIcon,
      to: "/negative-point",
      disabled: true,
    },
    {
      label: "وضعیت گواهینامه",
      icon: DrivingLicenseIcon,
      to: "/driving-license",
      disabled: true,
    },
    {
      label: "استعلام سوابق خودرو",
      icon: VehicleAuthenticityIcon,
      to: "/vehicle-authenticity",
      disabled: true,
    },
    {
      label: "استعلام بیمه",
      icon: ThirdPartyInquiryIcon,
      to: "/third-party-inquiry",
      disabled: true,
    },
    {
      label: "تاریخچه پلاک",
      icon: NajiServicePlateNumberHistoryInquiryIcon,
      to: "/naji-service-plate-number-history-inquiry",
      disabled: true,
    },
  ],
  bank: [
    {
      label: "کارت به کارت",
      icon: CardToCardIcon,
      to: "/card-to-card",
      disabled: true,
    },
  ],
  travel: [
    {
      label: "خدمات سفر",
      icon: PassportIcon,
      to: "/passport",
      disabled: true,
    },
  ],
  dictionary: {
    mobile: "قبض موبایل همراه",
  },
};
