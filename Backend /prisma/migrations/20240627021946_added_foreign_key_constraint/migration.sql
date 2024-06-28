/*
  Warnings:

  - Added the required column `Role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_UserId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
