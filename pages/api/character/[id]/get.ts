import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";

export default async function character(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id as string;
  if (!id) res.status(400).json("Invalid URL");
  try {
    const character = await prisma.character.findUniqueOrThrow({
      where: { id },
      include: { bio: true },
    });
    res.json({
      message: `Successfully retrieved character: ${id}`,
      data: character,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: `Error: ${e}, of type ${typeof e}`,
    });
  }
}
