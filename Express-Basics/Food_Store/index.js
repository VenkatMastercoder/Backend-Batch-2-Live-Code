const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { z } = require("zod");
const app = express();

const prisma = new PrismaClient();

const api = require("./router/index");

app.use(express.json());

const restaurantIdSchema = z.object({
  id: z.string(),
});

// API BASE URL OR BASE ROUTE
// GET : http://localhost:3007/v1/restaurants
// GET : http://localhost:3007/v1/restaurants-details
app.get("/test", (req, res) => {
  res.send("API V1 - WORKING");
});

app.use("/v1", api);

// http://localhost:3007/restaurants - GET
app.get("/restaurants", async (req, res) => {
  // Data from Frontend [ Optional ]
  try {
    // DB Logic
    const restaurants = await prisma.restaurant.findMany();

    // Res to Frontend
    res.json({ message: "Data Fetched Scuessfully", data: restaurants });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

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

app.get("/restaurant/:id", async (req, res) => {
  try {
    // data from Frontend
    const restaurantId = restaurantIdSchema.parse(req.params); // undefined

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

app.get("/app", (req, res, next) => {
  try {
    // data from Frontend
    let username = restaurantIdSchema.parse(req.body);

    if (username) {
      throw new Error("Username is Missing", 404);
    }

    // DB lOGIC

    // dATA TO fRONTEND
    res.send("Test");
  } catch (err) {
    next(err);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const globalErrorHandingMiddleware = (err, req, res, next) => {
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};

app.use(globalErrorHandingMiddleware);

app.listen(3007, () => {
  console.log("Server Running");
});
