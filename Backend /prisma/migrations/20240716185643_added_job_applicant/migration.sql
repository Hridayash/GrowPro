-- CreateTable
CREATE TABLE "JobApplicant" (
    "Id" SERIAL NOT NULL,
    "JobId" INTEGER NOT NULL,
    "ProfileId" INTEGER NOT NULL,
    "AppliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobApplicant_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "JobApplicant" ADD CONSTRAINT "JobApplicant_JobId_fkey" FOREIGN KEY ("JobId") REFERENCES "Job"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicant" ADD CONSTRAINT "JobApplicant_ProfileId_fkey" FOREIGN KEY ("ProfileId") REFERENCES "Profile"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
