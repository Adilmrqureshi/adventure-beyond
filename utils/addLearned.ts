import { Ability, Category, Character, Class } from "@prisma/client";
import { orderBy } from "lodash";

type CharacterProp = Character & {
  class: Class & {
    categories: (Category & {
      abilities: (Ability & {
        characters: Character[];
      })[];
    })[];
  };
};

const getAbilities = (abilities: Ability[], characterId: string) =>
  abilities.map((ab: any) => ({
    learned: !!ab.characters.find((char: any) => char.id === characterId),
    name: ab.name,
    id: ab.id,
    apCost: ab.apCost,
    order: ab.order,
    extra: ab.extra,
    description: ab.description,
  }));

export const addLearned = (character: CharacterProp, characterId: string) =>
  character.class.categories.map((cat: any) => ({
    abilities: orderBy(getAbilities(cat.abilities, characterId), ["order"]),
    name: cat.name,
    id: cat.id,
  }));
