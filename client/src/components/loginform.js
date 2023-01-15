import React, { useState } from "react";
import "./css/loginform.css";
import IPv4 from "../index";

export default function LoginForm() {
  const [popupStyle, showPopup] = useState("hide");
  const [errorDataLogin, setErrorDataLogin] = useState({ message: "" });

  const loginData = {
    username: "",
    password: "",
  };

  //aici gestionez ce se ontampla la click pe login
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Username este: " +
        loginData.username +
        " " +
        "Parola este: " +
        loginData.password
    );

    //se vf daca cele 2 campuri sunt completate, daca sunt se trimit la server
    if (loginData.username !== "" && loginData.password !== "") {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/login";
      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Login efectuat cu succes pentru STUDENT!") {
            localStorage.setItem("token", data.jwt);
            window.location.href = "/student";
          } else if (
            data.message === "Login efectuat cu succes pentru PROFESOR!"
          ) {
            //se salveaza tokenul in browser
            localStorage.setItem("token", data.jwt);
            window.location.href = "/teacher";
          }
          setErrorDataLogin({ message: data.message });
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("date login resetate");
      setErrorDataLogin({ message: "Te-ai logat cu succes!" });
    } else {
      //se reseteaza datele completate
      console.log("Date invalide!");
      setErrorDataLogin({ message: "Date invalide!" });
      loginData.username = "";
      loginData.password = "";
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  return (
    <div className="main">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div className="cover">
            <h1 style={{ fontFamily: "CustomFont", fontSize: "30px" }}>Conectare</h1>
            <input
              type="user"
              placeholder="nume de utilizator"
              onChange={(e) => (loginData.username = e.target.value)}
            />

            <input
              type="password"
              placeholder="parolă"
              onChange={(e) => (loginData.password = e.target.value)}
            />

            <div className="login-btn">
              <button className="btn1" style={{ fontFamily: "CustomFont", fontSize: "15px" }}>Conectare</button>
            </div>

            <div className={popupStyle}>
              <h3>Login Failed</h3>
              <p>Username or password incorrect</p>
            </div>

            <div>{errorDataLogin.message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
