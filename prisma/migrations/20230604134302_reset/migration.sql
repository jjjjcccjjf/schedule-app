-- CreateTable
CREATE TABLE "schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from_date" DATETIME NOT NULL,
    "to_date" DATETIME NOT NULL,
    "room_number" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL
);
