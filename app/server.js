const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(express.json());

const { addUser } = require("./models/UserModel");

const userRoute = require("./routes/User");
app.use("/users", userRoute);

app.post("/users", async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(201).send({ message: "User created", data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const options = {
  key: fs.readFileSync("certificat/server.key"),
  cert: fs.readFileSync("certificat/server.cert"),
};

https.createServer(options, app).listen(443);
