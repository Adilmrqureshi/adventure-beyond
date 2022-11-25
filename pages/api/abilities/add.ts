import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { addLearned } from "../../../utils/addLearned";

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const characterId = JSON.parse(req.body).characterId;
    const abilityId = JSON.parse(req.body).abilityId;

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
      message: "Successfully retrieved inventory",
      data: response,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({ error: "There was an error retrieving you abilities" });
  }
}
