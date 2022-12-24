import { Bio, Role } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import quickstart from "../../../utils/quickstart";

type CreateCharacterInput = {
  bio: Bio;
  role: Role;
  user: User;
};

export default async function newCharacter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data: CreateCharacterInput = JSON.parse(req.body);
    const { bio, role, user } = data;

    const body = {
      name: bio.name,
      age: +bio.age,
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
      return;
    }

    if (user?.id === undefined) {
      res.status(401).json({ error: "Unauthorised" });
      return;
    }

    const character = await prisma.character.create({
      data: {
        userId: user.id,
        bio: { create: body },
        class: {
          connectOrCreate: { where: { id: role }, create: { id: role } },
        },
        abilities: {
          connect: quickstart[role],
        },
      },
    });

    res.json({ message: `Successfully created character`, character });
  } else {
    res.status(405);
  }
}
