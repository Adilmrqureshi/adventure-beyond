import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const { user } = body;
  let characters;
  const userProfile = await prisma.user.findUnique({
    where: { email: user.email },
    select: { isAdmin: true },
  });

  try {
    if (userProfile?.isAdmin) {
      characters = await prisma.character.findMany({
        include: {
          class: true,
          bio: {
            select: {
              name: true,
            },
          },
        },
      });
    } else {
      characters = await prisma.character.findMany({
        where: { user },
        include: {
          class: true,
          bio: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    res.json({
      message: `Successfully retrieved characters`,
      data: characters,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: `Error: ${e}, of type ${typeof e}`,
    });
  }
}
