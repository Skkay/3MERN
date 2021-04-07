const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "config/.env") });
require("dotenv").config({ path: path.join(__dirname, "config/.env.local") });
require("./config/database.js");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
