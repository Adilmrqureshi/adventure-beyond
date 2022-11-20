import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

interface UpdateInventoryRequest {
  characterId: string;
  items: string[];
}

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data: UpdateInventoryRequest = JSON.parse(req.body);

    try {
      const characterId = data.characterId;
      const itemsObj: { name: string }[] = data.items
        .filter((item) => !!item)
        .map((item) => ({
          name: item,
        }));

      await prisma.$transaction([
        prisma.character.update({
          where: { id: characterId },
          data: {
            inventory: {
              deleteMany: {},
            },
          },
        }),
        prisma.character.update({
          where: { id: characterId },
          data: {
            inventory: {
              createMany: {
                data: itemsObj,
              },
            },
          },
        }),
      ]);

      res.json({
        message: "Your inventory was successfully updated.",
      });
    } catch (e) {
      console.error(`Error: ${e} - of type: ${typeof e}`);
      res.json({
        message: "An error has occurred while updating your inventory",
      });
    }
  } else {
    res.status(405);
  }
}
