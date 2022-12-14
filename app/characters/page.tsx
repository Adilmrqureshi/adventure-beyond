"use client";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Bio, Character, Class } from "@prisma/client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ButtonLink } from "../../components/Button";
import Loading from "../../components/Loading";
import { prisma } from "../../prisma/db";
import CharacterCard from "./CharacterCard";

interface CharacterOverview extends Character {
  bio: Bio;
  class: Class;
}

const CharactersContainer = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = React.useState<
    CharacterOverview[] | null
  >(null);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/bio/getAll/", {
        method: "POST",
        body: JSON.stringify({ user: session?.user }),
      });
      const jsonResponse = await response.json();
      setCharacters(jsonResponse.data);
      setLoading(false);
    };
    if (characters === null && session?.user !== undefined) getData();
  }, [characters]);

  return <Characters characters={characters!} loading={loading} />;
};

const Characters = (props: {
  characters: CharacterOverview[];
  loading: boolean;
}) => {
  let characters = null;

  if (props.loading) characters = <Loading className="mt-4" />;
  else if (!props?.characters || props?.characters?.length == 0)
    characters = (
      <Alert className="mt-4" status="warning">
        <AlertIcon />
        <div>
          You have no characters available. Click <strong>New Character</strong>{" "}
          to create one.
        </div>
      </Alert>
    );
  else if (props?.characters?.length > 0)
    characters = props.characters.map(
      (character) =>
        character?.bio && (
          <CharacterCard key={character.id} character={character} />
        )
    );

  return (
    <div>
      <ButtonLink variant="primary" href="/characters/create">
        New character
      </ButtonLink>
      {characters}
    </div>
  );
};

export default React.memo(CharactersContainer);
