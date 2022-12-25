import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { ButtonLink } from "../../../components/Button";
import Loading from "../../../components/Loading";
import NumberInput from "../../../components/NumberInput";
import { getCharacter } from "../../../prisma/query/getCharacter";
import { primaryMedium } from "../../../utils/fonts";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context?.params;

  const myCharacter = await getCharacter(id);
  return {
    props: {
      character: myCharacter,
      params: {
        id,
      },
    }, // will be passed to the page component as props
  };
}

const View = (props: any) => {
  if (!props.character) return <Loading />;
  return (
    <div className="text-center">
      <h3
        className={`underline underline-offset-2 text-xl mb-6 ${primaryMedium.className}`}
      >
        {props.character?.bio?.name}
      </h3>
      <NumberInput>HP</NumberInput>
      <NumberInput>AP</NumberInput>
      <ButtonLink
        style={{ marginTop: "2rem" }}
        href={`/characters/${props?.params?.id}/inventory/`}
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
