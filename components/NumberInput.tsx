"use client";

import * as React from "react";
import { primaryBold, primaryRegular, secondary } from "../utils/fonts";

const NumberInput = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState(10);
  return (
    <div className="flex flex-row items-center">
      <div
        className={`font-black text-lg w-[48px] text-left ${primaryBold.className}`}
      >
        {children}:
      </div>
      <div className="flex flex-row gap-4 w-full items-center mt-4">
        <button
          onClick={() => setValue((v) => v - 1)}
          style={{ borderRadius: "4px" }}
          className="primary text-base"
        >
          <div
            style={{ borderRadius: "4px" }}
            className="h-[3.5rem] w-[3.5rem] flex justify-center items-center rounded-md"
          >
            {" "}
            -{" "}
          </div>
        </button>
        <div
          className={`border text font-semibold w-full p-3 text-lg ${primaryRegular.className}`}
        >
          {value}
        </div>
        <button
          onClick={() => setValue((v) => v + 1)}
          style={{ borderRadius: "4px" }}
          className="primary text-base"
        >
          <div className="h-[3.5rem] w-[3.5rem] p-3 flex justify-center items-center rounded-md">
            {" "}
            +{" "}
          </div>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
