const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config/.env") });

const port = process.env.PORT;
const app = require('./server');

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
