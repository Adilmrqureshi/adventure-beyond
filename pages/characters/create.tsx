import React from "react";
import { Bio, Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CharacterSheet } from "../../components/CharacterSheet";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const createCharacter = async (
  bio: Omit<Omit<Bio, "characterId">, "id">,
  role: Role,
  user: Omit<User, "id">
) => {
  return await fetch("/api/bio/create/", {
    method: "POST",
    body: JSON.stringify({ bio, role, user }),
  });
};

const CharacterCreate = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <CharacterSheet
      initialValues={{
        name: "",
        age: 0,
        height: "",
        role: "",
        appearance: "",
        clothing: "",
        gait: "",
        location: "",
        nation: "",
        ideal: "",
        flaw: "",
        dream: "",
      }}
      onSubmit={async (values) => {
        if (session?.user) {
          const response = await createCharacter(
            {
              ...values,
              age: values.age,
            },
            values.role as Role,
            session.user!
          );

          if (response.ok) router.push("/characters");
        }
      }}
    />
  );
};

export default CharacterCreate;
