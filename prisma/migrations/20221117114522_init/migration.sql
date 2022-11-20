-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FIGHTER', 'INVOKER', 'RANGER', 'NATURALIST', 'DOCTOR', 'SPY', 'WIZARD', 'MAGICIAN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "ap" INTEGER NOT NULL DEFAULT 10,
    "maxAp" INTEGER NOT NULL DEFAULT 10,
    "hp" INTEGER NOT NULL DEFAULT 10,
    "maxHp" INTEGER NOT NULL DEFAULT 10,
    "gold" INTEGER NOT NULL DEFAULT 1,
    "silver" INTEGER NOT NULL DEFAULT 1000,
    "role" "Role" NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" "Role" NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bio" (
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "appearance" TEXT NOT NULL,
    "clothing" TEXT NOT NULL,
    "gait" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "nation" TEXT NOT NULL,
    "ideal" TEXT NOT NULL,
    "flaw" TEXT NOT NULL,
    "dream" TEXT NOT NULL,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("characterId")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "apCost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AbilityToCharacter" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_characterId_key" ON "Bio"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToCharacter_AB_unique" ON "_AbilityToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToCharacter_B_index" ON "_AbilityToCharacter"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_role_fkey" FOREIGN KEY ("role") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_role_fkey" FOREIGN KEY ("role") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToCharacter" ADD CONSTRAINT "_AbilityToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToCharacter" ADD CONSTRAINT "_AbilityToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
