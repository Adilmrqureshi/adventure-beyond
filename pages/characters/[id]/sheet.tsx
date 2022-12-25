"use client";

import { Bio, Class } from "@prisma/client";
import React from "react";
import { CharacterSheet, Values } from "../../../components/CharacterSheet";
import { omit } from "lodash";
import Button from "../../../components/Button";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { prisma } from "../../../prisma/db";

type Sheet = Bio & { character: { class: Class } };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context?.params;

  console.log(id, "ID");

  const bio = await prisma.bio.findUniqueOrThrow({
    where: { characterId: id },
    include: { character: { select: { class: true } } },
  });

  return {
    props: {
      bio,
      params: {
        id,
      },
    },
  };
}

const updateBio = async (values: Values, id: string) => {
  return await fetch("/api/bio/update", {
    method: "POST",
    body: JSON.stringify({
      bio: {
        name: values.name,
        age: +values.age,
        height: values.height,
        appearance: values.appearance,
        clothing: values.clothing,
        gait: values.gait,
        nation: values.nation,
        flaw: values.flaw,
        ideal: values.ideal,
        location: values.location,
        dream: values.dream,
      },
      role: values.role,
      id,
    }),
  });
};

const Sheet = (props: any) => {
  const bio: Sheet = props.bio;
  const values = { role: props.bio?.character.class.id, ...bio };
  const [editMode, setEditMode] = React.useState(false);
  const router = useRouter();

  console.log(bio, "BIO");

  return (
    <>
      <CharacterSheet
        onSubmit={(values) => {
          if (editMode)
            // @ts-ignore
            updateBio(values, props.params.id)
              .then(() => {
                setEditMode(false);
                console.log("Updated bio");
              })
              .catch((err) => console.log("Update failed", err));
        }}
        initialValues={omit(values, "character")}
        disabled={!editMode}
      />
      {!editMode && (
        <div className="w-full flex" style={{ marginTop: "2rem" }}>
          <Button
            variant="primary"
            style={{ marginRight: "1rem" }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              router.back();
            }}
            style={{ marginLeft: "1rem" }}
            type="button"
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default React.memo(Sheet);
