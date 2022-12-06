"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      {/* <SessionProvider> */}
      {children}
      {/* </SessionProvider> */}
    </>
  );
}
