import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";

export default async function deleteCharacter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id as string;
  console.log(req?.query);

  if (!id) res.status(400).json("Invalid URL");
  try {
    await prisma.$transaction([
      prisma.character.update({
        where: { id },
        data: { bio: { delete: true }, inventory: { deleteMany: {} } },
      }),
      prisma.character.delete({ where: { id } }),
    ]);

    res.json({
      message: `Successfully deleted character.`,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: `Error: ${e}, of type ${typeof e}`,
    });
  }
}
