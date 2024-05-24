const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const app = express();
app.use(express.json());

const userRoute = require("./routes/User");

var corsOptions = {
  origin: `http://localhost:5173`,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

app.use("/users", userRoute);
app.use("/login", userRoute);

const options = {
  key: fs.readFileSync("certificat/server.key"),
  cert: fs.readFileSync("certificat/server.cert"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Server is running on https://localhost:443");
});
