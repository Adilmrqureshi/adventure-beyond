"use client";
import { Ability, Category } from "@prisma/client";
import { startCase } from "lodash";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "../../../../../components/Button";
import {
  alternateMedium,
  primaryBold,
  primaryMedium,
} from "../../../../../utils/fonts";
import "../../../../index.css";
import { Legend } from "../Legend";

type CategoryProps = Category & {
  abilities: (Ability & { learned: boolean })[];
};

type AddAbilityProps = Ability & { learned: boolean };

const AddAbilityCard = (props: {
  ability: AddAbilityProps;
  characterId: string;
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[] | null>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const learnAbility = async (abilityId: number) => {
    const response = await fetch("/api/abilities/add/", {
      method: "POST",
      body: JSON.stringify({ characterId: props.characterId, abilityId }),
    });
    if (response.ok) {
      const data = await response.json();
      props.setCategories(data.data);
    }
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
      className={`rounded-xl w-full border min-h-[1rem] py-4 px-6 mt-6 ${
        !props.ability.learned ? "bg-slate-300" : ""
      }`}
    >
      <div
        className="w-full flex flex-row justify-between"
        onClick={() => setOpen((value) => !value)}
      >
        <div className={`ap ${alternateMedium.className}`}>
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
    <div className="rounded-xl w-full border min-h-[1rem] py-4 px-6">
      <div
        className="w-full flex flex-row justify-between center"
        onClick={() => setOpen((value) => !value)}
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

const AddAbility = (props: any) => {
  const [categories, setCategories] = React.useState<CategoryProps[] | null>(
    null
  );
  const router = useRouter();

  React.useEffect(() => {
    if (categories === null) {
      fetch("/api/categories/", {
        cache: "force-cache",
        method: "POST",
        body: JSON.stringify({ id: props.params.id }),
      })
        .then((res) => res.json())
        .then((data) => setCategories(data.data));
    }
  }, [categories, props?.params?.id]);

  return (
    <div>
      <h1
        className={`underline text-center mb-6 underline-offset-2 text-xl ${primaryMedium.className}`}
      >
        Add ability
      </h1>
      <Legend />

      <br />
      {categories !== null ? (
        <div className="center flex-col gap-6">
          {categories?.map((cat) => (
            <CategoryCard key={cat.id} category={cat}>
              {cat.abilities.map((ab) => (
                <AddAbilityCard
                  characterId={props.params.id}
                  ability={ab}
                  key={ab.order}
                  setCategories={setCategories}
                />
              ))}
            </CategoryCard>
          ))}
        </div>
      ) : null}
      <Button
        style={{ marginTop: "2rem" }}
        onClick={() => router.back()}
        variant="primary"
      >
        Back
      </Button>
    </div>
  );
};

export default AddAbility;
