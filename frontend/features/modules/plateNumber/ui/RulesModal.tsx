import { useState } from "react";
import FormButton from "@/features/shared/ui/FormButton";
import { useRouter } from "next/navigation";
import { usePlateStore } from "../store/plateStore";

function RulesModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (x: boolean) => void;
}) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (!accepted) return;
    router.push("/my-wallet");
    setShowModal(false);
  };

  return (
    <div
      className={`fixed inset-0 justify-center items-center ${showModal ? "flex" : "hidden"} z-50`}
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setShowModal(false)}
      />
      <div className="relative w-120 h-150 bg-white rounded-3xl lg:rounded-4xl p-6 flex flex-col justify-between z-60">
        <div className="w-full h-10 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">قوانین و مقررات</h3>
          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer"
          >
            ×
          </button>
        </div>

        <ol className="list-decimal p-5 text-slate-500 space-y-2">
          <li>هزینه هربار استعلام خدمات پلیس ۱۶.۱۷۰ تومان است.</li>
          <li>
            درحال حاضر استعلام پلاک فعال برای دارندگان موتورسیکلت امکان‌پذیر
            نیست.
          </li>
          <li>
            این مبلغ از سوی پلیس ناجی دریافت می‌شود و امکان بازگشت وجه پرداختی
            وجود ندارد.
          </li>
          <li>
            در صورت پرداخت ناموفق مبلغ کسر شده تا ۷۲ ساعت به حساب شما بازگردانده
            می‌شود.
          </li>
          <li>
            نتیجه استعلام‌های شما در بخش سوابق ذخیره شده و در هر زمان قابل
            دسترسی است.
          </li>
        </ol>

        <div className="flex gap-2 p-4 bg-gray-100 rounded-md text-slate-600 mb-3">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>قوانین و مقررات را می‌پذیرم.</span>
        </div>

        <FormButton
          type="button"
          label="تایید و ادامه"
          onClick={handleAccept}
          disabled={!accepted}
          loading={false}
        />
      </div>
    </div>
  );
}

export default RulesModal;
