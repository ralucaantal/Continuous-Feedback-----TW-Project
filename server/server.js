const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverSecret = "parola";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
var bodyParser = require("body-parser");

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var pg = require("pg");
var connectionString = "postgres://postgres:6203@localhost:5432/feedback";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

app.post("/decodeJWT", (req, res) => {
  console.log("req= ", req.body);
  let token = req.body.jwt;
  console.log("token= ", token);
  jwt.verify(token, serverSecret, (err, decoded) => {
    if (err) {
      console.log("Este o eroare la decodarea jwt");
      res.send({ message: "Este o eroare la decodarea jwt" });
    } else {
      console.log(decoded.data);
      res.send({
        id: decoded.data.id,
        username: decoded.data.username,
        password: decoded.data.password,
        type: decoded.data.type,
      });
    }
  });
});

app.post("/register", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.username;
  let password = req.body.password;
  let type = req.body.type;
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query("select username from users where username=$1;", [username])
    .then((res) => res.rows)
    .then((data) => {
      console.log("sunt in fetch de la baza de date");
      console.log(data);
      console.log(data.length);
      if (data.length == 0) {
        console.log("nu exista");
        pgClient
          .query(
            "insert into users(username, password, tip) values($1,$2,$3);",
            [username, password, type]
          )
          .then((result) => {
            res.send({ message: "s-a adaugat cu succes!" });
          });
      } else {
        console.log("utilizatorul exista");
        res.send({ message: "utilizatorul deja exista" });
      }
    });
});

app.post("/login", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let username = req.body.username;
  let password = req.body.password;
  //verific daca exista utilizatorul in baza de date
  pgClient
    .query(
      "select id_user,username, password, tip from users where username=$1;",
      [username]
    )
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
          let token = jwt.sign(
            {
              data: {
                id: data[0].id_user,
                username: data[0].username,
                password: data[0].password,
                type: data[0].tip,
              },
            },
            serverSecret,
            { expiresIn: "24h" }
          );
          console.log("tokenul tau este: ", token);
          if (data[0].tip === "PROFESOR") {
            res.send({
              message: "Login efectuat cu succes pentru PROFESOR!",
              jwt: token,
            });
          } else if (data[0].tip === "STUDENT") {
            res.send({
              message: "Login efectuat cu succes pentru STUDENT!",
              jwt: token,
            });
          }
        } else {
          res.send({ message: "Date invalide" });
        }
      }
    });
});

app.post("/addActivity", (req, res) => {
  console.log("Ai facut POST cu datele: ", req.body);
  let description = req.body.description;
  let start = req.body.start;
  let final = req.body.final;
  let owner = req.body.owner;

  pgClient
    .query(
      "insert into activities(descriere_activitate, inceput, final,owner_id) values($1,$2,$3,$4);",
      [description, start, final, owner]
    )
    .then((result) => {
      res.send({ message: "s-a adaugat cu succes!" });
    });
});

app.post("/entryActivity", (req, res) => {
  let code = req.body.code;
  let now = new Date(req.body.now);

  pgClient
    .query("select * from activities where id_activitate=$1;", [code])
    .then((res) => res.rows)
    .then((data) => {
      if (data.length == 0) {
        console.log("nu exista");
        res.send({ message: "Codul activitatii nu exista" });
      } else {
        console.log(data);
        var data1 = new Date(data[0].inceput);
        var data2 = new Date(data[0].final);
        console.log(now.getTime(), data1.getTime(), data2.getTime());
        if (
          now.getTime() >= data1.getTime() &&
          now.getTime() <= data2.getTime()
        ) {
          console.log("e ok pt feedback");
          res.send({ message: "Activitatea poate primi feedback!" });
        } else {
          res.send({ message: "Nu ai voie sa dai acum feedback!" });
        }
      }
    });
});

app.post("/feedback", (req, res) => {
  let code = req.body.code;
  let now = new Date(req.body.now);
  let reaction = req.body.reaction;

  pgClient
    .query(
      "insert into feedbacks(timp,id_activitate,reactie) values($1,$2,$3);",
      [now, code, reaction]
    )
    .then((result) => {
      res.send({ message: "Multumesc pentru feedback-ul oferit!" });
    });
});

app.post("/showActivities", (req, res) => {
  console.log("in showActivities am venit cu request: ", req.body);
  let idUser = req.body.idUser;
  let activities = [];
  pgClient
    .query("select * from activities where owner_id=$1", [idUser])
    .then((res) => res.rows)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let auxArray = [];
        let id_activitate = data[i].id_activitate;
        let descriere_activitate = data[i].descriere_activitate;
        let inceput = data[i].inceput;
        let final = data[i].final;
        auxArray.push(id_activitate, descriere_activitate, inceput, final);
        activities.push(auxArray);
      }
      res.send({ message: activities });
    });
});

app.post("/getFeedbacks", (req, res) => {
  console.log("in getFeedbacks am venit cu request: ", req.body);
  let idActivity = req.body.id;
  let feedbacks = [];
  pgClient
    .query("select * from feedbacks where id_activitate=$1", [idActivity])
    .then((res) => res.rows)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let auxArray = [];
        let id_feedback = data[i].id_feedback;
        let reactie = data[i].reactie;
        let timp = data[i].timp;
        auxArray.push(id_feedback, reactie, timp);
        feedbacks.push(auxArray);
      }
      if (data.length > 0) {
        res.send({ message: feedbacks });
      } else {
        res.send({ message: "Aceasta activitate nu are niciun feedback!" });
      }
    });
});

app.get("/api", (req, res) => {
  res.json({ users: ["Profesor", "Student"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
