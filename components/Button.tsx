import React from "react";
import { primary, primaryBold } from "../utils/fonts";

function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={` 
        py-2
        w-full
        flex-1
        text-lg 
        rounded-md 
        ${variant}
        ${primaryBold.className}`}
    >
      {children}
    </button>
  );
}

export default Button;
