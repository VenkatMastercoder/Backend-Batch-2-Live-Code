const express = require("express");

// Create an Instance of HTTP Server
const app = express();

app.use(express.json());

// http://localhost:3000/app
app.get("/app", (req, res) => {
  // Data from Frontend [ Optional for Get ]

  // DB Logic

  // send Data to Frontend
  res.send("Text");
});

app.get("/:id", (req, res) => {
  // Data from Frontend [ Optional for Get ]
  const userId = req.params;
  console.log(userId);

  // DB Logic

  // send Data to Frontend
  res.json({ message: "Data Get Method", data: userId });
});

app.post("/app", (req, res) => {
  // Data from Frontend
  const data = req.body;
  console.log("lfndlfn", data);

  // DB Logic

  // send Data to Frontend
  res.json({ message: "Data Post Method" });
});

app.put("/app", (req, res) => {
  // Data from Frontend
  const data = req.body;
  console.log("lfndlfn", data);
  
  // DB Logic

  // send Data to Frontend
  res.json({ message: "Data PUT Method" });
});

app.delete("/app", (req, res) => {
  // Data from Frontend
  const data = req.body;
  console.log("lfndlfn", data);
  
  // DB Logic

  // send Data to Frontend
  res.json({ message: "Data delete Method" });
});

app.listen(3000);
