-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "recurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurringFrequency" TEXT;

-- CreateTable
CREATE TABLE "expense_tag" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "expense_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expense_tag_expenseId_idx" ON "expense_tag"("expenseId");

-- CreateIndex
CREATE INDEX "expense_tag_tagId_idx" ON "expense_tag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "expense_tag_expenseId_tagId_key" ON "expense_tag"("expenseId", "tagId");

-- CreateIndex
CREATE INDEX "expense_recurring_idx" ON "expense"("recurring");

-- AddForeignKey
ALTER TABLE "expense_tag" ADD CONSTRAINT "expense_tag_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_tag" ADD CONSTRAINT "expense_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
