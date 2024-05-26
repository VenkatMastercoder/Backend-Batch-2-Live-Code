const express = require("express");
const restaurantController = require("../../controller/restaurantController/restaurantController");

const restaurantRouter = express.Router();
// GET : http://localhost:3007/v1/restaurants/
restaurantRouter.get("/",restaurantController)

module.exports = restaurantRouter;
