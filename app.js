const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./connection");
require("dotenv").config();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => res.json({ message: "working" }));

// Routes
const routes = require("./routes");
app.use(routes);

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is running on http://localhost/${PORT}`);
});
