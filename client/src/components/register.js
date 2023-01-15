import React, { useState } from "react";
import "./css/register.css";
import IPv4 from "../index";
//import{useHistory} from 'react-router-dom'

// const LoginForm = () => {
export default function Register() {
  const [errorDataRegister, setErrorDataRegister] = useState({ message: "" });

  const registerData = {
    username: "",
    password: "",
    type: "",
  };

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

    console.log("sunt aici");
    console.log("sunt aici");

    if (
      registerData.username !== "" &&
      registerData.password !== "" &&
      registerData.type !== ""
    ) {
      // loginData.username = "";
      // loginData.password = "";
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

  const handleChange = (e) => {
    //e.preventDefault();
    console.log(e.target.value);
    registerData.type = e.target.value;
  };

  return (
    <div className="main">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div className="coverRegister">
            <h1>Inregistreaza-te</h1>
            <input
              type="user"
              placeholder="username"
              onChange={(e) => (registerData.username = e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
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
              <button className="btn1">INREGISTRARE</button>
            </div>

            <div>{errorDataRegister.message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

// export default LoginForm;
