import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
import Home from "../../pages/Home";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
