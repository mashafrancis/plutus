/*
  Warnings:

  - You are about to drop the column `price` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `investment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "investment" DROP COLUMN "price",
DROP COLUMN "units",
ADD COLUMN     "assetType" TEXT NOT NULL DEFAULT 'stocks',
ADD COLUMN     "costBasis" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "currentValue" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "note" TEXT,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "shares" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "ticker" TEXT;

-- CreateTable
CREATE TABLE "investment_transaction" (
    "id" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "shares" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investment_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment_price_history" (
    "id" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investment_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "investment_transaction_investmentId_idx" ON "investment_transaction"("investmentId");

-- CreateIndex
CREATE INDEX "investment_transaction_date_idx" ON "investment_transaction"("date");

-- CreateIndex
CREATE INDEX "investment_price_history_investmentId_idx" ON "investment_price_history"("investmentId");

-- CreateIndex
CREATE INDEX "investment_price_history_date_idx" ON "investment_price_history"("date");

-- CreateIndex
CREATE UNIQUE INDEX "investment_price_history_investmentId_date_key" ON "investment_price_history"("investmentId", "date");

-- CreateIndex
CREATE INDEX "investment_assetType_idx" ON "investment"("assetType");

-- AddForeignKey
ALTER TABLE "investment_transaction" ADD CONSTRAINT "investment_transaction_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment_price_history" ADD CONSTRAINT "investment_price_history_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
