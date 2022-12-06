import { Bio, Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { addLearned } from "../../../utils/addLearned";

type UpdateCharacterInput = {
  bio: Bio;
  role: Role;
  id: string;
};

export default async function inventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: UpdateCharacterInput = JSON.parse(req.body);
  const characterId = data?.id;
  const bio = data?.bio;
  const role = data?.role;

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
  }

  try {
    const character = await prisma.character.update({
      where: { id: characterId },
      data: {
        bio: { update: body },
        class: {
          connect: { id: role },
        },
      },
    });
    res.json({
      message: `Successfully retrieved bio for character: ${characterId}`,
      data: character,
    });
  } catch (e) {
    console.log(`Error: ${e}, of type ${typeof e}`);
    res.json({
      error: ``,
    });
  }
}
