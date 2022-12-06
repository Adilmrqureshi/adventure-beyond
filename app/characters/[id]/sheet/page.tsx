"use client";

import { Bio, Character, Class } from "@prisma/client";
import React from "react";
import { CharacterSheet, Values } from "../../../../components/CharacterSheet";
import { omit } from "lodash";
import Button from "../../../../components/Button";
import { useRouter } from "next/navigation";

type Sheet = Bio & { character: { class: Class } };

const Sheet = (props: any) => {
  const [bio, setBio] = React.useState<Sheet | null>(null);

  const { params } = props;

  React.useEffect(() => {
    if (bio === null) {
      fetch("/api/bio/get/", {
        method: "POST",
        body: JSON.stringify({ id: params.id }),
      })
        .then((response) => response.json())
        .then((data) => setBio(data.data));
    }
  }, [bio, params?.id]);

  return bio !== null ? <EditSheetForm bio={bio!} params={params} /> : null;
};

const updateBio = async (values: Values, id: string) => {
  return await fetch("/api/bio/update/", {
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

const EditSheetForm = (props: any) => {
  const bio: Sheet = props.bio;
  const values = { role: props.bio?.character.class.id, ...bio };
  const [editMode, setEditMode] = React.useState(false);
  const router = useRouter();
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

export default Sheet;
