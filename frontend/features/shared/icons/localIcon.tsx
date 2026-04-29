// import {
//   BillIcon,
//   CarIcon,
//   AppIcon,
//   BankIcon,
//   TravelIcon,
//   PhoneIcon,
//   GasIcon,
//   WaterIcon,
//   ElectricityIcon,
//   MobileIcon,
//   ShahrdariIcon,
//   TopUpChargeIcon,
//   TopUpInternetPackageIcon,
//   RoamingIcon,
//   PaperBillIcon,
//   TrafficFinesIcon,
//   MotorTrafficFinesIcon,
//   FreewayIcon,
//   AnnualTollIcon,
//   TrafficPlanIcon,
//   CarTaxIcon,
//   MotorTaxIcon,
//   PlateNumberIcon,
//   CarDocumentsIcon,
//   NegativePointIcon,
//   DrivingLicenseIcon,
//   VehicleAuthenticityIcon,
//   ThirdPartyInquiryIcon,
//   NajiServicePlateNumberHistoryInquiryIcon,
//   CardToCardIcon,
//   PassportIcon,
//   HomeIcon,
//   WalletIcon,
//   ShoppingIcon,
//   ProfileIcon,
//   SupportIcon,
//   BlogIcon,
//   AccessTimeIcon,
//   CloseIcon,
//   LogoutIcon,
//   ListIcon,
//   ArrowDownIcon,
//   CheckIcon,
//   ErrorIcon,
//   FlagIranIcon,
//   InfoIcon,
//   InstagramIcon,
//   MinusIcon,
//   PlusIcon,
//   RefreshIcon,
//   SuccessIcon,
//   TechnicalInspectionIcon,
//   TrashIcon,
//   UserProfileIcon,
//   WarningIcon,
// } from "../icons/Icon";

// // Map icon names to React components
// const iconComponents = {
//   bill: BillIcon,
//   car: CarIcon,
//   bank: BankIcon,
//   app: AppIcon,
//   travel: TravelIcon,
//   phone: PhoneIcon,
//   gas: GasIcon,
//   water: WaterIcon,
//   electricity: ElectricityIcon,
//   mobile: MobileIcon,
//   shahrdari: ShahrdariIcon,
//   topUpCharge: TopUpChargeIcon,
//   topUpInternetPackage: TopUpInternetPackageIcon,
//   roaming: RoamingIcon,
//   paperBill: PaperBillIcon,
//   trafficFines: TrafficFinesIcon,
//   motorTrafficFines: MotorTrafficFinesIcon,
//   freeway: FreewayIcon,
//   annualToll: AnnualTollIcon,
//   trafficPlan: TrafficPlanIcon,
//   carTax: CarTaxIcon,
//   motorTax: MotorTaxIcon,
//   plateNumber: PlateNumberIcon,
//   carDocuments: CarDocumentsIcon,
//   negativePoint: NegativePointIcon,
//   drivingLicense: DrivingLicenseIcon,
//   vehicleAuthenticity: VehicleAuthenticityIcon,
//   thirdPartyInquiry: ThirdPartyInquiryIcon,
//   najiServicePlateNumberHistoryInquiry:
//     NajiServicePlateNumberHistoryInquiryIcon,
//   cardToCard: CardToCardIcon,
//   passport: PassportIcon,
//   home: HomeIcon,
//   wallet: WalletIcon,
//   shopping: ShoppingIcon,
//   profile: ProfileIcon,
//   support: SupportIcon,
//   blog: BlogIcon,
//   accessTime: AccessTimeIcon,
//   close: CloseIcon,
//   logout: LogoutIcon,
//   list: ListIcon,
//   arrowDown: ArrowDownIcon,
//   check: CheckIcon,
//   error: ErrorIcon,
//   flagIran: FlagIranIcon,
//   info: InfoIcon,
//   instagram: InstagramIcon,
//   minus: MinusIcon,
//   plus: PlusIcon,
//   refresh: RefreshIcon,
//   success: SuccessIcon,
//   technicalInspection: TechnicalInspectionIcon,
//   trash: TrashIcon,
//   userProfile: UserProfileIcon,
//   warning: WarningIcon,
// } as const;

// export type IconName = keyof typeof iconComponents;

// type Props = {
//   name: IconName;
//   size?: number;
//   color?: string;
//   className?: string;
//   alt?: string;
// };

// export function LocalIcon({
//   name,
//   size = 24,
//   color,
//   className = "",
//   alt = "",
// }: Props) {
//   const IconComponent = iconComponents[name];

//   if (!IconComponent) {
//     console.warn(`LocalIcon: Icon "${name}" not found.`);
//     return null;
//   }

//   return (
//     <IconComponent
//       width={size}
//       height={size}
//       color={color}
//       className={className}
//       aria-label={alt || name}
//       role="img"
//     />
//   );
// }
