import { Role } from "@prisma/client";
import { lowerCase } from "lodash";

type Quickstart = {
  [key in keyof typeof Role]: string[];
};

type QuickstartResult = {
  [key in keyof typeof Role]: { name: string }[];
};

const quickstart: Quickstart = {
  FIGHTER: [
    "Counterattack",
    "Wild Attack",
    "Provoke",
    "Intercept",
    "Summon the Blood",
    "Size Up",
  ],
  INVOKER: [
    "Declare",
    "Petition",
    "Soul Gaze",
    "Fiery Avenger",
    "Thunderous Word",
    "Shield",
  ],
  RANGER: [
    "Commune",
    "Read the Winds",
    "Speak with Animal",
    "Animal Partner",
    "Track",
    "Remedy",
  ],
  NATURALIST: [
    "Animal Form",
    "Thorn",
    "Freeze",
    "Cloudcall",
    "Wild Aspect",
    "Command Nature",
  ],
  DOCTOR: [
    "Mend",
    "Sleep",
    "Deathsense",
    "Corrupt",
    "Modulate",
    "Examine the Dead",
  ],
  SPY: [
    "Cosmopolitan",
    "Sneak Attack",
    "Strap",
    "Tracker",
    "Persona",
    "Feather Hook",
  ],
  MAGICIAN: [
    "Magic Tricks",
    "Splitting Image",
    "Magic Eye",
    "Little Bird",
    "Bamboozle",
    "Scintillate",
  ],
  WIZARD: [
    "Magic Strike",
    "Blink",
    "Sense Magic",
    "Speak",
    "Pinch",
    "Familiar",
  ],
};

const format: (obj: Quickstart) => QuickstartResult = (obj: Quickstart) => {
  const result: QuickstartResult = {
    FIGHTER: [],
    INVOKER: [],
    RANGER: [],
    NATURALIST: [],
    DOCTOR: [],
    SPY: [],
    MAGICIAN: [],
    WIZARD: [],
  };
  Object.keys(obj).forEach((role) => {
    // @ts-ignore
    result[role] = obj[role].map((ability: stirng) => ({
      name: lowerCase(ability.trim()),
    }));
  });
  return result;
};

export default format(quickstart);
