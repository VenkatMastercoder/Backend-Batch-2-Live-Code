const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

app.use(express.json());

app.post("/register", async (req, res) => {
  // Data from Frontend
  const userData = req.body;

  // DB lOGIC

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  console.log(userData, existingUser);

  if (existingUser === null) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUserData = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phonenumber: userData.phonenumber,
        dob: userData.dob,
        password: hashedPassword,
      },
    });

    // DATA To Frontend
    return res
      .status(201)
      .json({ messgae: "User Register Successfully", data: newUserData });
  } else {
    return res.status(400).json({ messgae: "user already Exists" });
  }
});

app.post("/login", async (req, res) => {
  // Data from Frontend
  const userData = req.body;

  // DB Logic
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  console.log(existingUser);

  if (existingUser) {
    const comparePassword = await bcrypt.compare(
      userData.password,
      existingUser.password
    );
    if (comparePassword) {
      let accessToken = jwt.sign({ userId: userData.userId }, "key", {
        expiresIn: "1m",
      }); // Invaild -- /refresh - main:reFreshToken

      let refreshToken = jwt.sign({ userId: userData.userId }, "key", {
        expiresIn: "2m",
      }); // Invaild -- user Login Again

      await prisma.refreshToken.create({
        data: {
          userId: existingUser.id,
          token: refreshToken,
        },
      });

      return res.json({
        data: existingUser,
        messgae: "Login Successfully",
        token: {
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });
    } else {
      return res.json({ data: null, messgae: "password is Invaild" });
    }
  } else {
    return res.json({ messgae: "User Does not Exists" });
  }

  // Data to Frontend
});

app.post("/refresh", async (req, res) => {
  // Get the Data from Frontend
  const data = req.body;
  console.log(data);

  // DB Logic
  const tokenExits = await prisma.refreshToken.findUnique({
    where: {
      token: data.token.refreshToken,
    },
  });

  console.log(tokenExits);

  if (tokenExits !== null) {
    jwt.verify(tokenExits.token, "key", function (err, decoded) {
      console.log("Tooken");
      if (err) {
        console.log(err);
        return res.json({ messgae: "Token Invaid", err: err });
      }
      let accessToken = jwt.sign({ userId: tokenExits.userId }, "key", {
        expiresIn: "1m",
      });

      return res.status(200).json({ accessToken });
    });
  } else {
    return res.json({ messgae: "Token Invaid" });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers;
  const token = authHeader.authorization.split(" ")[1];

  if (!token) {
    return res.json({ messgae: "No Token" });
  } else {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        return res.json({ messgae: "Token Invaid", err: err });
      }
      next();
    });
  }

  console.log(authHeader);
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send("Hello");
});

app.listen(3008);
