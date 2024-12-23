-- CreateTable
CREATE TABLE "letters" (
    "id" SERIAL NOT NULL,
    "childLetterText" TEXT NOT NULL,
    "santaResponseText" TEXT,
    "allowSharing" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "letters_pkey" PRIMARY KEY ("id")
);
