import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, placeholder, disabled = false, className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-3 border rounded-xl flex justify-center items-center bg-gray-100 shadow-sm shadow-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:outline-none ${className} ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;