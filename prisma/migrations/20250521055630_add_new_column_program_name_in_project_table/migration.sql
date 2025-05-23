/*
  Warnings:

  - Added the required column `prog_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `prog_id` VARCHAR(191) NOT NULL;
