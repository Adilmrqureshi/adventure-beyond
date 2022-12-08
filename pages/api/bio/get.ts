import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { addLearned } from "../../../utils/addLearned";

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const characterId = JSON.parse(req.body).id;
  try {
    const bio = await prisma.bio.findUniqueOrThrow({
      where: { characterId: characterId },
      include: { character: { select: { class: true } } },
    });
    res.json({
      message: `Successfully retrieved bio for character: ${characterId}`,
      data: bio,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: `Error: ${e}, of type ${typeof e}`,
    });
  }
}
