import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

interface GetInventoryRequest {
  characterId: string;
}

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const data: GetInventoryRequest = req.body;
      const inventory = await prisma.inventoryItem.findMany({
        where: { characterId: data.characterId },
      });
      res.json({
        message: "Successfully retrieved inventory",
        data: inventory,
      });
    } catch (e) {
      console.log(`Error: ${e}, of type ${typeof e}`);
      res.json({ error: "There was an error retrieving you inventory" });
    }
  } else {
    res.status(405);
  }
}
