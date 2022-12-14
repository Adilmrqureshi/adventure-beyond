"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { primaryBold, secondary } from "../../utils/fonts";
import "../index.css";

export default function MenuLayout({ children }: { children: any }) {
  return (
    <>
      <div className="center w-full">
        <div
          className={`sub-heading-card text-3xl center ${primaryBold.className}`}
        >
          Characters
        </div>
      </div>
      <div className="center w-full">
        <div className="content-card center">
          <ChakraProvider>{children}</ChakraProvider>
        </div>
      </div>
    </>
  );
}
