/*
  Warnings:

  - Made the column `image` on table `post table` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post table` MODIFY `image` TEXT NOT NULL,
    MODIFY `content` TEXT NULL;
