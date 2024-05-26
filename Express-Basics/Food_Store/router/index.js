const express = require("express");
const restaurantRouter = require("./restaurantRouter/restaurantRouter");
const restaurantDetailRouter = require("./restaurantDetailRouter/restaurantDetailRouter");

const router = express.Router();

// GET : http://localhost:3007/v1/restaurants
router.use("/restaurants",restaurantRouter);
router.use("/restaurants-details",restaurantDetailRouter);

module.exports = router;
