-- CreateTable
CREATE TABLE "CommentLikes" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_commentLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentLikes_commentId_key" ON "CommentLikes"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "_commentLikes_AB_unique" ON "_commentLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_commentLikes_B_index" ON "_commentLikes"("B");

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentLikes" ADD CONSTRAINT "_commentLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "CommentLikes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentLikes" ADD CONSTRAINT "_commentLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
