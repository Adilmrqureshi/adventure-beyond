const fs = require("fs");
const { parse } = require("csv-parse");
const { prisma } = require("../prisma/db");

fs.createReadStream(process.cwd() + "/utils/Categories.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row: string[]) {
    const categoryName = row[0];
    const roleName = row[1];
    prisma.category
      .create({
        data: {
          name: categoryName,
          class: {
            connectOrCreate: {
              where: { id: roleName },
              create: { id: roleName },
            },
          },
        },
      })
      .then((data: any) => console.log(data));
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error: any) {
    console.log(error.message);
  });

export {};
