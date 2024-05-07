const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(express.json());

const { addUser } = require("./db/db-connection");

const userRoute = require("./routes/User");
app.use("/users", userRoute);

app.post("/users", async (req, res) => {
  const result = await addUser(req.body);
  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  res.status(201).send("User created");
});

const options = {
  key: fs.readFileSync("certificat/server.key"),
  cert: fs.readFileSync("certificat/server.cert"),
};

https.createServer(options, app).listen(443);
