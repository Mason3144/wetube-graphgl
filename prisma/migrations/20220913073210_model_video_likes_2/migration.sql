/*
  Warnings:

  - You are about to drop the column `userId` on the `videoLikes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "videoLikes" DROP CONSTRAINT "videoLikes_userId_fkey";

-- AlterTable
ALTER TABLE "videoLikes" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_videoLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_videoLikes_AB_unique" ON "_videoLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_videoLikes_B_index" ON "_videoLikes"("B");

-- AddForeignKey
ALTER TABLE "_videoLikes" ADD CONSTRAINT "_videoLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_videoLikes" ADD CONSTRAINT "_videoLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "videoLikes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
