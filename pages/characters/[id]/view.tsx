import * as React from "react";
import Button, { ButtonLink } from "../../../components/Button";
import NumberInput from "../../../components/NumberInput";
import { getCharacter } from "../../../prisma/query/getCharacter";
import { primaryMedium } from "../../../utils/fonts";

const View = async (props: any) => {
  const myCharacter = await getCharacter(props.params.id);
  return (
    <div className="text-center">
      <h3
        className={`underline underline-offset-2 text-xl mb-6 ${primaryMedium.className}`}
      >
        {myCharacter?.bio?.name}
      </h3>
      <NumberInput>HP</NumberInput>
      <NumberInput>AP</NumberInput>
      <ButtonLink
        style={{ marginTop: "2rem" }}
        href={`/characters/${props.params.id}/inventory/`}
      >
        Inventory
      </ButtonLink>
      <ButtonLink
        style={{ marginTop: "1rem" }}
        href={`/characters/${props.params.id}/abilities/`}
      >
        Abilities
      </ButtonLink>
      <ButtonLink
        style={{ marginTop: "1rem" }}
        href={`/characters/${props.params.id}/sheet/`}
      >
        Character sheet
      </ButtonLink>
      <ButtonLink
        href={`/characters/${props.params.id}/delete/`}
        style={{ marginTop: "1rem" }}
      >
        Delete
      </ButtonLink>
      <ButtonLink
        href={`/characters/`}
        style={{ marginTop: "1rem" }}
        variant="secondary"
      >
        Back
      </ButtonLink>
    </div>
  );
};

export default View;
