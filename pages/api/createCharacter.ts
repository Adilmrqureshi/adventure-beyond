import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/db";

export default async function newCharacter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = JSON.parse(req.body);

    let age;
    if (typeof data.age === "string") age = data.age.parseInt();

    const character = await prisma.character.create({ data });
    ({
      name: data.name,
      age: age,
      height: data.height,
      role: data.role,
      appearance: data.appearance,
      clothing: data.clothing,
      gait: data.gait,
      nation: data.nation,
      flaw: data.flaw,
      ideal: data.ideal,
      location: data.location,
      dream: data.dream,
    });

    res.json({ message: `Character create [id: ${character.id}]`, character });
  } else {
    res.status(405);
  }
}
