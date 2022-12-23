"use client";
import { useToast } from "@chakra-ui/react";
import { Ability, Category } from "@prisma/client";
import { startCase } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "../../../../components/Button";
import {
  alternateMedium,
  primaryBold,
  primaryMedium,
  alternateBold,
} from "../../../../utils/fonts";
import { Legend } from "../../../../components/Legend";
import { prisma } from "../../../../prisma/db";
import { addLearned } from "../../../../utils/addLearned";
import { GetServerSidePropsContext } from "next";

type CategoryProps = Category & {
  abilities: (Ability & { learned: boolean })[];
};

type AddAbilityProps = Ability & { learned: boolean };

const AddAbilityCard = (props: {
  ability: AddAbilityProps;
  characterId: string;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[] | null>>;
}) => {
  const toast = useToast();
  const [open, setOpen] = React.useState(false);
  const learnAbility = async (abilityId: number) => {
    const response = await fetch("/api/abilities/add/", {
      method: "POST",
      body: JSON.stringify({ characterId: props.characterId, abilityId }),
    });
    const data = await response.json();
    if (response.ok) {
      props.setCategories(data.data);
      toast({
        title: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    } else
      toast({
        title: data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
  };

  const unlearnAbility = async (abilityId: number) => {
    const response = await fetch("/api/abilities/remove/", {
      method: "POST",
      body: JSON.stringify({ characterId: props.characterId, abilityId }),
    });
    if (response.ok) {
      const data = await response.json();
      props.setCategories(data.data);
    }
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      className={`rounded-xl w-full border min-h-[1rem] py-4 px-6 mt-6 ${
        !props.ability.learned ? "bg-black/20" : ""
      }`}
    >
      <div
        className="w-full flex flex-row justify-between"
        onClick={() => setOpen((value) => !value)}
      >
        <div className={`ap ${alternateBold.className}`}>
          {props.ability.apCost}
        </div>
        <div className={`${primaryBold.className} text-xl`}>
          {startCase(props.ability.name)}
        </div>
        {!!props.ability.extra ? (
          <div
            className={`py-1 px-2 min-w-[25px] h-[25px] bg-black text-white center font-bold text-sm ${alternateMedium.className}`}
          >
            {props.ability.extra}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {open && (
        <div>
          <hr className="my-5" />
          <div
            style={{ color: "black" }}
            dangerouslySetInnerHTML={{ __html: props.ability.description }}
          />
          {props.ability.learned ? (
            <Button
              style={{ marginTop: "1rem" }}
              variant="secondary"
              onClick={() => unlearnAbility(props.ability.id)}
            >
              Remove
            </Button>
          ) : (
            <Button
              style={{ marginTop: "1rem" }}
              onClick={() => learnAbility(props.ability.id)}
            >
              Add
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const CategoryCard = (props: {
  category: CategoryProps;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={`rounded-xl w-full ${props.category.name} border min-h-[1rem] py-4 px-6`}
    >
      <div
        className="w-full flex flex-row justify-between center"
        onClick={() => setOpen((value) => !value)}
        style={{ cursor: "pointer" }}
      >
        <div className={`${primaryBold.className} text-xl`}>
          {startCase(props.category.name)}
        </div>
      </div>
      {open && (
        <div>
          <hr className="my-5" />
          {props.children}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context?.params;

  const character = await prisma.character.findUniqueOrThrow({
    where: { id },
    include: {
      class: {
        include: {
          categories: {
            include: {
              abilities: {
                include: {
                  characters: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const categories = addLearned(character, id);

  return {
    props: {
      categories,
      params: {
        id,
      },
    }, // will be passed to the page component as props
  };
}

const AddAbility = (props: any) => {
  const [categories, setCategories] = React.useState<CategoryProps[] | null>(
    () => props.categories
  );
  const router = useRouter();

  const id = router?.query?.id as string;

  let categoryList: any = null;

  categoryList = (
    <div className="center flex-col gap-6">
      {categories?.map((cat: CategoryProps) => (
        <CategoryCard key={cat.id} category={cat}>
          {cat.abilities.map((ab) => (
            <AddAbilityCard
              characterId={id}
              ability={ab}
              key={ab.order}
              setCategories={setCategories}
            />
          ))}
        </CategoryCard>
      ))}
    </div>
  );
  return (
    <>
      <h1
        className={`underline text-center mb-6 underline-offset-2 text-xl ${primaryMedium.className}`}
      >
        Add ability
      </h1>
      <Legend />
      <br />
      {categoryList}
      <Button
        style={{ marginTop: "2rem" }}
        onClick={() =>
          router.push(`/characters/${router?.query?.id}/abilities`)
        }
        variant="primary"
      >
        Back
      </Button>
    </>
  );
};

export default React.memo(AddAbility);
