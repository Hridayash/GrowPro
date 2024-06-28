/*
  Warnings:

  - You are about to drop the column `Benifits` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Requirement` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Responisbities` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "Benifits",
DROP COLUMN "Requirement",
DROP COLUMN "Responisbities",
ALTER COLUMN "DatePosted" SET DEFAULT CURRENT_TIMESTAMP;
