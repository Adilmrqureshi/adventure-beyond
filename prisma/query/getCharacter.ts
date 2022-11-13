export const getCharacter = async (id: number) =>
  await prisma?.character.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
