const fs = require("fs");
const { parse } = require("csv-parse");
const { prisma } = require("../prisma/db");

fs.createReadStream(process.cwd() + "/utils/Abilities.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row: string[]) {
    const abilityName = row[0];
    const apCost = +row[1];
    const description = row[2];
    const categoryName = row[3];
    const extra = row[4];
    const roleName = row[5];
    const order = +row[6];
    const c = await prisma.class.findUniqueOrThrow({
      where: { id: roleName },
      include: {
        categories: true,
      },
    });

    const category = c.categories.find((cat: any) => cat.name === categoryName);

    if (category) {
      const ability = await prisma.ability.upsert({
        where: { name: abilityName },
        update: {},
        create: {
          name: abilityName,
          apCost,
          description,
          extra,
          order,
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    } else {
      console.log("Failed to get category for:");

      console.log(abilityName, "A NAME");
      console.log(c, "class");
      console.log(categoryName, "name");
    }
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error: any) {
    console.log(error.message);
  });

export {};
