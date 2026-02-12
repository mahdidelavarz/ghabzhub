import { BillingList } from "@/src/components/BillingList";
import { Header } from "@/src/components/Header";
import { NavBar } from "@/src/components/NavBar";

export default function Home() {
  return (
    <div className="max-sm:mb-28 lg:w-9/12 mx-auto">
      <NavBar />
      <Header />
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
    </div>
  );
}
