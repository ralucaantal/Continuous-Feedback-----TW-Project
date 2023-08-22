import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let acasa = "http://192.168.1.11";
let hotspot = "http://172.20.10.3";
let facultate = "http://10.30.5.148";

let IPv4;
export default IPv4 = acasa;
//export default IPv4 = hotspot;
//export default IPv4 = facultate;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
