"use client";

import "../../../index.css";
import React, { useState } from "react";
import { primaryMedium } from "../../../../utils/fonts";
import { Form, Formik } from "formik";
import { BulletedTextInput } from "../../../../components/BulletedTextInput";
import Button from "../../../../components/Button";
import { InventoryItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton, useToast } from "@chakra-ui/react";
import Loading from "../../../../components/Loading";

const Inventory = (props: any) => {
  const [inventory, setInventory] = useState<InventoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const getInventoryItems = async () => {
      const response = await fetch("/api/inventory/all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterId: props?.params?.id }),
      });
      const jsonResponse = await response.json();
      setLoading(false);
      setInventory(jsonResponse.data);
    };
    if (inventory === null) getInventoryItems();
  }, [inventory]);

  const id = props?.params?.id;

  if (loading) return <Loading />;

  return <InventoryForm loading={loading} inventory={inventory} id={id} />;
};

const InventoryForm = (props: any) => {
  const router = useRouter();
  const toast = useToast();

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
              characterId: props.id,
              items: Object.values(values),
            }),
          });
          const data = await response.json();
          toast({
            title: data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
            variant: "subtle",
          });
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
            <div className="w-full flex gap-4" style={{ marginTop: "2rem" }}>
              <Button
                type="submit"
                style={{
                  backgroundColor: "black",
                }}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  formik.resetForm();
                  router.back();
                }}
              >
                Back
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(Inventory);
