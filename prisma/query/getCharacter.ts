import { prisma } from "../db";

export const getCharacter = async (id: string) =>
  await prisma?.character.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      class: true,
      bio: true,
    },
  });
