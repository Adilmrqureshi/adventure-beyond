import React from "react";
import "../index.css";
import { Character } from "@prisma/client";
import { ButtonLink } from "../../components/Button";
import { secondary } from "../../utils/fonts";

const InfoBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`border w-full p-2 text-center ${secondary.className}`}>
      {children}
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="w-full drop-shadow-2xl flex flex-col gap-y-4 p-4 my-4 shadow">
      <InfoBox>{character.name}</InfoBox>
      <InfoBox>{character.role}</InfoBox>
      <InfoBox>HP: {10}</InfoBox>
      <InfoBox>AP: {10}</InfoBox>
      <ButtonLink href={`/characters/${character.id}/view/`}>View</ButtonLink>
    </div>
  );
};

export default CharacterCard;
