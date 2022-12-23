"use client";

import { Alert } from "@chakra-ui/react";
import React from "react";
import { primaryExtraBold, secondary } from "../../utils/fonts";

const Confirm = () => {
  return (
    <div className="content center w-full mt-4">
      <div className="content-card center flex-col">
        <h1 className={`mb-2 text-2xl ${primaryExtraBold.className}`}>
          Confirm email
        </h1>
        <Alert variant="left-accent" className={secondary.className}>
          An email has been sent to your inbox. Please verify your account.
        </Alert>
      </div>
    </div>
  );
};

export default Confirm;
