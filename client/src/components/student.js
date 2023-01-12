import React, { useState } from "react";
import IPv4 from "../index";
import "./css/student.css";

export default function Student() {
  // const navigate=useNavigate();
  const [errorDataEntry, setErrorDataEntry] = useState({
    message: "",
  });
  const [token, setToken] = useState({ token: localStorage.getItem("token") });
  const [idUser, setIdUser] = useState({ idUser: "" });
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [type, setType] = useState({ type: "" });

  function decodeJWT() {
    if (localStorage.getItem("token")) {
      console.log("am intrat in decodeJWT");
      const data = {
        jwt: localStorage.getItem("token"),
      };
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };

      const handleLogout = (e) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/decodeJWT";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            console.log(data);
            setIdUser({ idUser: data.id });
            setUsername({ username: data.username });
            setPassword({ password: data.password });
            setType({ type: data.type });
          }
          // setErrorDataRegisterActivity({ message: data.message });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  React.useEffect(() => {
    decodeJWT();

    window.addEventListener("storage", () => {
      // When local storage changes, dump the list to
      // the console.
      //setToken({token: localStorage.getItem("token")})
      decodeJWT();
    });
  }, [token.token]);

  const handleEntryActivityClick = (e) => {
    console.log("Am dat click");
    document.getElementById("entryActivity").style.display = "block";
  };

  const handleSubmit = (e) => {

  };

  return (
    <div>
      <nav>
        <label className="pagStudent">Pagina studentului</label>
        <ul>
          <li>
            <a onClick={handleEntryActivityClick}>Inscriere activitate</a>
          </li>
          {/* <li>
          <a onClick={handleMyActivitiesClick}>Activitatile mele</a>
        </li> */}
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <div
          className="entryActivity"
          id="entryActivity"
          style={{ display: "none" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="coverStudent">
              <h2>Accesare activitate</h2>
              <h5>Activitate:</h5>
              <input
                type="text"
                placeholder="Codul unic al activitatii"
                // onChange={(e) => (activityData.final = e.target.value)}
              />
              <div className="inscriere-btn">
                <button className="btn1">Feedback</button>
              </div>
              <div>{errorDataEntry.message}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
