-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "subscriptionPrice" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "subscriptionPlan" SET DEFAULT 'Basic';
