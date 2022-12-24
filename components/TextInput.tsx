import * as React from "react";
import { useField } from "formik";
import { formFont, secondary } from "../utils/fonts";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  marginTop?: number | string;
}

export const TextInput = ({ label, name, marginTop, ...props }: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={`mt-${marginTop?.toString()}`}>
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center">
        <label
          className={`text-lg text-left mb-2 mr-6 flex-1 ${secondary.className}`}
          htmlFor={props.id || name}
        >
          {label}
        </label>
        <input
          style={{ flexShrink: 0.5, ...props.style }}
          className={`text-input w-full sm:max-w-sm border px-2 text-lg flex-1 p-1 ${
            formFont.className
          } ${props.disabled ? "disabled" : ""}`}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextColInput = ({
  label,
  name,
  marginTop,
  ...props
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={`mt-${marginTop?.toString()}`}>
      <div className="flex flex-col justify-between items-start">
        <label
          className={`text-lg text-left mb-2 mr-6 flex-1 ${secondary.className}`}
          htmlFor={props.id || name}
        >
          {label}
        </label>
        <input
          style={{ flexShrink: 0.5, ...props.style }}
          className={`text-input w-full border px-2 text-lg flex-1 p-1 ${
            formFont.className
          } ${props.disabled ? "disabled" : ""}`}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
