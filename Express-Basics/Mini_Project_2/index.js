const { PrismaClient } = require("@prisma/client");
const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

// It will Create a Http Server [ Instance ]
const app = express();

const prisma = new PrismaClient();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // THIRD PARTY
app.use(morgan("dev"));

app.use(express.json()); // CORE

// Custom Middleware

const Middleware1 = (req, res, next) => {
  console.log("Middleware-1");
  next();
};

const Middleware2 = (req, res, next) => {
  console.log("Middleware-2");
  next();
};

app.use(Middleware2);
app.use(Middleware1);

app.get("/test", (req, res) => {
  res.send("Working V1");
});

// http://localhost:3007/
app.get("/", async (req, res) => {
  try {
    // data from Frontend [ Can be Optional ]

    // DB logic
    const product = await prisma.product.findMany();

    // Data to Frontend
    res.status(200).json({ message: "Data Sucessfully", data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    // data from Frontend [ Can be Optional ]
    const productId = req.params;
    console.log(productId.id);

    // DB logic
    const productData = await prisma.product.findUnique({
      where: {
        id: productId.id,
      },
    });

    // Data to Frontend
    res.status(200).json({ data: productData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// http://localhost:3007/
app.post("/", async (req, res) => {
  try {
    // data from Frontend
    const productData = req.body;
    console.log(productData);

    // DB logic
    const newProduct = await prisma.product.create({
      data: {
        id: productData.id,
        image_url: productData.image_url,
        title: productData.title,
        rating: productData.rating,
        timing: productData.timing,
        location: productData.location,
      },
    });

    // Data to Frontend
    res.status(201).json({ data: newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    // data from Frontend
    const productData = req.body;

    const productId = req.params;

    // DB logic
    const newProduct = await prisma.product.update({
      where: {
        id: productId.id,
      },
      data: {
        id: productData.id,
        image_url: productData.image_url,
        title: productData.title,
        rating: productData.rating,
        timing: productData.timing,
        location: productData.location,
      },
    });

    // Data to Frontend
    res.status(200).json({ data: newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    // data from Frontend
    const productId = req.params;

    // DB logic
    await prisma.product.delete({
      where: {
        id: productId.id,
      },
    });

    // Data to Frontend
    res.status(200).json({ message: "product deleted Scessufully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3007);
