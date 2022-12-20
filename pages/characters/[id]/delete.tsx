import { Bio, Character } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "../../../components/Button";

interface CharacterData extends Character {
  bio: Bio;
}

const ConfirmDelete = (props: any) => {
  const [character, setCharacter] = React.useState<CharacterData | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (character === null)
      fetch(`/api/character/${props.params.id}/get`)
        .then((response) => response.json())
        .then((data) => setCharacter(data.data));
  }, [character, props?.params?.id]);

  const deleteCharacter = async (id: string) => {
    const response = await fetch(`/api/character/${id}/delete/`, {
      method: "POST",
    });
    return response;
  };

  return (
    character && (
      <div className="text-center">
        <h1>
          Are you sure you want to delete your character?{" "}
          <strong> {character?.bio.name}</strong>
        </h1>
        <div className="w-full flex gap-4" style={{ marginTop: "2rem" }}>
          <Button
            onClick={async () => {
              const response = await deleteCharacter(props?.params?.id);
              if (response.ok) router.push("/characters/");
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => router.back()} variant="secondary">
            Back
          </Button>
        </div>
      </div>
    )
  );
};

export default ConfirmDelete;
