"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../../components/Button";

const Characters = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          router.push("/characters/create");
          console.log("push");
        }}
      >
        New character
      </Button>
    </div>
  );
};

export default Characters;
