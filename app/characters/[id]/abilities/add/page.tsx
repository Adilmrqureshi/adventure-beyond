"use client";
import { Ability, Category } from "@prisma/client";
import { startCase } from "lodash";
import * as React from "react";
import { primaryBold } from "../../../../../utils/fonts";
import "../../../../index.css";

type CategoryProps = Category & {
  abilities: (Ability & { learned: boolean })[];
};

const CategoryCard = (props: { category: CategoryProps }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="rounded-xl w-full border min-h-[1rem] py-4 px-6"
      onClick={() => setOpen((value) => !value)}
    >
      <div className="w-full flex flex-row justify-between center">
        <div className={`${primaryBold.className} text-xl`}>
          {startCase(props.category.name)}
        </div>
      </div>
      {open && (
        <div>
          <hr className="my-5" />
          {/* <div dangerouslySetInnerHTML={{ __html: ability.description }} /> */}
        </div>
      )}
    </div>
  );
};

const AddAbility = (props: any) => {
  const [categories, setCategories] = React.useState<CategoryProps[] | null>(
    null
  );

  React.useEffect(() => {
    if (categories === null) {
      const response = fetch("/api/categories/", {
        cache: "force-cache",
        method: "POST",
        body: JSON.stringify({ id: props.params.id }),
      })
        .then((res) => res.json())
        .then((data) => setCategories(data.data));
    }
  }, [categories]);
  console.log(categories, "cat");

  return categories !== null ? (
    <div className="center flex-col gap-6">
      {categories?.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  ) : null;
};

export default AddAbility;
