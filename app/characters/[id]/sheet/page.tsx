"use client";

import { Bio, Character, Class } from "@prisma/client";
import React from "react";
import { CharacterSheet, Values } from "../../../../components/CharacterSheet";
import { omit } from "lodash";
import Button from "../../../../components/Button";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/Loading";

type Sheet = Bio & { character: { class: Class } };

const Sheet = (props: any) => {
  const [bio, setBio] = React.useState<Sheet | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { params } = props;

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/bio/get/", {
        method: "POST",
        cache: "force-cache",
        body: JSON.stringify({ id: params.id }),
      });
      const jsonResponse = await response.json();
      setBio(jsonResponse.data);
      setLoading(false);
    };
    if (bio === null) getData();
  }, [bio]);

  if (loading) return <Loading />;

  return <EditSheetForm bio={bio!} params={params} />;
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

export default React.memo(Sheet);
