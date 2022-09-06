/*
  Warnings:

  - A unique constraint covering the columns `[chennelName]` on the table `Chennel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chennelName` to the `Chennel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chennel" ADD COLUMN     "chennelName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chennel_chennelName_key" ON "Chennel"("chennelName");
