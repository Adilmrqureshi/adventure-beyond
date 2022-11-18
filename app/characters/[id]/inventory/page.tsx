"use client";

import "../../../index.css";
import React, { useState } from "react";
import { primaryMedium } from "../../../../utils/fonts";
import { Form, Formik } from "formik";
import { BulletedTextInput } from "../../../../components/BulletedTextInput";
import Button from "../../../../components/Button";
import { InventoryItem } from "@prisma/client";
import { useRouter } from "next/navigation";

const getInventoryItems = async (characterId: string) => {
  const response = await fetch("/api/inventory/all/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId }),
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
};

const Inventory = (props: any) => {
  const [inventory, setInventory] = useState<InventoryItem[] | null>(null);
  React.useEffect(() => {
    getInventoryItems(props.params.id).then((data) => setInventory(data));
  }, []);

  return inventory && <InventoryForm inventory={inventory} {...props} />;
};

const InventoryForm = (props: any) => {
  const router = useRouter();

  const initialValues = {
    one: props?.inventory[0]?.name,
    two: props?.inventory[1]?.name,
    three: props?.inventory[2]?.name,
    four: props?.inventory[3]?.name,
    five: props?.inventory[4]?.name,
    six: props?.inventory[5]?.name,
    seven: props?.inventory[6]?.name,
    eight: props?.inventory[7]?.name,
    nine: props?.inventory[8]?.name,
    ten: props?.inventory[9]?.name,
    eleven: props?.inventory[10]?.name,
    twelve: props?.inventory[11]?.name,
  };

  return (
    <div>
      <h3
        className={`underline text-center underline-offset-2 text-xl mb-6 ${primaryMedium.className}`}
      >
        Inventory
      </h3>
      <Formik
        onSubmit={async (values) => {
          const response = await fetch("/api/inventory/update/", {
            method: "POST",
            body: JSON.stringify({
              characterId: props.params.id,
              items: Object.values(values),
            }),
          });
          const data = await response.json();
        }}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form>
            {Object.keys(initialValues).map((name, index) => (
              <BulletedTextInput
                marginTop={1.5}
                key={name}
                name={name}
                number={index + 1}
              />
            ))}
            <Button type="submit" style={{ marginTop: "2rem" }}>
              Save
            </Button>
            <Button
              type="button"
              style={{ marginTop: "1rem" }}
              variant="secondary"
              onClick={() => {
                formik.resetForm();
                router.back();
              }}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Inventory;
