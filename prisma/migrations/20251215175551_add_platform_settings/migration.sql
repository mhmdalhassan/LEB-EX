-- CreateTable
CREATE TABLE "PlatformSettings" (
    "id" TEXT NOT NULL DEFAULT 'platform',
    "platformName" TEXT NOT NULL DEFAULT 'LEB-EX',
    "defaultPlan" TEXT NOT NULL DEFAULT 'Basic',
    "defaultMonthlyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "defaultPaymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "supportEmail" TEXT,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformSettings_pkey" PRIMARY KEY ("id")
);
