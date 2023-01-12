import React from "react";
import "./css/teacher.css";

export default function Teacher() {
  // const navigate=useNavigate();

  const handleNewActivityClick = (e) => {
    console.log("Am dat click");
    document.getElementById("newActivity").style.display = "block";
  };

  const handleMyActivitiesClick = (e) => {
    console.log("Am dat click");
  };

  const handleSubmit = (e) => {};

  return (
    <div>
      <nav>
        <label className="pagProfesor">Pagina profesorului</label>
        <ul>
          <li>
            <a onClick={handleNewActivityClick}>Adauga activitate</a>
          </li>
          <li>
            <a onClick={handleMyActivitiesClick}>Activitatile mele</a>
          </li>
        </ul>
      </nav>
      <div>
        <div
          className="addActivityForm"
          id="newActivity"
          style={{ display: "none" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="coverteacher">
              <h3>Adauga activitate</h3>
              <input
                type="name"
                placeholder="nume activitate"
                //onChange={(e)=>}
              />

              <input type="descriere" placeholder="descriere activitate" />

              <h5>Incepe la: </h5>
              <input type="datetime-local" />
              <h5>Se termina la: </h5>
              <input type="datetime-local" />

              <div className="inscriere-btn">
                <button className="btn1">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
