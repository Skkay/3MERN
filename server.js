const express = require("express");
const app = express();
const path = require("path");

const userRoutes = require("./routes/user.routes");

require("dotenv").config({ path: path.join(__dirname, "config/.env") });
require("dotenv").config({ path: path.join(__dirname, "config/.env.local") });
require("./config/database.js");

const port = process.env.PORT;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
