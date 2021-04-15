import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import axios from 'axios';
import cookie from "js-cookie";

const Navbar = () => {
  const uid = useContext(UidContext);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <a className="navbar-brand" href="/">3MERN</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
              </li>
            </ul>
            {uid ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="nav-link ButtonLink" onClick={handleLogout}>Sign out</button>
                </li>
              </ul>
            ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="nav-link" href="/login">Sign in or Sign up</a>
              </li>
            </ul>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
