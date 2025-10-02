/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Dataset` table. All the data in the column will be lost.
  - Added the required column `filekey` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filesize` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filetype` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP COLUMN "fileUrl",
ADD COLUMN     "filekey" TEXT NOT NULL,
ADD COLUMN     "filesize" INTEGER NOT NULL,
ADD COLUMN     "filetype" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
