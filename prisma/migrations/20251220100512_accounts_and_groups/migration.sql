-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "income" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "investment" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "financial_account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "currentBalance" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "type" TEXT NOT NULL,
    "parentId" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "limit" DECIMAL(19,4) NOT NULL,
    "period" TEXT NOT NULL,
    "rolloverEnabled" BOOLEAN NOT NULL DEFAULT false,
    "alertThreshold" INTEGER NOT NULL DEFAULT 80,
    "alertThresholdType" TEXT NOT NULL DEFAULT 'percentage',
    "userId" TEXT NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liability" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "balance" DECIMAL(19,4) NOT NULL,
    "interestRate" DECIMAL(5,4),
    "minimumPayment" DECIMAL(19,4),
    "accountId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "liability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "financial_account_userId_idx" ON "financial_account"("userId");

-- CreateIndex
CREATE INDEX "category_userId_idx" ON "category"("userId");

-- CreateIndex
CREATE INDEX "category_type_idx" ON "category"("type");

-- CreateIndex
CREATE INDEX "tag_userId_idx" ON "tag"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_userId_name_key" ON "tag"("userId", "name");

-- CreateIndex
CREATE INDEX "budget_userId_idx" ON "budget"("userId");

-- CreateIndex
CREATE INDEX "budget_categoryId_idx" ON "budget"("categoryId");

-- CreateIndex
CREATE INDEX "liability_userId_idx" ON "liability"("userId");

-- CreateIndex
CREATE INDEX "liability_accountId_idx" ON "liability"("accountId");

-- CreateIndex
CREATE INDEX "expense_userId_idx" ON "expense"("userId");

-- CreateIndex
CREATE INDEX "expense_categoryId_idx" ON "expense"("categoryId");

-- CreateIndex
CREATE INDEX "expense_accountId_idx" ON "expense"("accountId");

-- CreateIndex
CREATE INDEX "income_userId_idx" ON "income"("userId");

-- CreateIndex
CREATE INDEX "income_categoryId_idx" ON "income"("categoryId");

-- CreateIndex
CREATE INDEX "income_accountId_idx" ON "income"("accountId");

-- CreateIndex
CREATE INDEX "investment_userId_idx" ON "investment"("userId");

-- CreateIndex
CREATE INDEX "investment_categoryId_idx" ON "investment"("categoryId");

-- CreateIndex
CREATE INDEX "investment_accountId_idx" ON "investment"("accountId");

-- CreateIndex
CREATE INDEX "subscription_userId_idx" ON "subscription"("userId");

-- CreateIndex
CREATE INDEX "subscription_categoryId_idx" ON "subscription"("categoryId");

-- CreateIndex
CREATE INDEX "subscription_accountId_idx" ON "subscription"("accountId");

-- AddForeignKey
ALTER TABLE "financial_account" ADD CONSTRAINT "financial_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liability" ADD CONSTRAINT "liability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
