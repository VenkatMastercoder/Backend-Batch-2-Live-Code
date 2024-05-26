const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();

const prisma = new PrismaClient();


const api = require("./router/index")

// API BASE URL OR BASE ROUTE
// GET : http://localhost:3007/v1/restaurants
// GET : http://localhost:3007/v1/restaurants-details
app.use("/v1",api)


// http://localhost:3007/restaurants - GET
// app.get("/restaurants", async (req, res) => {
//   // Data from Frontend [ Optional ]
//   try {
//     // DB Logic
//     const restaurants = await prisma.restaurant.findMany();

//     // Res to Frontend
//     res.json({ message: "Data Fetched Scuessfully", data: restaurants });
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", error: err });
//   }
// });

// app.get("/restaurant/:id", async (req, res) => {
//   try {
//     // data from Frontend
//     const restaurantId = req.params;

//     // db Logic
//     const restaurantDetails = await prisma.restaurantDetails.findUnique({
//       where: {
//         restaurant_id: restaurantId.id,
//       },
//       include: {
//         food_list: true,
//         similar_restaurants: true,
//       },
//     });

//     // Res to Frontend
//     res.json({ restaurantDetails });
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", error: err });
//   }
// });

app.get("/restaurants", );

app.get("/restaurant/:id", async (req, res) => {
  try {
    // data from Frontend
    const restaurantId = req.params;

    // db Logic
    const restaurantDetails = await prisma.restaurantDetails.findUnique({
      where: {
        restaurant_id: restaurantId.id,
      },
      include: {
        food_list: true,
        similar_restaurants: true,
      },
    });

    // Res to Frontend
    res.json({ restaurantDetails });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});


app.listen(3007);
