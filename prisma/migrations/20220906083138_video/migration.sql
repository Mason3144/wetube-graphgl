-- DropForeignKey
ALTER TABLE "Chennel" DROP CONSTRAINT "Chennel_userId_fkey";

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "videoName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_userId_key" ON "Video"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_videoId_key" ON "Video"("videoId");

-- AddForeignKey
ALTER TABLE "Chennel" ADD CONSTRAINT "Chennel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Chennel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
