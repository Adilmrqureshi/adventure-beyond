import React from "react";
import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <>
      <MenuItem href="/characters">Characters</MenuItem>
      <MenuItem href="/adventures">Adventures</MenuItem>
      <MenuItem href="/roll">Roll the die</MenuItem>
    </>
  );
}
