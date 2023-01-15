import React from "react";
import "./css/home.css";

export default function Home() {
  // const navigate=useNavigate();
  return (
    <div className="main">
      <div className="home">
        <div
          className="cover"
          style={{ width: "30em", height: "15em", margin: "auto" }}
        >
          <h1 style={{ fontFamily: "CustomFont", fontSize: "30px" }}>
            Bine ai venit!
          </h1>
          <div className="login-btn">
            <button
              className="btn1"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              LOGHEAZA-TE
            </button>
          </div>
          <h1 style={{ fontFamily: "CustomFont", fontSize: "15px" }}>
            Nu ai un cont?
          </h1>
          <div className="login-btn">
            <button
              className="btn1"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              INREGISTREAZA-TE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
