/*
  Warnings:

  - You are about to drop the column `MetaDescription` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "MetaDescription",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "metaDescription" TEXT;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "isAdmin";

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories"("slug");

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
