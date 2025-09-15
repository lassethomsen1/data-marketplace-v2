-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "DatasetStatus" AS ENUM ('PROCESSING', 'AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "additionalFiles" JSONB,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "status" "DatasetStatus" NOT NULL DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paidAmount" INTEGER,
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING';
