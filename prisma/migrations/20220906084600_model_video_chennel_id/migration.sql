/*
  Warnings:

  - You are about to drop the column `videoId` on the `Video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chennelId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chennelId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_videoId_fkey";

-- DropIndex
DROP INDEX "Video_videoId_key";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "videoId",
ADD COLUMN     "chennelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Video_chennelId_key" ON "Video"("chennelId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_chennelId_fkey" FOREIGN KEY ("chennelId") REFERENCES "Chennel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
