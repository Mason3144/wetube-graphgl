/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `VerificationCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_code_key" ON "VerificationCode"("code");
