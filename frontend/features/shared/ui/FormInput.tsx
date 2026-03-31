import React from "react";

interface FormInputProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl flex justify-center items-center bg-gray-100 shadow-sm shadow-gray-200 focus:border-blue-300  focus:ring-2 focus:ring-blue-300 focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default FormInput;
