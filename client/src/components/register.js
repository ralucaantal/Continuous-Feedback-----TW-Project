import React, { useState } from "react";
import "./css/register.css";
import IPv4 from "../index";
//import{useHistory} from 'react-router-dom'

// const LoginForm = () => {
export default function Register() {
  return (
    <div className="main">
      <div className="loginForm">
        <form>
          <div className="cover">
            <h1>Inregistreaza-te</h1>
            <input
              type="user"
              placeholder="username"
              //onChange={(e) => (loginData.username = e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              // onChange={(e) => (loginData.password = e.target.value)}
            />

            <input type="radio" id="student" name="userType" value="STUDENT" />
            <label for="student">Student</label>
            <br></br>
            <input
              type="radio"
              id="profesor"
              name="userType"
              value="PROFESOR"
            />
            <label for="profesor">Profesor</label>
            <br></br>

            <div className="login-btn">
              <button className="btn1">INREGISTRARE</button>
            </div>

            {/* <div>{errorDataLogin.message}</div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

// export default LoginForm;
