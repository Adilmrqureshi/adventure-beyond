import { parseInt } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { primaryBold, primaryRegular, secondary } from "../utils/fonts";

const NumberInput = ({ children }: { children: string }) => {
  const router = useRouter();
  const [value, setValue] = React.useState(() => {
    if (router)
      return parseInt(
        localStorage.getItem(`${children}-${router?.query?.id}`) || "10"
      );
    else return 10;
  });

  const changeHandler = (value: number) => {
    setValue(value);
    localStorage.setItem(`${children}-${router?.query?.id}`, value.toString());
  };

  return (
    <div className="flex flex-row items-center w-full">
      <div
        style={{ height: "100%" }}
        className={`font-black h-full justify-center text-lg w-[48px] text-left ${primaryBold.className}`}
      >
        {children}:
      </div>
      <div className="flex flex-row gap-4 w-full items-center mt-4">
        <button
          onClick={() => changeHandler(value - 1)}
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
          className={`border center text font-semibold w-full p-3 text-lg ${primaryRegular.className}`}
        >
          {value}
        </div>
        <button
          onClick={() => changeHandler(value + 1)}
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
