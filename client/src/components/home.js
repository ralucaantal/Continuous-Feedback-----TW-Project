import React from "react";

export default function Home() {
  // const navigate=useNavigate();

  return (
    <div className="main">
      <div className="home">
        <div className="cover" style={{width: "25em", height:"15em"}}>
          <h1>Bine ai venit!</h1>
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
