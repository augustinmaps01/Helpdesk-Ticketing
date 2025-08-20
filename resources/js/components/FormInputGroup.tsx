import React from "react";
import { ChevronDown } from "lucide-react";

type Option = { label: string; value: string };

type FormInputGroupProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox" | "search";
  required?: boolean;
  placeholder?: string;
  options?: Option[]; // for select/radio
  className?: string;
  containerClassName?: string;
  value?: string;
  error?: string; // validation error message
  icon?: React.ReactNode; // optional icon
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  id,
  name,
  label,
  type,
  required = false,
  placeholder = "",
  options = [],
  className = "",
  containerClassName = "",
  value,
  error,
  icon,
  onChange,
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {type !== "checkbox" && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
            <span>{label}</span>
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
        </label>
      )}

      {(type === "text" || type === "search") && (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        />
      )}

      {type === "textarea" && (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        />
      )}

      {type === "select" && (
        <div className="relative">
          <select
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 pr-10 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${className}`}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      )}

      {type === "radio" && (
        <div className="flex space-x-4 mt-1">
          {options.map((opt) => (
            <label key={opt.value} className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                required={required}
                onChange={onChange}
                checked={value === opt.value}
                className="text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 capitalize">{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {type === "checkbox" && (
        <div className="flex items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            onChange={onChange}
            checked={!!value}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor={id}
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center gap-2">
              {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
              <span>{label}</span>
              {required && <span className="text-red-500 ml-1">*</span>}
            </div>
          </label>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInputGroup;
