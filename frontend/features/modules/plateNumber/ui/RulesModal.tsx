import FormButton from "@/features/shared/ui/FormButton";
import { redirect } from "next/navigation";

function RulesModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (x: boolean) => void;
}) {
  const handleCloseModal = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };
  return (
    <div
      className={`w-full absolute top-0 h-auto justify-center items-center ${showModal ? "flex" : "hidden"}`}
    >
      <div className="w-screen h-screen absolute top-0 right-0 left-0 bg-black/70 z-50"></div>
      <div className="w-screen h-screen absolute top-0 right-0 left-0 flex justify-center items-center z-60 px-3 lg:px-0">
        <div className="w-120 h-120 bg-white rounded-3xl lg:rounded-4xl p-6 flex flex-col justify-between">
          <div className="w-full h-10 flex justify-between items-center bg-white">
            <h3 className="font-bold text-slate-800">قوانین و مقررات</h3>
            <button onClick={handleCloseModal}>*</button>
          </div>
          <ol className="list-decimal p-5 text-slate-500 space-y-2">
            <li>هزینه</li>
            <li>در خال</li>
            <li>در خال</li>
            <li>در خال</li>
            <li>در خال</li>
            <li>در خال</li>
            <li>در خال</li>
            <li>در خال</li>
          </ol>
          <div className="flex gap-2 p-4 bg-gray-100 rounded-md text-slate-600 mb-3">
            <input type="checkbox" className="w-5" />
            <span>قوانین و مقررات را میپذیرم.</span>
          </div>
          <FormButton
            label="افزایش موجودی"
            onClick={() => redirect("/my-wallet")}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default RulesModal;
