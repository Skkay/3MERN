import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'reactjs-popup/dist/index.css';
import "./styles/style.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/HomeView";
import LoginView from "./pages/LoginView";
import DetailView from "./pages/DetailView";
import { UidContext } from "./components/AppContext";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/require_auth`,
        withCredentials: true,
      })
        .then((res) => {
          console.log("res fetech token :")
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.error("No token found"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginView} />
          <Route path="/detail" exact component={DetailView} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
