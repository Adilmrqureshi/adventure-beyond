import React from "react";
import { primary, primaryBold } from "../utils/fonts";

function ButtonPrimary({
  children,
  type = "primary",
  ...props
}: {
  children: React.ReactNode;
  type?: "primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={` 
        py-2
        w-full
        flex-1
        text-lg 
        rounded-md 
        ${type}
        ${primaryBold.className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
