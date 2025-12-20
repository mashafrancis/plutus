/*
  Warnings:

  - You are about to drop the column `active` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `subscription` table. All the data in the column will be lost.
  - Added the required column `billingCycle` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "active",
DROP COLUMN "date",
DROP COLUMN "paid",
ADD COLUMN     "billingCycle" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "nextPaymentDate" TEXT,
ADD COLUMN     "startDate" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "subscription_payment" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "subscription_payment_subscriptionId_idx" ON "subscription_payment"("subscriptionId");

-- CreateIndex
CREATE INDEX "subscription_status_idx" ON "subscription"("status");

-- AddForeignKey
ALTER TABLE "subscription_payment" ADD CONSTRAINT "subscription_payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
