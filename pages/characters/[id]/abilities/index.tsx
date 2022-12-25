"use client";

import React, { useEffect, useState } from "react";
import {
  alternateMedium,
  primaryBold,
  primaryMedium,
} from "../../../../utils/fonts";
import { startCase } from "lodash";
import { Ability } from "@prisma/client";
import Button, { ButtonLink } from "../../../../components/Button";
import { useRouter } from "next/router";
import NumberInput from "../../../../components/NumberInput";
import { Legend } from "../../../../components/Legend";
import Loading from "../../../../components/Loading";

type AbilityCardProps = {
  ability: Ability;
};

const AbilityCard = ({ ability }: AbilityCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl w-full border min-h-[1rem] py-4 px-4"
      onClick={() => setOpen((value) => !value)}
      style={{ cursor: "pointer" }}
    >
      <div className="w-full flex flex-row justify-between">
        <div className={`ap mr-2`}>{ability.apCost}</div>
        <div
          className={`${primaryBold.className} flex-1 text-center text-md sm:text-xl`}
        >
          {startCase(ability.name)}
        </div>
      </div>
      {open && (
        <div>
          <hr className="my-5" />
          {!!ability.extra && (
            <div
              className={`py-1 px-2 mb-3 min-w-[25px] h-[25px] bg-black text-white center font-bold text-xs sm:text-sm ${alternateMedium.className}`}
            >
              <strong>{ability.extra}</strong>
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: ability.description }} />
        </div>
      )}
    </div>
  );
};

const Abilities = () => {
  const [abilities, setAbilities] = useState<Ability[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/abilities/all", {
        method: "POST",
        body: JSON.stringify({ id: router?.query?.id }),
      });
      const jsonResponse = await response.json();
      setAbilities(jsonResponse.data);
      setLoading(false);
    };
    if (!abilities) getData();
  }, [abilities, router?.query?.id]);

  let abilityList: any = <Loading className="w-full" />;

  if (!loading)
    abilityList = abilities?.map((ability) => (
      <AbilityCard key={ability.id} ability={ability} />
    ));

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
      {abilityList}
      <hr className="h-1 w-full" />
      <ButtonLink
        className="w-full mt-6"
        href={`/characters/${router?.query?.id}/abilities/add`}
      >
        Add ability
      </ButtonLink>
      <Button
        variant="secondary"
        onClick={() => router.push(`/characters/${router?.query?.id}/view`)}
      >
        Back
      </Button>
    </div>
  );
};

export default React.memo(Abilities);
