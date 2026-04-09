import React from "react";

interface FormInputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-3 border border-gray-300 rounded-xl flex justify-center items-center bg-gray-100 shadow-sm shadow-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:outline-none ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default FormInput;









 {/* mobile header */}
      // <div className="w-full h-55 fixed top-0 lg:hidden">
      //   <div className="w-full h-20 flex items-center justify-between px-4">
      //     <span>back</span>
      //     <Logo className="text-blue-600" />
      //   </div>
      //   <WalletPrice />
      // </div>
      {/* desktop header */}
      // <div className="w-full h-20 flex items-center justify-between px-4 ">
      //   <span>back</span>
      //   <Logo className="text-blue-600" />
      // </div>