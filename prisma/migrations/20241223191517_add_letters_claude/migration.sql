-- CreateTable
CREATE TABLE "letters-claude" (
    "id" SERIAL NOT NULL,
    "childLetterText" TEXT NOT NULL,
    "santaResponseText" TEXT,
    "allowSharing" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "letters-claude_pkey" PRIMARY KEY ("id")
);
