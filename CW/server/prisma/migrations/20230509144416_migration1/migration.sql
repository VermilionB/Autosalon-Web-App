-- CreateTable
CREATE TABLE "automobiles" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "modelId" INTEGER,
    "techDetailId" INTEGER,
    "description" TEXT,

    CONSTRAINT "automobiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_types" (
    "id" SERIAL NOT NULL,
    "bodyType" VARCHAR(255) NOT NULL,

    CONSTRAINT "body_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "brand" VARCHAR(255) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userAuthId" INTEGER,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engine_layouts" (
    "id" SERIAL NOT NULL,
    "engineLayout" VARCHAR(255) NOT NULL,

    CONSTRAINT "engine_layouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fuel_types" (
    "id" SERIAL NOT NULL,
    "fuelType" VARCHAR(255) NOT NULL,

    CONSTRAINT "fuel_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amountOfSoldCars" INTEGER DEFAULT 0,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "address" VARCHAR(255) NOT NULL,
    "userAuthId" INTEGER,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "brandId" INTEGER,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "customerId" INTEGER,
    "managerId" INTEGER,
    "automobileId" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "automobileId" INTEGER,
    "customerId" INTEGER,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_details" (
    "id" SERIAL NOT NULL,
    "power" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "releaseDate" TIMESTAMPTZ(6) NOT NULL,
    "engineSize" DECIMAL NOT NULL,
    "fuelTypeId" INTEGER,
    "bodyTypeId" INTEGER,
    "engineLayoutId" INTEGER,

    CONSTRAINT "tech_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auths" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),

    CONSTRAINT "user_auths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "automobile_id" INTEGER,
    "image" VARCHAR(255),

    CONSTRAINT "id_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "body_types_bodyType_key" ON "body_types"("bodyType");

-- CreateIndex
CREATE UNIQUE INDEX "brands_brand_key" ON "brands"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "engine_layouts_engineLayout_key" ON "engine_layouts"("engineLayout");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_types_fuelType_key" ON "fuel_types"("fuelType");

-- CreateIndex
CREATE UNIQUE INDEX "user_auths_email_key" ON "user_auths"("email");

-- AddForeignKey
ALTER TABLE "automobiles" ADD CONSTRAINT "automobiles_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automobiles" ADD CONSTRAINT "automobiles_techDetailId_fkey" FOREIGN KEY ("techDetailId") REFERENCES "tech_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "user_auths"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "user_auths"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_automobileId_fkey" FOREIGN KEY ("automobileId") REFERENCES "automobiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_automobileId_fkey" FOREIGN KEY ("automobileId") REFERENCES "automobiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_details" ADD CONSTRAINT "tech_details_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "body_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_details" ADD CONSTRAINT "tech_details_engineLayoutId_fkey" FOREIGN KEY ("engineLayoutId") REFERENCES "engine_layouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_details" ADD CONSTRAINT "tech_details_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "fuel_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "foreign_key_name" FOREIGN KEY ("automobile_id") REFERENCES "automobiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
