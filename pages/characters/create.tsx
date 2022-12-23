import React from "react";
import { Bio, Role } from "@prisma/client";
import { useRouter } from "next/router";
import { CharacterSheet } from "../../components/CharacterSheet";
import { User } from "next-auth";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@chakra-ui/react";

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
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
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
        if (user) {
          const response = await createCharacter(
            {
              ...values,
              age: values.age,
            },
            values.role as Role,
            user!
          );
          const data = await response.json();

          if (response.ok) {
            toast({
              title: data.message,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "left-accent",
            });
            router.push("/characters");
          } else
            toast({
              title: data.error,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "left-accent",
            });
        }
      }}
    />
  );
};

export default CharacterCreate;
