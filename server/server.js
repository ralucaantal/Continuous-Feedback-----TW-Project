const express = require("express");
const app = express();
var pg = require("pg");
var connectionString = "postgres://postgres:6203@localhost:5432/feedback";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
pgClient
  .query("SELECT * FROM users")
  .then((res) => res.rows)
  .then((data) => {
    console.log(data[0].username);
  });

app.get("/api", (req, res) => {
  res.json({ users: ["Administrator", "Profesor", "Student"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
