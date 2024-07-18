/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `JobApplicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserId` to the `JobApplicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplicant" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobApplicant_UserId_key" ON "JobApplicant"("UserId");

-- AddForeignKey
ALTER TABLE "JobApplicant" ADD CONSTRAINT "JobApplicant_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
