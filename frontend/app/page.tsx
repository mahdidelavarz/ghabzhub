import { BillingList } from "@/features/shared/ui/BillingList";


export default function Home() {
  return (
    <BillingList
      cssStyles="grid grid-cols-8 gap-y-7 max-md:grid-cols-4 mt-9"
      titles={[
        "خدمات قبض و موبایل",
        "خدمات خودرو و موتور",
        "خدمات بانکی",
        "خدمات سفر",
      ]}
      lists={["billAndMobile", "carAndCycle", "bank", "travel"]}
      colors={["#0078d7", "#35c759", "#ffa94d", "#00bfa6"]}
      icons={["bill", "car", "bank", "travel"]}
    />
  );
}
