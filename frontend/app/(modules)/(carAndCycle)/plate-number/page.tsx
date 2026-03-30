import GrayLine from "@/features/shared/ui/GrayLine";
import { ProtectedRoute } from "@/lib/protectedRoute";

function PlateNumberPage() {
  return (
    <ProtectedRoute>
      <div className="w-full h-80 bg-white rounded-lg shadow-md shadow-slate-300">
        <GrayLine className="md:hidden"/>
      </div>
    </ProtectedRoute>
  );
}

export default PlateNumberPage;
