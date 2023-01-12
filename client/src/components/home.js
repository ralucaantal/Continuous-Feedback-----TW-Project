import React from "react";

export default function Home() {
  // const navigate=useNavigate();

  return (
    <div className="main">
      <div className="home">
        <h1>Bine ati venit!</h1>
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
        <h2>Nu ai un cont?</h2>
        <div className="login-btn">
          <button className="btn1"
          onClick={()=>{
            window.location.href="/register"
          }}
          >INREGISTREAZA-TE</button>
        </div>
      </div>
    </div>
  );
}
