import React from "react";
import { primary, primaryBold } from "../utils/fonts";

function ButtonPrimary({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={`bg-black 
        text-white 
        w-full
        py-2
        text-lg 
        rounded-md 
        ${primaryBold.className}`}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
