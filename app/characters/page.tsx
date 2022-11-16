import { useRouter } from "next/navigation";
import React from "react";
import { ButtonLink } from "../../components/Button";
import { prisma } from "../../prisma/db";
import CharacterCard from "./CharacterCard";

async function getData() {
  const characters = await prisma.character.findMany({
    include: {
      bio: {
        select: {
          name: true,
          role: true,
        },
      },
    },
  });
  return characters;
}

const Characters = async () => {
  const characters = await getData();
  return (
    <div>
      <ButtonLink variant="primary" href="/characters/create">
        New character
      </ButtonLink>
      {characters.map(
        (character) =>
          character?.bio && (
            <CharacterCard key={character.id} character={character} />
          )
      )}
    </div>
  );
};

export default Characters;
