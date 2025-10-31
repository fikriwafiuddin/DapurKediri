-- CreateEnum
CREATE TYPE "enum_category_menu" AS ENUM ('FOOD', 'DRINK', 'SNACK', 'BUNDLE');

-- CreateEnum
CREATE TYPE "enum_status_order" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "enum_category_promotion" AS ENUM ('ALL', 'FOOD', 'DRINK', 'SNACK', 'BUNDLE');

-- CreateEnum
CREATE TYPE "enum_discount_type" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(55) NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(500),
    "category" "enum_category_menu" NOT NULL,
    "price" INTEGER NOT NULL,
    "image" VARCHAR(255),
    "image_id" VARCHAR(255),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "order_number" TEXT NOT NULL,
    "customer_name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(13) NOT NULL,
    "address_street" VARCHAR(100) NOT NULL,
    "address_district" VARCHAR(20) NOT NULL,
    "address_city" VARCHAR(20) NOT NULL,
    "address_postal_code" VARCHAR(5) NOT NULL,
    "address_notes" TEXT,
    "total_amount" INTEGER NOT NULL,
    "discount_value" INTEGER DEFAULT 0,
    "promotion_id" INTEGER,
    "status" "enum_status_order" NOT NULL DEFAULT 'PENDING',
    "notes" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_name" VARCHAR(30) NOT NULL,
    "menu_price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    "description" VARCHAR(100),
    "code" VARCHAR(10) NOT NULL,
    "category" "enum_category_promotion" NOT NULL,
    "discount_type" "enum_discount_type" NOT NULL,
    "discount_value" INTEGER NOT NULL,
    "max_discount" INTEGER,
    "min_order_amount" INTEGER NOT NULL,
    "usage_limit" INTEGER NOT NULL,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "menu_name_key" ON "menu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "order_order_number_key" ON "order"("order_number");

-- CreateIndex
CREATE INDEX "order_order_number_idx" ON "order"("order_number");

-- CreateIndex
CREATE INDEX "order_status_idx" ON "order"("status");

-- CreateIndex
CREATE INDEX "order_created_at_idx" ON "order"("created_at");

-- CreateIndex
CREATE INDEX "order_item_order_id_idx" ON "order_item"("order_id");

-- CreateIndex
CREATE INDEX "order_item_menu_id_idx" ON "order_item"("menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_code_key" ON "promotion"("code");

-- CreateIndex
CREATE INDEX "promotion_code_idx" ON "promotion"("code");

-- CreateIndex
CREATE INDEX "promotion_active_idx" ON "promotion"("active");

-- CreateIndex
CREATE INDEX "promotion_valid_from_valid_to_idx" ON "promotion"("valid_from", "valid_to");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
