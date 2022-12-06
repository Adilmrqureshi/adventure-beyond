"use client";
import { Bio, Character, Class } from "@prisma/client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { ButtonLink } from "../../components/Button";
import { prisma } from "../../prisma/db";
import CharacterCard from "./CharacterCard";

interface CharacterOverview extends Character {
  bio: Bio;
  class: Class;
}

async function getData(user: Omit<User, "id">) {
  return await fetch("/api/bio/getAll/", {
    method: "POST",
    body: JSON.stringify({ user }),
  });
}

const CharactersContainer = () => {
  const { data: session, status } = useSession();
  const [characters, setCharacters] = React.useState<
    CharacterOverview[] | null
  >(null);

  React.useEffect(() => {
    if (characters === null && session?.user !== undefined)
      getData(session?.user)
        .then((response) => response.json())
        .then((data) => setCharacters(data.data));
  }, [characters, session?.user]);

  return characters && <Characters characters={characters} />;
};

const Characters = (props: { characters: CharacterOverview[] }) => {
  return (
    <div>
      <ButtonLink variant="primary" href="/characters/create">
        New character
      </ButtonLink>
      {props.characters.map(
        (character) =>
          character?.bio && (
            <CharacterCard key={character.id} character={character} />
          )
      )}
    </div>
  );
};

export default CharactersContainer;
