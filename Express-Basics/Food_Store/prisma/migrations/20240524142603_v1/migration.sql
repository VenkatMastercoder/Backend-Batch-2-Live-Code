-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "RestaurantDetails" (
    "id" SERIAL NOT NULL,
    "restaurant_details_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "restaurant_text" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "RestaurantDetails_pkey" PRIMARY KEY ("restaurant_details_id")
);

-- CreateTable
CREATE TABLE "FoodLists" (
    "id" SERIAL NOT NULL,
    "food_list_id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "rating" TEXT,
    "product_image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_details_id" TEXT NOT NULL,

    CONSTRAINT "FoodLists_pkey" PRIMARY KEY ("food_list_id")
);

-- CreateTable
CREATE TABLE "SimilarRestaurant" (
    "id" SERIAL NOT NULL,
    "similar_restaurants_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "restaurant_details_id" TEXT NOT NULL,

    CONSTRAINT "SimilarRestaurant_pkey" PRIMARY KEY ("similar_restaurants_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurant_id_key" ON "Restaurant"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantDetails_restaurant_details_id_key" ON "RestaurantDetails"("restaurant_details_id");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantDetails_restaurant_id_key" ON "RestaurantDetails"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "FoodLists_food_list_id_key" ON "FoodLists"("food_list_id");

-- CreateIndex
CREATE UNIQUE INDEX "SimilarRestaurant_similar_restaurants_id_key" ON "SimilarRestaurant"("similar_restaurants_id");

-- AddForeignKey
ALTER TABLE "RestaurantDetails" ADD CONSTRAINT "RestaurantDetails_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLists" ADD CONSTRAINT "FoodLists_restaurant_details_id_fkey" FOREIGN KEY ("restaurant_details_id") REFERENCES "RestaurantDetails"("restaurant_details_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimilarRestaurant" ADD CONSTRAINT "SimilarRestaurant_restaurant_details_id_fkey" FOREIGN KEY ("restaurant_details_id") REFERENCES "RestaurantDetails"("restaurant_details_id") ON DELETE CASCADE ON UPDATE CASCADE;
