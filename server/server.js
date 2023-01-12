const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
var bodyParser = require("body-parser");

const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
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

app.post("/register", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query("select username from users where username=$1;", [
      username,
    ])
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data);
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        pgClient.query("insert into users(username, password, tip) values($1,$2,$3);",[username, password,type])
        .then((result)=>{res.send({message: "s-a adaugat cu succes!"});})
      } else {
        console.log("utilizatorul exista");
        res.send({message: "utilizatorul deja exista"});
      }
    });
});

app.post("/login", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.username;
  let password = req.body.password;
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query("select username, password, tip from users where username=$1;", [
      username,
    ])
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data);
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        res.send({ message: "Username sau parola invalide" });
      } else {
        console.log("utilizatorul exista");

        //verific parolele
        if (password === data[0].password) {
          if(data[0].tip==="PROFESOR")
          {res.send({ message: "Login efectuat cu succes pentru PROFESOR!" });}
          else if(data[0].tip==="STUDENT")
          {
            res.send({ message: "Login efectuat cu succes pentru STUDENT!" });
          }
        } else {
          res.send({ message: "Date invalide" });
        }
      }
    });
});

app.get("/api", (req, res) => {
  console.log("ceva");
  res.json({ users: ["Administrator", "Profesor", "Student"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
