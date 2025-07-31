import React from "react";

interface CustomTextareaProps {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  className = "",
  required = false,
  error,
  rows = 4,
}) => {
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

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onChange={onChange}
        className={`border-2 border-solid rounded-md px-4 py-2 outline-none dark:border-b-accent border-dime dark:text-accent dark:hover:border-b-success dark:border-transparent dark:bg-primary hover:border-light transition-all resize-none ${className}`}
      />

      {error && <p className="text-danger text-xs font-medium mt-1">{error}</p>}
    </div>
  );
};

export default CustomTextarea;
