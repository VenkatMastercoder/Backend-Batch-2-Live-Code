const getAllRestaurantService = require("../../service/restaurantService/restaurantService");

const restaurantController = async (req, res) => {
  try {
    // DB Logic
    const restaurants = await getAllRestaurantService.getAllRestaurantService();

    // Res to Frontend
    res.json({ message: "Data Fetched Scuessfully", data: restaurants });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

module.exports = restaurantController;
