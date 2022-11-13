import { Form, Formik } from "formik";
import React from "react";
import { BulletedTextInput } from "../../../../components/NumberedTextInput";
import { getCharacter } from "../../../../prisma/query/getCharacter";
import { primaryMedium } from "../../../../utils/fonts";


const Inventory = async (props: any) => {
  const myCharacter = await getCharacter(+props.params.id);
  return (
    <div>
      {" "}
      <h3
        className={`underline text-center underline-offset-2 text-xl mb-6 ${primaryMedium.className}`}
      >
        {myCharacter?.name}
      </h3>
      
    </div>
  );
};

export default Inventory;
