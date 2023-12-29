const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// app.get("/users", db.getUsers);
// app.get("/users/:id", db.getUserById);
app.post("/users", async (req, res) => {
  const user = await db.createUser(req.body);
  console.log("response", user);
  if (user.status == 201) {
    res.status(201).json(user);
  } else {
    res.status(400).json({ message: "User already exists" });
  }
});
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
