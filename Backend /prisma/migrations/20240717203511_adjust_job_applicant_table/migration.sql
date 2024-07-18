-- AlterTable
ALTER TABLE "JobApplicant" ADD COLUMN     "Status" TEXT NOT NULL DEFAULT 'Processing',
ALTER COLUMN "Approved" DROP NOT NULL,
ALTER COLUMN "Approved" DROP DEFAULT;
