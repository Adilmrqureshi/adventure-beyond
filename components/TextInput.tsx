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
    <div className={`w-full mt-${marginTop?.toString()}`}>
      <div className="flex flex-row justify-between items-center">
        <label
          className={`text-lg mr-6 ${secondary.className}`}
          htmlFor={props.id || name}
        >
          {label}
        </label>
        <input
          className={`text-input max-w-md border px-2 text-lg flex-1 p-1 ${formFont.className}`}
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
