import { useToast } from "@chakra-ui/react";
import { Bio, Character } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "../../../components/Button";
import { prisma } from "../../../prisma/db";

interface CharacterData extends Character {
  bio: Bio;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context?.params;

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
    }, // will be passed to the page component as props
  };
}

const ConfirmDelete = (props: any) => {
  const router = useRouter();
  const toast = useToast();

  // React.useEffect(() => {
  //   if (character === null)
  //     fetch(`/api/character/${props.params.id}/get`)
  //       .then((response) => response.json())
  //       .then((data) => setCharacter(data.data));
  // }, [character, props?.params?.id]);

  const deleteCharacter = async (id: string) => {
    const response = await fetch(`/api/character/${id}/delete`, {
      method: "POST",
    });
    return response;
  };

  return (
    props?.bio && (
      <div className="text-center">
        <h1>
          Are you sure you want to delete your character?{" "}
          <strong> {props?.bio.name}</strong>
        </h1>
        <div className="w-full flex gap-4" style={{ marginTop: "2rem" }}>
          <Button
            onClick={async () => {
              const response = await deleteCharacter(props?.params?.id);
              const data = await response.json();
              if (response.ok) {
                router.push("/characters/");
                toast({
                  title: data.message,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  variant: "left-accent",
                });
              } else
                toast({
                  title: data.error,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  variant: "left-accent",
                });
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
