import "./styles/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import LoginView from "./pages/LoginView";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginView} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
