import React from "react";
import { primary, primaryBold } from "../utils/fonts";

import "../styles/form.css";
import Link from "next/link";

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
      className={`py-2 w-full flex-1 text-lg rounded-md ${variant} ${
        primaryBold.className
      } ${props.disabled ? "button-disabled" : ""}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  href = "/",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Link href={href} style={{ width: "100%" }}>
      <button
        {...props}
        className={`py-2 w-full flex-1 text-lg rounded-md ${variant} ${primaryBold.className}`}
      >
        {children}
      </button>
    </Link>
  );
}

export default Button;
