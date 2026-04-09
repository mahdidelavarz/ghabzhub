"use client";
import FormButton from "@/features/shared/ui/FormButton";
import FormInput from "@/features/shared/ui/FormInput";
import GrayLine from "@/features/shared/ui/GrayLine";
import { Logo } from "@/features/shared/ui/Logo";

function page() {
  return (
    <div className="w-full h-auto pt-54 lg:pt-24 flex justify-center lg:justify-between bg-gray-200 lg:bg-transparent">
      {/* mobile header */}
      <div className="w-full h-55 lg:h-20 fixed top-0 lg:hidden">
        <WalletHeader className="lg:hidden" />
        <WalletPrice />
      </div>
      {/* desktop header */}
      <WalletHeader className="bg-white fixed top-0 right-0 hidden lg:flex" />

      <div className="w-full h-90 lg:w-160 lg:h-auto bg-white rounded-t-2xl lg:rounded-b-2xl flex flex-col gap-3 lg:gap-2 px-5 lg:py-7">
        <GrayLine className="lg:hidden" />
        <WalletPrice className="hidden lg:flex" />
        <span className="text-sm text-slate-400 lg:mt-10 ">
          برای افزایش موچودی کیف پول , مبلغ را وارد کنید.
        </span>
        <form action="">
          <div className="w-full h-auto py-5 flex gap-2 relative">
            <button className="w-14 h-14 flex justify-center items-center bg-gray-200 border border-gray-300 shadow-sm shadow-gray-3 rounded-xl text-blue-600">
              --
            </button>
            <FormInput
              type="number"
              onChange={() => console.log("form changed")}
              value="16000"
              placeholder="161.000"
              className="w-60 lg:w-120 outline-none bg-gray-200 border border-gray-300 shadow-sm shadow-gray-3 px-4 rounded-xl text-center "
            />
            <span className="absolute top-8.5 right-18 font-semibold text-slate-400">
              ریال
            </span>
            <button className="w-14 h-14 flex justify-center items-center bg-gray-200 border border-gray-300 shadow-sm shadow-gray-3 rounded-xl text-blue-600">
              +
            </button>
          </div>
          <span className="text-sm text-blue-500">معادل شانزده هزار تومان</span>
          <div className="w-full flex flex-col gap-3 mt-6 relative">
            <span className="text-slate-400">
              درگاه پرداخت مورد نظر خود را انتخاب کنید
            </span>
            <div className="w-full h-24 border-2 border-blue-400 rounded-2xl py-4 px-8 flex flex-col gap-1 bg-blue-50">
              <p className="text-slate-600">پرداخت اینترنتی</p>
              <span className="text-sm text-blue-300">
                پرداخت در درگاه اینترنتی
              </span>
              <div className="w-8 h-8 rounded-full border-2 border-blue-400 absolute top-1/2 -right-3.5 flex justify-center items-center bg-white">
                <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <WalletPaySubmit />
        </form>
      </div>
    </div>
  );
}

export default page;

function WalletPrice({ className }: { className?: string }) {
  return (
    <div
      className={`w-full h-30 flex justify-center items-start px-5 lg:px-0 ${className}`}
    >
      <div className="w-full h-25 border border-gray-300 rounded-2xl bg-gray-100 flex flex-col justify-between p-4">
        <div className="w-full flex justify-between">
          <span className="font-bold text-slate-700">کیف پول</span>
          <button className="text-slate-500">refresh</button>
        </div>
        <div className="w-full flex items-center gap-2 text-slate-500">
          <span>موجودی :</span> <span>0 ریال</span>
        </div>
      </div>
    </div>
  );
}

function WalletHeader({ className }: { className?: string }) {
  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-4 ${className}`}
    >
      <span>back</span>
      <Logo className="text-blue-600" />
    </div>
  );
}

function WalletPaySubmit() {
  return (
    <div className="w-full h-34 fixed right-0 bg-gray-200 shadow-inner p-5 text-slate-600 flex flex-col gap-4 lg:gap-6 lg:absolute bottom-0 lg:left-50 lg:top-24 lg:w-120 lg:h-44 lg:bg-white lg:rounded-2xl lg:right-auto">
      <div className="w-full flex justify-between">
        <span>مبلغ شارژ کیف پول :</span>
        <span>
          <b>161.000</b> ریال
        </span>
      </div>
      <FormButton
        label="پرداخت"
        loading={false}
        onClick={() => console.log("he")}
      />
    </div>
  );
}
