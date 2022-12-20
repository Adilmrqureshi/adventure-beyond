import { alternateMedium } from "../utils/fonts";

export const Legend = () => {
  return (
    <div className="pt-0 p-3">
      <div className="mb-1">
        <span
          className={`py-1 px-2 w-[40px] h-[25px] bg-black text-white font-bold text-sm ${alternateMedium.className}`}
        >
          ROLL
        </span>{" "}
        - Roll the die. Ability will have different outcomes, depending on the
        result of a dice role
      </div>
      <div className="mb-1">
        <span
          className={`py-1 px-2 w-[40px] h-[25px] bg-black text-white font-bold text-sm ${alternateMedium.className}`}
        >
          VARI
        </span>{" "}
        - Variable. Ability will have different options to use and different AP
        costs. You will chose yourself which version you want to use.
      </div>
      <div>
        <span
          className={`py-1 px-2 w-[40px] h-[25px] bg-black text-white font-bold text-sm ${alternateMedium.className}`}
        >
          ITEM
        </span>{" "}
        - Magical item. This is a physical item which will be visible to other
        players. Items can be activated for an AP cost.
      </div>
    </div>
  );
};
