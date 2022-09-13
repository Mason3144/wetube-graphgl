/*
  Warnings:

  - You are about to drop the `videoLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_videoLikes" DROP CONSTRAINT "_videoLikes_B_fkey";

-- DropForeignKey
ALTER TABLE "videoLikes" DROP CONSTRAINT "videoLikes_videoId_fkey";

-- DropTable
DROP TABLE "videoLikes";

-- CreateTable
CREATE TABLE "VideoLikes" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoLikes_videoId_key" ON "VideoLikes"("videoId");

-- AddForeignKey
ALTER TABLE "VideoLikes" ADD CONSTRAINT "VideoLikes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_videoLikes" ADD CONSTRAINT "_videoLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoLikes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
