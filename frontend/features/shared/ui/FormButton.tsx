import React from "react";

interface FormButtonProps {
  onClick: (e?: any) => void;
  loading: boolean;
  disabled?: boolean;
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  onClick,
  loading,
  disabled = false,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
        loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          در حال {label}...
        </span>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

export default FormButton;
