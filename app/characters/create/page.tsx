"use client";

import React from "react";
import { TextInput } from "../../../components/TextInput";
import { Formik, Form } from "formik";
import { BulletedTextInput } from "../../../components/BulletedTextInput";
import Button from "../../../components/Button";
import { Bio, Role } from "@prisma/client";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const createCharacter = async (bio: Omit<Omit<Bio, "characterId">, "id">) => {
  return await fetch("/api/createCharacter/", {
    method: "POST",
    body: JSON.stringify(bio),
  });
};

const REQUIRED_MESSAGE = "This field is required";

let schema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE),
  age: yup.number().required(REQUIRED_MESSAGE).positive().integer(),
  height: yup.string().required(REQUIRED_MESSAGE),
  role: yup.string().required(REQUIRED_MESSAGE).oneOf(Object.values(Role)),
  appearance: yup.string().required(REQUIRED_MESSAGE),
  clothing: yup.string().required(REQUIRED_MESSAGE),
  gait: yup.string().required(REQUIRED_MESSAGE),
  location: yup.string().required(REQUIRED_MESSAGE),
  nation: yup.string().required(REQUIRED_MESSAGE),
  ideal: yup.string().required(REQUIRED_MESSAGE),
  flaw: yup.string().required(REQUIRED_MESSAGE),
  dream: yup.string().required(REQUIRED_MESSAGE),
});

const CharacterCreate = () => {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          age: 0,
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
        validationSchema={schema}
        onSubmit={async (values) => {
          const response = await createCharacter({
            ...values,
            role: values.role as Role,
            age: values.age,
          });
          if (response.ok) router.push("/characters");
        }}
      >
        {(formik) => (
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
              <Button
                variant="primary"
                style={{ marginRight: "1rem" }}
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  router.back();
                  formik.resetForm();
                }}
                style={{ marginLeft: "1rem" }}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CharacterCreate;
