"use client";

import React, { useEffect, useState } from "react";
import {
  alternateMedium,
  primaryBold,
  primaryMedium,
} from "../../../../utils/fonts";
import "../../../index.css";
import { startCase } from "lodash";
import { Ability } from "@prisma/client";
import Button, { ButtonLink } from "../../../../components/Button";
import { useRouter } from "next/navigation";
import NumberInput from "../../../../components/NumberInput";
import { Legend } from "./Legend";

type AbilityCardProps = {
  ability: Ability;
};

const AbilityCard = ({ ability }: AbilityCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl w-full border min-h-[1rem] py-4 px-6"
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
  const router = useRouter();
  useEffect(() => {
    if (!abilities)
      fetch("/api/abilities/all", {
        method: "POST",
        body: JSON.stringify({ id: props.params.id }),
      })
        .then((response) => response.json())
        .then((data) => setAbilities(data.data));
  }, [abilities]);

  return (
    <div className="center flex-col gap-6">
      <h1
        className={`underline underline-offset-2 text-xl ${primaryMedium.className}`}
      >
        Ability overview
      </h1>
      <div className="w-full mb-2 ">
        <NumberInput>HP</NumberInput>
        <NumberInput>AP</NumberInput>
      </div>

      <hr className="h-1 w-full" />
      <Legend />
      {abilities?.map((ability) => (
        <AbilityCard key={ability.id} ability={ability} />
      ))}
      <hr className="h-1 w-full" />
      <ButtonLink
        className="w-full mt-6"
        href={`/characters/${props.params.id}/abilities/add`}
      >
        Add ability
      </ButtonLink>
      <Button variant="secondary" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
};

export default Abilities;
