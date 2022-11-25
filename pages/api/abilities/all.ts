import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = JSON.parse(req.body).id;

    const character = await prisma?.character?.findUniqueOrThrow({
      where: { id: id },
      include: { abilities: true },
    });

    res.json({
      message: "Successfully retrieved inventory",
      data: character?.abilities,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({ error: "There was an error retrieving you abilities" });
  }
}
