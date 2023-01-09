import React, { useEffect, useState } from "react";
import LoginForm from "./components/loginform";
import Home from "./components/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={() => <LoginForm />} />
        <Route exact path="/" component={() => <Home />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
