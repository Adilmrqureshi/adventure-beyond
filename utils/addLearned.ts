import { Ability, Category, Character, Class } from "@prisma/client";

type CharacterProp = Character & {
  class: Class & {
    categories: (Category & {
      abilities: (Ability & {
        characters: Character[];
      })[];
    })[];
  };
};
export const addLearned = (character: CharacterProp, characterId: string) =>
  character.class.categories.map((cat: any) => ({
    abilities: cat.abilities.map((ab: any) => ({
      learned: !!ab.characters.find((char: any) => char.id === characterId),
      name: ab.name,
      id: ab.id,
      apCost: ab.apCost,
      order: ab.order,
      extra: ab.extra,
      description: ab.description,
    })),
    name: cat.name,
    id: cat.id,
  }));
