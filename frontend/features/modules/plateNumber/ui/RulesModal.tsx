// features/modules/plateNumber/ui/RulesModal.tsx
import { useState } from "react";
import FormButton from "@/features/shared/ui/FormButton";
import { useRouter } from "next/navigation";
import { usePlateStore } from "../store/plateStore";

function RulesModal({
  showModal,
  setShowModal,
  nationalNumber,
  phoneNumber,
}: {
  showModal: boolean;
  setShowModal: (x: boolean) => void;
  nationalNumber: string;
  phoneNumber: string;
}) {
  const router = useRouter();
  const setPlateData = usePlateStore((s) => s.setPlateData);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (!accepted) return;
    setPlateData({ nationalNumber, phoneNumber });
    router.push("/my-wallet");
    setShowModal(false);
  };

  return (
    <div
      className={`w-full absolute top-0 h-auto justify-center items-center ${showModal ? "flex" : "hidden"}`}
    >
      <div className="w-screen h-screen absolute top-0 right-0 left-0 bg-black/70 z-50" />
      <div className="w-screen h-screen absolute top-0 right-0 left-0 flex justify-center items-center z-60 px-3 lg:px-0">
        <div className="w-120 h-150 bg-white rounded-3xl lg:rounded-4xl p-6 flex flex-col justify-between">
          <div className="w-full h-10 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">قوانین و مقررات</h3>
            <button onClick={() => setShowModal(false)} className="cursor-pointer">×</button>
          </div>

          <ol className="list-decimal p-5 text-slate-500 space-y-2">
            <li>هزینه هربار استعلام خدمات پلیس ۱۶.۱۷۰ تومان است.</li>
            <li>درحال حاضر استعلام پلاک فعال برای دارندگان موتورسیکلت امکان‌پذیر نیست.</li>
            <li>این مبلغ از سوی پلیس ناجی دریافت می‌شود و امکان بازگشت وجه پرداختی وجود ندارد.</li>
            <li>در صورت پرداخت ناموفق مبلغ کسر شده تا ۷۲ ساعت به حساب شما بازگردانده می‌شود.</li>
            <li>نتیجه استعلام‌های شما در بخش سوابق ذخیره شده و در هر زمان قابل دسترسی است.</li>
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
          label="تایید و ادامه"
          onClick={handleAccept}
          disabled={!accepted}
          loading={false}
        />
        </div>
      </div>
    </div>
  );
}

export default RulesModal;



// // features/modules/plateNumber/ui/RulesModal.tsx
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import FormButton from "@/features/shared/ui/FormButton";
// import { usePlateStore } from "../store/plateStore";

// function RulesModal({
//   showModal,
//   setShowModal,
//   nationalNumber,
//   phoneNumber,
// }: {
//   showModal: boolean;
//   setShowModal: (x: boolean) => void;
//   nationalNumber: string;
//   phoneNumber: string;
// }) {
//   const router = useRouter();
//   const setPlateData = usePlateStore((s) => s.setPlateData);
//   const [accepted, setAccepted] = useState(false);

//   const handleAccept = () => {
//     if (!accepted) return;
//     setPlateData({ nationalNumber, phoneNumber });
//     router.push("/my-wallet");
//     setShowModal(false);
//   };

//   return (
//     <div className={`fixed inset-0 z-50 ${showModal ? "flex" : "hidden"}`}>
//       <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
//       <div className="relative bg-white rounded-3xl w-full max-w-md mx-auto p-6 my-auto shadow-2xl">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-bold text-slate-800">قوانین و مقررات</h3>
//           <button onClick={() => setShowModal(false)}>×</button>
//         </div>

//         <ol className="list-decimal text-slate-500 space-y-2 mb-4">
//           <li>هزینه هربار استعلام خدمات پلیس ۱۶.۱۷۰ تومان است.</li>
//           <li>درحال حاضر استعلام پلاک فعال برای دارندگان موتورسیکلت امکان‌پذیر نیست.</li>
//           <li>این مبلغ از سوی پلیس ناجی دریافت می‌شود و امکان بازگشت وجه پرداختی وجود ندارد.</li>
//           <li>در صورت پرداخت ناموفق مبلغ کسر شده تا ۷۲ ساعت به حساب شما بازگردانده می‌شود.</li>
//           <li>نتیجه استعلام‌های شما در بخش سوابق ذخیره شده و در هر زمان قابل دسترسی است.</li>
//         </ol>

//         <div className="flex items-center gap-2 mb-4">
//           <input
//             type="checkbox"
//             className="w-5 h-5"
//             checked={accepted}
//             onChange={(e) => setAccepted(e.target.checked)}
//           />
//           <span className="text-sm text-slate-600">قوانین و مقررات را می‌پذیرم.</span>
//         </div>

//         <FormButton
//           label="تایید و ادامه"
//           onClick={handleAccept}
//           disabled={!accepted}
//           loading={false}
//         />
//       </div>
//     </div>
//   );
// }

// export default RulesModal;

