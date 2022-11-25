import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/db";
import { addLearned } from "../../utils/addLearned";

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

    const response = addLearned(character, characterId);

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
