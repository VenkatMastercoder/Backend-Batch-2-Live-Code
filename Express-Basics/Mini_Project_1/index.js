const { PrismaClient } = require("@prisma/client");
const express = require("express");

// It will Create a Http Server [ Instance ]
const app = express();

const prisma = new PrismaClient();

// http://localhost:3000/app
app.get("/app", (req, res) => {
  res.send("Hello");
});

// http://localhost:3000/
app.get("/", async (req, res) => {
  // Data from Frontend [ Optional ]

  // Db Logic
  const productData = await prisma.product.findMany();

  // Data to frontend
  res.json({
    message: "product Data Retrieved Sucessfully",
    data: productData,
  });
});

app.get("/:id", async (req, res) => {
  // Data from Frontend [ Optional ]
  const productId = req.params;

  console.log(productId)

  // Db Logic
  const productData = await prisma.product.findUnique({
    where : {
      id : productId.id
    }
  });

  // Data to frontend
  res.json({
    message: "product Data Retrieved Sucessfully",
    data: productData,
  });


});

app.listen(3000);
