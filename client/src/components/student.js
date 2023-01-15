import React, { useState } from "react";
import IPv4 from "../index";
import "./css/student.css";
import smiley from "./css/media/smile.jpeg";
import frowny from "./css/media/frowny.jpeg";
import surprised from "./css/media/surprised.jpeg";
import confused from "./css/media/confused.jpeg";

export default function Student() {
  // const navigate=useNavigate();
  const [errorDataEntry, setErrorDataEntry] = useState({
    message: "",
  });
  const [errorDataFeedback, setErrorDataFeedback] = useState({
    message: "",
  });
  const [token, setToken] = useState({ token: localStorage.getItem("token") });
  const [idUser, setIdUser] = useState({ idUser: "" });
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [type, setType] = useState({ type: "" });
  const [activityCode, setActivityCode] = useState({ code: "" });

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

  const entryData = {
    code: "",
    now: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    entryData.now = new Date();
    const date = new Date();
    console.log(date);
    if (entryData.code !== "") {
      setActivityCode({ code: entryData.code });
      // Array.from(document.querySelectorAll("input")).forEach(
      //   (input) => (input.value = "")
      // );

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(entryData),
        headers: { "Content-Type": "application/json" },
      };

      console.log(requestOptions);
      let input = IPv4 + ":5000/entryActivity";

      fetch(input, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setErrorDataEntry({ message: data.message });
          if (data.message === "Activitatea poate primi feedback!") {
            document.getElementById("feedback").style.display = "block";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Cod invalid");
      setErrorDataEntry({ message: "Cod invalid" });
      entryData.code = "";
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  const feedback = {
    reaction: "",
    code: "",
    now: "",
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    feedback.code = activityCode.code;
    console.log(activityCode.code);
    feedback.now = new Date();
    console.log(feedback.reaction);
    if (feedback.reaction !== "") {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );

      const requestOptionsFeedback = {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: { "Content-Type": "application/json" },
      };

      console.log(feedback);
      let input = IPv4 + ":5000/feedback";
      fetch(input, requestOptionsFeedback)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setErrorDataFeedback({ message: data.message });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Feedback invalid");
      setErrorDataFeedback({ message: "Feedback invalid" });
      feedback.reaction = "";
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    }
  };

  return (
    <div>
      <nav>
        <label className="pagStudent">Pagina studentului</label>
        <ul>
          <li>
            <a onClick={handleEntryActivityClick}>Accesare activitate</a>
          </li>
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
                onChange={(e) => (entryData.code = e.target.value)}
              />
              <div className="inscriere-btn">
                <button className="btn1">Acceseaza activitate</button>
              </div>
              <div>{errorDataEntry.message}</div>
            </div>
          </form>
        </div>
        <div
          id="feedback"
          style={{ display: "none",
          //  width: "100%", height: "100%" 
          }}
        >
          <div className="coverFeedback">
            <form 
            className="divFeedback" 
            onSubmit={handleFeedback}>
              <div className="reactions">
              <div
                className="coverReaction"
                onClick={(e) => {
                  feedback.reaction = "smiley";
                }}
              >
                <img
                  src={smiley}
                  alt="smiley face"
                  style={{ width: "25%", height: "25%" }}
                ></img>
                <h4>Smiley face</h4>
              </div>
              <div
                className="coverReaction"
                onClick={(e) => {
                  feedback.reaction = "frowny";
                }}
              >
                <img
                  src={frowny}
                  alt="smiley face"
                  style={{ width: "25%", height: "25%" }}
                ></img>
                <h4>Frowny face</h4>
              </div>
              <div
                className="coverReaction"
                onClick={(e) => {
                  feedback.reaction = "surprised";
                }}
              >
                <img
                  src={surprised}
                  alt="smiley face"
                  style={{ width: "25%", height: "25%" }}
                ></img>
                <h4>Surprised face</h4>
              </div>
              <div
                className="coverReaction"
                onClick={(e) => {
                  feedback.reaction = "confused";
                }}
              >
                <img
                  src={confused}
                  alt="smiley face"
                  style={{ width: "25%", height: "25%" }}
                ></img>
                <h4>Confused face</h4>
              </div>
              </div>
              <div className="feedback-btn">
                <button className="btn1">Ofera Feedback</button>
              </div>
              <div className="mesaj">{errorDataFeedback.message}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
