import { Ability, Category, Character } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { addLearned } from "../../../utils/addLearned";

interface AbilityWithCharacter extends Ability {
  characters: Character[];
}
interface CategoryWithAbilities extends Category {
  abilities: AbilityWithCharacter[];
}

const isAbilityNextInOrder = (
  category: CategoryWithAbilities,
  abilityToAdd: Ability,
  characterId: string
) => {
  for (let order = 1; order < abilityToAdd.order; order++) {
    const ability = category.abilities.find((a) => a.order === order);
    if (!ability) return "ability missing";
    const isLearned = ability?.characters.find(
      (character) => character.id === characterId
    );
    if (!isLearned) {
      return "invalid";
    }
  }
  return "valid";
};

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const characterId = JSON.parse(req.body).characterId;
    const abilityId = JSON.parse(req.body).abilityId;

    const ability = await prisma?.ability.findUniqueOrThrow({
      where: { id: abilityId },
      include: {
        category: { include: { abilities: { include: { characters: true } } } },
      },
    });

    const isValid = isAbilityNextInOrder(
      ability.category,
      ability,
      characterId
    );

    if (isValid === "invalid") {
      res.status(400).json({
        error:
          "You need to add abilities in order. Please add the abilities before this one first.",
      });
      return;
    } else if (isValid === "ability missing") {
      res.status(400).json({
        error:
          "There is an ability missing in this category. [Id: " +
          ability.category.id +
          "]",
      });
      return;
    }

    const character = await prisma?.character?.update({
      where: { id: characterId },
      data: { abilities: { connect: { id: abilityId } } },
      include: {
        class: {
          include: {
            categories: {
              include: {
                abilities: {
                  include: {
                    characters: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const response = addLearned(character, characterId);

    res.json({
      message: "Successfully added ability",
      data: response,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({ error: "There was an error retrieving you abilities" });
  }
}
