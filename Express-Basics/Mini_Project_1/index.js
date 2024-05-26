const { PrismaClient } = require("@prisma/client");
const express = require("express");

// this Create an Instance of Http Server
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

// http://localhost:3000/
app.get("/", async (req, res) => {
  // Data from Frontend [ Optional ]

  // DB Logic
  const userData = await prisma.user2.findMany();

  // Send data to Frontend
  res.json({ data: userData });
});

// http://localhost:3000/
app.get("/:id", async (req, res) => {
  // Data from Frontend [ Optional ]
  const userId = req.params;

  console.log("params", userId);

  // DB Logic
  const userData = await prisma.user2.findUnique({
    where: {
      id: userId.id,
    },
  });

  // Send data to Frontend
  res.json({ data: userData });
});

// http://localhost:3000/
app.post("/", async (req, res) => {
  // Data from Frontend
  const userData = req.body;
  console.log(userData);

  // DB Logic
  const newUser = await prisma.user2.create({
    data: {
      id: userData.id,
      name: userData.name,
    },
  });

  // Data Frontend
  res.json({ message: "User as been Sucessfully " });
});

app.put("/", async (req, res) => {
  // data from Frontend
  const newData = req.body;
  console.log(newData);

  // Db Logic
  const newUserData = await prisma.user2.update({
    where: {
      id: newData.id,
    },
    data: {
      id: newData.id,
      name: newData.name,
    },
  });

  // data to Frontend
  res.json({ newData: newUserData });
});

app.delete("/", async (req, res) => {
  // data from Frontend
  const userId = req.body;

  // DB Logic
  await prisma.user2.delete({
    where: {
      id: userId.id,
    },
  });

  // data to Frontend
  res.json({ message: " user delete Sucessfully" });
});

// http://localhost:3000/user
app.get("/user", (req, res) => {
  const data = req.headers;
  console.log("user route - 1", data);

  // Db logic

  // Send Data to Frontend
  res.send("Data from headers");
});

// http://localhost:3000/user
app.post("/user", (req, res) => {
  const data = req.headers;
  console.log("user route - 2", data);

  // Db logic

  // Send Data to Frontend
  res.send("Data from headers");
});

app.listen(3000);
