-- CreateTable
CREATE TABLE "Profile" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "FullName" TEXT NOT NULL,
    "Position" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Education" JSONB NOT NULL,
    "Experience" JSONB NOT NULL,
    "Skills" JSONB NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_UserId_key" ON "Profile"("UserId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
