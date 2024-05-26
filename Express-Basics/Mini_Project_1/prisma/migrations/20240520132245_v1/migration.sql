-- CreateTable
CREATE TABLE "User2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User2_id_key" ON "User2"("id");
