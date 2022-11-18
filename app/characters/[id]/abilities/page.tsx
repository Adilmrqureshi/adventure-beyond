import React from "react";
import { alternateMedium, primaryBold } from "../../../../utils/fonts";
import "../../../index.css";

type AbilityCardProps = {
  apCost: number;
  name: string;
  extra?: "role";
};

const AbilityCard = ({ apCost, name, extra }: AbilityCardProps) => {
  return (
    <div className="rounded-xl w-full border min-h-[1rem] flex flex-row justify-between py-4 px-6">
      <div
        className={`w-[25px] h-[25px] bg-black text-white center font-bold ${alternateMedium.className}`}
      >
        1
      </div>
      <div className={`${primaryBold.className} text-xl`}>{name}</div>
      {!!extra ? (
        <div
          className={`py-1 px-2 min-w-[25px] h-[25px] bg-black text-white center font-bold text-sm ${alternateMedium.className}`}
        >
          {extra}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const getAbilities = async (id: string) => {
  const character = await prisma?.character?.findUniqueOrThrow({
    where: { id },
    include: { abilities: true },
  });
  return character?.abilities;
};

const Abilities = async (props: any) => {
  const abilities = await getAbilities(props.params.id);
  return (
    <div className="center">
      {abilities?.map((ability) => (
        <AbilityCard
          key={ability.id}
          apCost={ability.apCost}
          name={ability.name}
        />
      ))}
    </div>
  );
};

export default Abilities;
