/*
  Warnings:

  - You are about to drop the `letters-claude` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "letters-claude";

-- CreateTable
CREATE TABLE "letters_claude" (
    "id" SERIAL NOT NULL,
    "childLetterText" TEXT NOT NULL,
    "santaResponseText" TEXT,
    "allowSharing" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "letters_claude_pkey" PRIMARY KEY ("id")
);
