import React, { useState } from "react";
import "./css/loginform.css";
//import{useHistory} from 'react-router-dom'

// const LoginForm = () => {
export default function LoginForm() {
  const [popupStyle, showPopup] = useState("hide");
  const [errorDataLogin, setErrorDataLogin] = useState({ message: "" });

  //let history=useHistory();

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const loginData = {
    username: "",
    password: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Username este: " +
        loginData.username +
        " " +
        "Parola este: " +
        loginData.password
    );

    if (loginData.username !== "" && loginData.password !== "") {
      loginData.username = "";
      loginData.password = "";
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      console.log("date login resetate");
      setErrorDataLogin({ message: "Te-ai logat cu succes!" });
      //history.push("/home");
    } else {
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
            <h1>Login</h1>
            <input
              type="user"
              placeholder="username"
              onChange={(e) => (loginData.username = e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              onChange={(e) => (loginData.password = e.target.value)}
            />

            <div className="login-btn">
              <button className="btn1">Login</button>
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

// export default LoginForm;
