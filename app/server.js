const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(express.json());

const userRoute = require("./routes/User");
app.use("/users", userRoute);

app.use("/login", userRoute);

const options = {
  key: fs.readFileSync("certificat/server.key"),
  cert: fs.readFileSync("certificat/server.cert"),
};

https.createServer(options, app).listen(443);
