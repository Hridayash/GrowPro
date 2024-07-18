/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Comment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `Rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `adaptability` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendanceAndPunctuality` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communicationSkills` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerSatisfaction` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initiative` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leadershipPotential` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemSolvingAbilities` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productivity` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualityOfWork` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamwork` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_UserId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "Comment",
DROP COLUMN "CreatedAt",
DROP COLUMN "Id",
DROP COLUMN "Rating",
DROP COLUMN "UserId",
ADD COLUMN     "adaptability" INTEGER NOT NULL,
ADD COLUMN     "attendanceAndPunctuality" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "communicationSkills" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerSatisfaction" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "initiative" INTEGER NOT NULL,
ADD COLUMN     "leadershipPotential" INTEGER NOT NULL,
ADD COLUMN     "problemSolvingAbilities" INTEGER NOT NULL,
ADD COLUMN     "productivity" INTEGER NOT NULL,
ADD COLUMN     "qualityOfWork" INTEGER NOT NULL,
ADD COLUMN     "teamwork" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
