"use client";

import React from "react";
import { Formik, Form } from "formik";
import { BulletedTextInput } from "../../../../../components/NumberedTextInput";

const iterator = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

const InventoryForm = () => {
  return (
    <Formik onSubmit={() => {}} initialValues={{}}>
      <Form>
        {iterator.map((name, index) => (
          <BulletedTextInput key={name} name={name} number={index + 1} />
        ))}
      </Form>
    </Formik>
  );
};
export default InventoryForm;
