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

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bio" (
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "role" "Role" NOT NULL,
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
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "order" INTEGER NOT NULL,
    "apCost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_characterId_key" ON "Bio"("characterId");

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
