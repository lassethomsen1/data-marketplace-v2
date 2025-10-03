/*
  Warnings:

  - Added the required column `sampleData` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "sampleData" TEXT NOT NULL;
