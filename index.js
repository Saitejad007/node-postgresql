const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const db = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// db.sync({ force: true }).then(() => {
//   console.log("db has been re sync");
// });

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
    port: `Running at port - ${port}`,
  });
});

app.use("/api/users", userRoutes);
