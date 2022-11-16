export const getCharacter = async (id: string) =>
  await prisma?.character.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      bio: true,
    },
  });
