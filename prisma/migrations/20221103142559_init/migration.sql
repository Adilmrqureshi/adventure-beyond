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
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
