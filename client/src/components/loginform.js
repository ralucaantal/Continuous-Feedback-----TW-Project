import React, { useState } from "react";
import "./css/loginform.css";
import IPv4 from "../index";
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
      // loginData.username = "";
      // loginData.password = "";
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
          console.log(data.message);
          setErrorDataLogin({ message: data.message });
          // if (data.message === "Email sau parola gresita.") {
          //     setErrorDataLogin({message: "Date invalide."})
          //     Array.from(document.querySelectorAll("input")).forEach(
          //         input => (input.value = "")
          //     );
          // } else if (data.message === "Unable to log user, need more data.") {
          //     setErrorDataLogin({message: "Date invalide."})
          //     Array.from(document.querySelectorAll("input")).forEach(
          //         input => (input.value = "")
          //     );
          // } else if (data.message === "Trebuie sa iti confirmi mail-ul!") {
          //     setErrorDataLogin({message: data.message})
          // } else {
          //     localStorage.setItem('token', data.JWT);
          //     setState({
          //         loggedIn: true
          //     });
          //     window.location.href = '/';
          // }
        })
        .catch((error) => {
          console.log(error);
          // setError(true);
          // Array.from(document.querySelectorAll("input")).forEach(
          //     input => (input.value = "")
          // );
          // setErrorData({message: "Date invalide."})
        });

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
