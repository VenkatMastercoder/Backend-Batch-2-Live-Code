const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRestaurantService = async () => {
  const restaurantData = await prisma.restaurant.findMany();
  return restaurantData;
};

module.exports = { getAllRestaurantService };
