"use client";

import { useRouter } from "next/navigation";
import React from "react";
import ButtonPrimary from "../../components/Button";

const Characters = () => {
  const router = useRouter();
  return (
    <div>
      <ButtonPrimary
        onClick={() => {
          router.push("/characters/create");
          console.log("push");
        }}
      >
        New character
      </ButtonPrimary>
    </div>
  );
};

export default Characters;
