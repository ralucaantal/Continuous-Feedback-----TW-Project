import React, { useEffect, useState } from "react";
import LoginForm from "./components/loginform";
import Home from "./components/home";
import Register from "./components/register";
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
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/login" component={() => <LoginForm />} />
        <Route exact path="/register" component={() => <Register />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
