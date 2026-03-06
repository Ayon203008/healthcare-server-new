/*
  Warnings:

  - You are about to drop the column `UserId` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `avaregeRating` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `expreience` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `needPasswordChanged` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `appointmentFee` on the `doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_UserId_fkey";

-- DropIndex
DROP INDEX "doctor_UserId_key";

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "UserId",
DROP COLUMN "avaregeRating",
DROP COLUMN "expreience",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "appointmentFee",
ADD COLUMN     "appointmentFee" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "needPasswordChanged",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "doctor_userId_key" ON "doctor"("userId");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
