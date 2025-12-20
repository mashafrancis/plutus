/*
  Warnings:

  - You are about to drop the column `category` on the `income` table. All the data in the column will be lost.
  - Added the required column `source` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "income" DROP COLUMN "category",
ADD COLUMN     "recurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurringFrequency" TEXT,
ADD COLUMN     "source" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "income_tag" (
    "id" TEXT NOT NULL,
    "incomeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "income_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "income_tag_incomeId_idx" ON "income_tag"("incomeId");

-- CreateIndex
CREATE INDEX "income_tag_tagId_idx" ON "income_tag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "income_tag_incomeId_tagId_key" ON "income_tag"("incomeId", "tagId");

-- CreateIndex
CREATE INDEX "income_recurring_idx" ON "income"("recurring");

-- AddForeignKey
ALTER TABLE "income_tag" ADD CONSTRAINT "income_tag_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "income"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income_tag" ADD CONSTRAINT "income_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
