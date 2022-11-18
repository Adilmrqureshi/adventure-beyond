import { Bio, Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/db";

type CreateCharacterInput = {
  bio: Bio;
  role: Role;
};

export default async function newCharacter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data: CreateCharacterInput = JSON.parse(req.body);
    const bio = data?.bio;
    const role = data?.role;

    const body = {
      name: bio.name,
      age: bio.age,
      height: bio.height,
      appearance: bio.appearance,
      clothing: bio.clothing,
      gait: bio.gait,
      nation: bio.nation,
      flaw: bio.flaw,
      ideal: bio.ideal,
      location: bio.location,
      dream: bio.dream,
    };

    if (role in Role === false) {
      res.json({ error: `Invalid role` });
    }

    const character = await prisma.character.create({
      data: {
        bio: { create: body },
        class: {
          connectOrCreate: { where: { id: role }, create: { id: role } },
        },
      },
    });

    res.json({ message: `Character create [id: ${character.id}]`, character });
  } else {
    res.status(405);
  }
}
