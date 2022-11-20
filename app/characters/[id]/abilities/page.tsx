"use client";

import React, { useEffect, useState } from "react";
import { alternateMedium, primaryBold } from "../../../../utils/fonts";
import "../../../index.css";
import { divide, startCase } from "lodash";
import { Ability } from "@prisma/client";

type AbilityCardProps = {
  ability: Ability;
};

const AbilityCard = ({ ability }: AbilityCardProps) => {
  const [open, setOpen] = useState(false);
  console.log(alternateMedium.style.fontFamily);

  return (
    <div
      className="rounded-xl w-full border min-h-[1rem]  py-4 px-6"
      onClick={() => setOpen((value) => !value)}
    >
      <div className="w-full flex flex-row justify-between">
        <div className={`ap ${alternateMedium.className}`}>
          {ability.apCost}
        </div>
        <div className={`${primaryBold.className} text-xl`}>
          {startCase(ability.name)}
        </div>
        {!!ability.extra ? (
          <div
            className={`py-1 px-2 min-w-[25px] h-[25px] bg-black text-white center font-bold text-sm ${alternateMedium.className}`}
          >
            {ability.extra}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {open && (
        <div>
          <hr className="my-5" />
          <div dangerouslySetInnerHTML={{ __html: ability.description }} />
        </div>
      )}
    </div>
  );
};

const Abilities = (props: any) => {
  const [abilities, setAbilities] = useState<Ability[] | null>(null);
  useEffect(() => {
    if (!abilities)
      fetch("/api/abilities/", {
        method: "POST",
        body: JSON.stringify({ id: props.params.id }),
      })
        .then((response) => response.json())
        .then((data) => setAbilities(data.data));
  }, [abilities]);

  console.log("hello");

  return (
    <div className="center flex-col gap-6">
      {abilities?.map((ability) => (
        <AbilityCard key={ability.id} ability={ability} />
      ))}
    </div>
  );
};

export default Abilities;
