import { Bio, Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "next-auth";
import { prisma } from "../../../prisma/db";
import quickstart from "../../../utils/quickstart";

type CreateCharacterInput = {
  bio: Bio;
  role: Role;
  user: Omit<User, "id">;
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

    if (!user?.email) {
      res.json({ error: "No email provided" });
      return;
    }

    const character = await prisma.character.create({
      data: {
        user: { connect: { email: user.email } },
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
