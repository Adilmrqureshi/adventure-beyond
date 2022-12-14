import {
  Alegreya,
  Alegreya_Sans_SC,
  Indie_Flower,
  Ovo,
} from "@next/font/google";

export const primary = Alegreya({ subsets: ["latin"] });
export const primaryExtraBold = Alegreya({ weight: "900", subsets: ["latin"] });
export const primaryBold = Alegreya({ weight: "800", subsets: ["latin"] });
export const primaryMedium = Alegreya({ weight: "700", subsets: ["latin"] });
export const primaryRegular = Alegreya({ weight: "600", subsets: ["latin"] });
export const primaryLight = Alegreya({ weight: "500", subsets: ["latin"] });
export const primaryExtraLight = Alegreya({
  weight: "400",
  subsets: ["latin"],
});

export const secondary = Ovo({ weight: "400", subsets: ["latin"] });

export const alternateExtraBold = Alegreya_Sans_SC({
  weight: "900",
  subsets: ["latin"],
});
export const alternateBold = Alegreya_Sans_SC({
  weight: "800",
  subsets: ["latin"],
});
export const alternateMedium = Alegreya_Sans_SC({
  weight: "700",
  subsets: ["latin"],
});
export const alternateLight = Alegreya_Sans_SC({
  weight: "500",
  subsets: ["latin"],
});
export const alternateExtraLight = Alegreya_Sans_SC({
  weight: "400",
  subsets: ["latin"],
});

export const formFont = Indie_Flower({ weight: "400", subsets: ["latin"] });
