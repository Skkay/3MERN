const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

require("dotenv").config({ path: path.join(__dirname, "config/.env") });
require("dotenv").config({ path: path.join(__dirname, "config/.env.local") });
require("./config/database.js");

const port = process.env.PORT;
const cors = require("cors");
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("*", checkUser);
app.get("/require_auth", requireAuth, (req, res) => {
  if (!res.locals.user) {
    res.status(401).send("No token found");
  }
  res.status(200).send(res.locals.user);
});

app.use("/", homeRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
