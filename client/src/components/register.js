import React, { useState } from "react";
import "./css/register.css";
import IPv4 from "../index";

export default function Register() {
  const [errorDataRegister, setErrorDataRegister] = useState({ message: "" });

  const registerData = {
    username: "",
    password: "",
    type: "",
  };

  //se gestioneaza apasarea butonului de inregistrare
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Username este: " +
        registerData.username +
        " " +
        "Parola este: " +
        registerData.password +
        "Tipul contului este: " +
        registerData.type
    );

    if (
      registerData.username !== "" &&
      registerData.password !== "" &&
      registerData.type !== ""
    ) {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/register";
      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setErrorDataRegister({ message: data.message });
          if (data.message === "s-a adaugat cu succes!") {
            //daca primesc confirmarea ca noul utilizator e bagat in bd ma trimite pe login
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorDataRegister({ message: "Date invalide!" });
      registerData.username = "";
      registerData.password = "";
      registerData.type = "";

      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  //se gestioneaza selectarea inputului de tipul radio box
  const handleChange = (e) => {
    console.log(e.target.value);
    registerData.type = e.target.value;
  };

  return (
    <div className="main">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div className="coverRegister">
            <h1 style={{ fontFamily: "CustomFont", fontSize: "30px" }}>
              Înregistrare
            </h1>
            <input
              type="user"
              placeholder="nume de utilizator"
              onChange={(e) => (registerData.username = e.target.value)}
            />

            <input
              type="password"
              placeholder="parolă"
              onChange={(e) => (registerData.password = e.target.value)}
            />
            <div className="checkbox">
              <input
                type="radio"
                id="student"
                name="userType"
                value="STUDENT"
                onChange={handleChange}
              />
              <label>Student</label>
              <br></br>
              <input
                type="radio"
                id="profesor"
                name="userType"
                value="PROFESOR"
                onChange={handleChange}
              />
              <label>Profesor</label>
              <br></br>
            </div>
            <div className="login-btn">
              <button
                className="btn1"
                style={{ fontFamily: "CustomFont", fontSize: "15px" }}
              >
                Înregistrare
              </button>
            </div>

            <div>{errorDataRegister.message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

// export default LoginForm;
