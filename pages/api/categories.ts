import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/db";

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const characterId = JSON.parse(req.body).id;
  try {
    const character = await prisma.character.findUniqueOrThrow({
      where: { id: characterId },
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

    const response = character.class.categories.map((cat) => ({
      abilities: cat.abilities.map((ab) => ({
        learned: !!ab.characters.find((char) => char.id === characterId),
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

    res.json({
      message: `Successfully retrieved categories for character ${character.id}`,
      data: response,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: `There was an error while fetching categories for ${characterId}`,
    });
  }
}
