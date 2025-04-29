/*
  Warnings:

  - You are about to alter the column `frequency` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Subscription` MODIFY `frequency` ENUM('monthly', 'quarterly', 'yearly') NOT NULL;
