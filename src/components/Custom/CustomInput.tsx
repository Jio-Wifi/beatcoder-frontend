import React, { forwardRef } from "react";

interface CustomInputProps {
  label?: string;
  type?: string;
  name: string;
  value?: string; // Optional for file inputs
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  error?: string;
  accept?: string; // For file types
  autoComplete?: string; // <-- NEW prop for better control
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      type = "text",
      name,
      value,
      placeholder,
      onChange,
      className = "",
      required = false,
      error,
      accept,
      autoComplete, // <-- NEW
    },
    ref
  ) => {
    // Default autocomplete logic for password/email
    const computedAutoComplete =
      autoComplete ||
      (type === "password" ? "current-password" : type === "email" ? "username" : "on");

    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-secondary dark:text-light"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={type === "file" ? undefined : value}
          placeholder={placeholder}
          required={required}
          accept={accept}
          autoComplete={computedAutoComplete} // <-- FIX HERE
          onChange={onChange}
          className={`border-2 border-solid rounded-md px-4 py-2 outline-none dark:border-b-accent border-dime dark:text-accent dark:hover:border-b-success dark:border-transparent dark:bg-primary hover:border-light transition-all ${className}`}
        />

        {error && (
          <p className="text-danger text-xs font-medium mt-1">{error}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
