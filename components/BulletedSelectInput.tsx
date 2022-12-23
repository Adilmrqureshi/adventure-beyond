import React from "react";
import { useField } from "formik";
import { formFont, secondary } from "../utils/fonts";
import { Icon, Select, Tooltip } from "@chakra-ui/react";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Role } from "@prisma/client";
import { capitalize } from "lodash";

interface FieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  marginTop?: number | string;
  number: number;
  help?: React.ReactNode;
}

export const BulletedSelectInput = (props: FieldProps) => {
  return !props.label ? (
    <BulletSelectInputNoLabel {...props} />
  ) : (
    <BulletSelectInputWithLabel {...props} />
  );
};

const BulletSelectInputNoLabel = ({
  name,
  marginTop,
  number,
  ...props
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div style={{ marginTop: `${marginTop}rem` }}>
      <div className="flex mb-3 items-center flex-row">
        <div className="bullet">{number}</div>
        <Select
          style={{ border: "2px solid black", borderRadius: "0px" }}
          className={`w-full text-input border p-1 px-3 text-lg   ${
            props.disabled ? "disabled" : ""
          }`}
          {...field}
          name={name}
          placeholder="Select role:"
        >
          {Object.keys(Role).map((role) => (
            <option key={role} value={role}>
              {capitalize(role)}
            </option>
          ))}
        </Select>
      </div>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const BulletSelectInputWithLabel = ({
  label,
  name,
  marginTop,
  number,
  ...props
}: FieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={`mt-${marginTop?.toString()}`}>
      <div className="flex mb-3 items-center">
        <div className="bullet">{number}</div>
        <label
          className={`text-lg mr-3 ${secondary.className}`}
          htmlFor={props.id || name}
        >
          {label}
        </label>
        {props.help}
      </div>
      <Select
        style={{ border: "2px solid black", borderRadius: "0px" }}
        className={`w-full text-input border p-1 px-3 text-lg ${
          formFont.className
        } ${props.disabled ? "disabled" : ""}`}
        {...field}
        placeholder=" "
        name={name}
      >
        {Object.keys(Role).map((role) => (
          <option key={role} value={role}>
            {capitalize(role)}
          </option>
        ))}
      </Select>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
