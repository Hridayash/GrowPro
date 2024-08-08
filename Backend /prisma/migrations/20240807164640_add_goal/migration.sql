-- CreateTable
CREATE TABLE "Goal" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "EmployeeId" INTEGER NOT NULL,
    "ManagerId" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_ManagerId_fkey" FOREIGN KEY ("ManagerId") REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
