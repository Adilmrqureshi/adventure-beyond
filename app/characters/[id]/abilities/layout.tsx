"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Layout;
