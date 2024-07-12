/*
  Warnings:

  - You are about to drop the column `Education` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Experience` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `Skills` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "Education",
DROP COLUMN "Experience",
DROP COLUMN "Skills",
ADD COLUMN     "CoverUrl" TEXT,
ADD COLUMN     "ProfileUrl" TEXT;

-- CreateTable
CREATE TABLE "Education" (
    "Id" SERIAL NOT NULL,
    "InstituteName" TEXT NOT NULL,
    "Course" TEXT NOT NULL,
    "GraduationYear" INTEGER NOT NULL,
    "Grade" TEXT NOT NULL,
    "Details" TEXT NOT NULL,
    "ProfileId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "Id" SERIAL NOT NULL,
    "InstituteName" TEXT NOT NULL,
    "Course" TEXT NOT NULL,
    "Details" TEXT NOT NULL,
    "ProfileId" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "Id" SERIAL NOT NULL,
    "Position" TEXT NOT NULL,
    "Company" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3),
    "ProfileId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Education_ProfileId_key" ON "Education"("ProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_ProfileId_key" ON "Certification"("ProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_ProfileId_key" ON "Experience"("ProfileId");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_ProfileId_fkey" FOREIGN KEY ("ProfileId") REFERENCES "Profile"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_ProfileId_fkey" FOREIGN KEY ("ProfileId") REFERENCES "Profile"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_ProfileId_fkey" FOREIGN KEY ("ProfileId") REFERENCES "Profile"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
