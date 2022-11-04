"use client";

import React from "react";
import { TextInput } from "../../../components/TextInput";
import { Formik, Form } from "formik";
import { BulletedTextInput } from "../../../components/NumberedTextInput";
import ButtonPrimary from "../../../components/Button";
import { Character } from "@prisma/client";

const createCharacter = async (character: Omit<Character, "id">) => {
  const response = await fetch("/api/createCharacter/", {
    method: "POST",
    body: JSON.stringify(character),
  });
  return await response.json();
};

const CharacterCreate = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          age: "",
          height: "",
          role: "",
          appearance: "",
          clothing: "",
          gait: "",
          location: "",
          nation: "",
          ideal: "",
          flaw: "",
          dream: "",
        }}
        onSubmit={(values) => {
          const character = createCharacter({
            ...values,
            role: "FIGHTER",
            age: +values.age,
          });
          console.log("Submitted ", character);
        }}
      >
        <Form>
          <TextInput name="name" label="My name is:" />
          <TextInput name="age" marginTop={4} label="My age is:" />
          <TextInput name="height" marginTop={4} label="My height is:" />
          <BulletedTextInput
            name="role"
            marginTop={4}
            label="I'm the party's:"
            number={1}
          />
          <BulletedTextInput
            name="appearance"
            marginTop={4}
            label="When people see me they first notice my:"
            number={2}
          />
          <BulletedTextInput
            name="clothing"
            marginTop={4}
            label="I wear:"
            number={3}
          />
          <TextInput name="gait" marginTop={4} label="and I move with:" />
          <BulletedTextInput
            name="location"
            marginTop={4}
            label="I'm from:"
            number={4}
          />
          <TextInput
            name="nation"
            marginTop={4}
            label="where my people are known for:"
          />
          <BulletedTextInput
            name="ideal"
            marginTop={4}
            label="My ideal is:"
            number={5}
          />
          <BulletedTextInput
            name="flaw"
            marginTop={4}
            label="However my flaw is:"
            number={6}
          />
          <BulletedTextInput
            name="dream"
            marginTop={4}
            label="My dream is:"
            number={7}
          />
          <div className="w-full flex" style={{ marginTop: "2rem" }}>
            <ButtonPrimary style={{ marginRight: "1rem" }} type="submit">
              Save
            </ButtonPrimary>
            <ButtonPrimary variant="secondary" style={{ marginLeft: "1rem" }}>
              Cancel
            </ButtonPrimary>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CharacterCreate;
