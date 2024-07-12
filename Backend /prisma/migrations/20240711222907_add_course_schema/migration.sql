-- CreateTable
CREATE TABLE "Course" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Duration" TEXT NOT NULL,
    "FileUrl" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("Id")
);
