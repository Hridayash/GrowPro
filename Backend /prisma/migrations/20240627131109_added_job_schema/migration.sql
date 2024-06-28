-- CreateTable
CREATE TABLE "Job" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "DatePosted" TIMESTAMP(3) NOT NULL,
    "Description" TEXT NOT NULL,
    "Responisbities" TEXT[],
    "Requirement" TEXT[],
    "Benifits" TEXT[],

    CONSTRAINT "Job_pkey" PRIMARY KEY ("Id")
);
